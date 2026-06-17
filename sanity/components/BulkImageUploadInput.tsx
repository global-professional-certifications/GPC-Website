import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { useClient, setIfMissing, insert, unset, PatchEvent } from 'sanity'
import { Stack, Card, Flex, Box, Text, Button, Checkbox, Spinner, useToast } from '@sanity/ui'
import { UploadIcon, TrashIcon } from '@sanity/icons'

// Sanity requires every array item to carry a unique `_key`, otherwise rows
// collide / disappear in the editor. Prefer crypto, fall back to Math.random.
const genKey = (): string =>
  (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)
  )
    .replace(/-/g, '')
    .slice(0, 12)

type UploadResult =
  | { _type: 'image'; _key: string; asset: { _type: 'reference'; _ref: string } }
  | { error: unknown; file: File }

type AssetMeta = Record<string, { filename?: string; url?: string }>

// Limited-concurrency mapper so a large batch doesn't fire dozens of parallel
// uploads at once. Failures are captured per-file instead of aborting the batch.
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
  onProgress: (done: number, total: number) => void
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let nextIndex = 0
  let completed = 0

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const current = nextIndex++
      if (current >= items.length) return
      try {
        results[current] = await worker(items[current], current)
      } catch (err) {
        // Stored as an error result so other files still complete.
        results[current] = { error: err, file: items[current] } as unknown as R
      } finally {
        completed++
        onProgress(completed, items.length)
      }
    }
  })

  await Promise.all(runners)
  return results
}

/**
 * Custom input for the Success Stories hero `heroImages` array.
 *
 * Adds two things on top of Sanity's native array input (which is preserved via
 * `props.renderDefault` — drag-reorder, per-row alt/label editing, single-item
 * upload and drag-drop all keep working):
 *
 *   1. "Upload multiple images" — pick many files at once and append them.
 *   2. "Manage / delete"        — a select mode with checkboxes to remove
 *                                 several items in one operation.
 *
 * Bulk delete only removes items from THIS array (an `unset` patch by `_key`);
 * it intentionally does not delete the underlying image assets from the dataset,
 * so assets reused elsewhere are never orphaned.
 */
export function BulkImageUploadInput(props: any) {
  const { onChange, value } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })

  // --- bulk-delete (manage) state ---
  const [manageMode, setManageMode] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [assetMeta, setAssetMeta] = useState<AssetMeta>({})
  const [loadingMeta, setLoadingMeta] = useState(false)

  const items: any[] = Array.isArray(value) ? value : []
  // Stable dependency for the metadata effect (array identity changes each render).
  const refsKey = useMemo(
    () => items.map((it) => it?.asset?._ref).filter(Boolean).join(','),
    [items]
  )

  // Upload
  const handlePick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFiles = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList || fileList.length === 0) return
      const files = Array.from(fileList)
      // Reset so re-selecting the same files still fires onChange next time.
      event.target.value = ''

      setUploading(true)
      setProgress({ done: 0, total: files.length })

      const uploaded = await mapWithConcurrency<File, UploadResult>(
        files,
        3,
        async (file) => {
          const asset = await client.assets.upload('image', file, { filename: file.name })
          return {
            _type: 'image',
            _key: genKey(),
            asset: { _type: 'reference', _ref: asset._id },
          }
        },
        (done, total) => setProgress({ done, total })
      )

      const successes = uploaded.filter(
        (r): r is Extract<UploadResult, { _type: 'image' }> => !('error' in r)
      )
      const failures = uploaded.filter((r) => 'error' in r)

      if (successes.length) {
        onChange(PatchEvent.from([setIfMissing([]), insert(successes, 'after', [-1])]))
      }

      if (failures.length) {
        console.error('Bulk image upload — failed files:', failures)
        toast.push({
          status: 'warning',
          title: `${successes.length} uploaded, ${failures.length} failed`,
          description: 'See the browser console for the failed files.',
        })
      } else {
        toast.push({
          status: 'success',
          title: `Uploaded ${successes.length} image${successes.length === 1 ? '' : 's'}`,
        })
      }

      setUploading(false)
      setProgress({ done: 0, total: 0 })
    },
    [client, onChange, toast]
  )

  // Bulk delete 
  // Load filenames + thumbnail URLs for the assets currently in the array so
  // editors can recognise which rows they are deleting.
  useEffect(() => {
    if (!manageMode) return
    const refs = refsKey ? refsKey.split(',') : []
    const missing = refs.filter((r) => !assetMeta[r])
    if (missing.length === 0) return

    let cancelled = false
    setLoadingMeta(true)
    client
      .fetch(`*[_id in $ids]{ _id, originalFilename, url }`, { ids: missing })
      .then((rows: any[]) => {
        if (cancelled) return
        setAssetMeta((prev) => {
          const next = { ...prev }
          rows.forEach((r) => {
            next[r._id] = { filename: r.originalFilename, url: r.url }
          })
          return next
        })
      })
      .catch((err) => console.error('Failed to load asset metadata', err))
      .finally(() => {
        if (!cancelled) setLoadingMeta(false)
      })

    return () => {
      cancelled = true
    }
  }, [manageMode, refsKey, assetMeta, client])

  const toggleManage = useCallback(() => {
    setManageMode((m) => !m)
    setSelectedKeys([])
  }, [])

  const toggleKey = useCallback((key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }, [])

  const selectAll = useCallback(() => {
    setSelectedKeys(items.map((it) => it?._key).filter(Boolean))
  }, [items])

  const clearSelection = useCallback(() => setSelectedKeys([]), [])

  const removeSelected = useCallback(() => {
    if (selectedKeys.length === 0) return
    const confirmed = window.confirm(
      `Remove ${selectedKeys.length} image${selectedKeys.length === 1 ? '' : 's'} from the carousel?\n\n` +
      'This removes them from this list only — the uploaded files remain in your media library.'
    )
    if (!confirmed) return

    // One patch event with an unset-by-key per selected item.
    onChange(PatchEvent.from(selectedKeys.map((k) => unset([{ _key: k }]))))
    toast.push({
      status: 'success',
      title: `Removed ${selectedKeys.length} image${selectedKeys.length === 1 ? '' : 's'}`,
    })
    setSelectedKeys([])
  }, [selectedKeys, onChange, toast])

  return (
    <Stack space={3}>
      {/* Toolbar: upload + manage toggle */}
      <Card padding={3} radius={2} border tone="primary">
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Box flex={1} style={{ minWidth: 180 }}>
            <Text size={1} muted>
              Bulk upload: pick several image files at once. Use “Manage / delete” to
              remove multiple images together.
            </Text>
          </Box>
          <Flex gap={2}>
            <Button
              icon={UploadIcon}
              text={
                uploading
                  ? `Uploading ${progress.done}/${progress.total}…`
                  : 'Bulk Upload'
              }
              tone="primary"
              onClick={handlePick}
              disabled={uploading}
              loading={uploading}
            />
            <Button
              icon={TrashIcon}
              text={manageMode ? 'Done' : 'Manage / delete'}
              mode={manageMode ? 'default' : 'ghost'}
              tone={manageMode ? 'caution' : 'default'}
              onClick={toggleManage}
              disabled={uploading}
            />
          </Flex>
        </Flex>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFiles}
        />
      </Card>

      {/* Manage panel: checkboxes + bulk remove */}
      {manageMode && (
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Flex align="center" justify="space-between" gap={3} wrap="wrap">
              <Text size={1} weight="semibold">
                Select images to delete ({selectedKeys.length}/{items.length})
                {loadingMeta && (
                  <span style={{ marginLeft: 8 }}>
                    <Spinner size={0} />
                  </span>
                )}
              </Text>
              <Flex gap={2}>
                <Button size={1} mode="ghost" text="Select all" onClick={selectAll} />
                <Button size={1} mode="ghost" text="Clear" onClick={clearSelection} />
                <Button
                  size={1}
                  tone="critical"
                  icon={TrashIcon}
                  text={`Remove selected (${selectedKeys.length})`}
                  onClick={removeSelected}
                  disabled={selectedKeys.length === 0}
                />
              </Flex>
            </Flex>

            {items.length === 0 ? (
              <Text size={1} muted>
                No images yet.
              </Text>
            ) : (
              <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                <Stack space={1}>
                  {items.map((it, idx) => {
                    const key = it?._key
                    const ref = it?.asset?._ref
                    const meta = ref ? assetMeta[ref] : undefined
                    const name = it?.label || meta?.filename || ref || `Image ${idx + 1}`
                    const isSelected = key ? selectedKeys.includes(key) : false
                    const thumb = meta?.url
                      ? `${meta.url}?w=80&h=60&fit=crop&auto=format`
                      : undefined
                    return (
                      <Card
                        key={key || idx}
                        padding={2}
                        radius={1}
                        border
                        tone={isSelected ? 'critical' : 'default'}
                        style={{ cursor: key ? 'pointer' : 'default' }}
                        onClick={() => key && toggleKey(key)}
                      >
                        <Flex align="center" gap={3}>
                          <Checkbox checked={isSelected} disabled={!key} readOnly />
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={name}
                              width={48}
                              height={36}
                              style={{ objectFit: 'cover', borderRadius: 3, flexShrink: 0 }}
                            />
                          ) : (
                            <Box
                              style={{
                                width: 48,
                                height: 36,
                                borderRadius: 3,
                                background: 'var(--card-border-color, #e0e0e0)',
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <Text size={1} textOverflow="ellipsis">
                            {name}
                          </Text>
                        </Flex>
                      </Card>
                    )
                  })}
                </Stack>
              </div>
            )}
          </Stack>
        </Card>
      )}

      {/* Native array input — list, drag-reorder, per-item alt/label, drag-drop upload. */}
      {props.renderDefault(props)}
    </Stack>
  )
}

export default BulkImageUploadInput
