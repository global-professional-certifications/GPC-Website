import React, { useState, useEffect, useRef } from 'react'
import { set, useClient, useFormValue, ArrayOfObjectsInputProps } from 'sanity'
import { Box, Button, Card, Flex, Grid, Label, Select, Stack, Text, Spinner } from '@sanity/ui'
import { UploadIcon, ChevronRightIcon } from '@sanity/icons'

export default function MarqueeArrayInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props

  const client = useClient({ apiVersion: '2024-01-01' })
  const currentDocId = useFormValue(['_id']) as string | undefined
  const baseDocId = currentDocId ? currentDocId.replace(/^drafts\./, '') : ''

  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // State
  const [marqueeLines, setMarqueeLines] = useState<any[]>([])
  const [selectedKey, setSelectedKey] = useState('')
  const [targetLineId, setTargetLineId] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [moving, setMoving] = useState(false)

  // Fetch marquee lines to populate the target lines selector
  useEffect(() => {
    client.fetch('*[_type == "marqueeLine"] | order(order asc) { _id, title, order }')
      .then((data) => {
        const cleanLines = data.filter((line: any) => !line._id.startsWith('drafts.'))
        setMarqueeLines(cleanLines)
      })
      .catch((err) => console.error('Error fetching marquee lines:', err))
  }, [client])

  // Automatically select the first other line if targetLineId is not set
  useEffect(() => {
    if (marqueeLines.length > 0 && !targetLineId) {
      const otherLines = marqueeLines.filter((l) => l._id !== baseDocId)
      if (otherLines.length > 0) {
        setTargetLineId(otherLines[0]._id)
      }
    }
  }, [marqueeLines, baseDocId, targetLineId])

  // Trigger file selection
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle file upload and automatic name parsing
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadProgress(`Initializing upload of ${files.length} file(s)...`)

    const newItems: any[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}...`)

        // Upload file to Sanity image assets pipeline
        const asset = await client.assets.upload('image', file, {
          filename: file.name,
          contentType: file.type,
        })

        // Clean filename to extract company name
        let cleanName = file.name.replace(/\.[^/.]+$/, '') // strip extension
        cleanName = cleanName.replace(/(?:[-_\s.]+logo|logo[-_\s.]+)/gi, '') // strip trailing/leading logo variations
        cleanName = cleanName.replace(/[-_.]+/g, ' ') // replace dashes, underscores, dots with space
        cleanName = cleanName
          .trim()
          .split(/\s+/)
          .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
          .join(' ')

        // Form unique key for the array item
        const itemKey = 'comp_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)

        newItems.push({
          _key: itemKey,
          _type: 'company',
          name: cleanName,
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
      }

      // Append new items to the existing array
      const nextValue = [...value, ...newItems]
      onChange(set(nextValue))
      setUploadProgress('')
    } catch (err) {
      console.error('Error during bulk upload:', err)
      alert('Error during bulk upload. Please check the developer console for details.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Handle moving a company to another line
  const handleMoveLogo = async () => {
    if (!selectedKey) {
      alert('Please select a company logo to move.')
      return
    }
    if (!targetLineId) {
      alert('Please select a destination marquee line.')
      return
    }

    const companyToMove = value.find((c: any) => c._key === selectedKey)
    if (!companyToMove) return

    setMoving(true)

    try {
      const draftTargetId = `drafts.${targetLineId}`

      // Fetch draft and published versions of target line
      const [publishedDoc, draftDoc] = await Promise.all([
        client.fetch('*[_type == "marqueeLine" && _id == $id][0] { companies }', { id: targetLineId }),
        client.fetch('*[_type == "marqueeLine" && _id == $id][0] { companies }', { id: draftTargetId }),
      ])

      const transaction = client.transaction()

      if (draftDoc) {
        const existing = draftDoc.companies || []
        transaction.patch(draftTargetId, (p) => p.set({ companies: [...existing, companyToMove] }))
      } else if (publishedDoc) {
        const existing = publishedDoc.companies || []
        transaction.patch(targetLineId, (p) => p.set({ companies: [...existing, companyToMove] }))
      } else {
        transaction.patch(targetLineId, (p) => p.set({ companies: [companyToMove] }))
      }

      await transaction.commit()

      // Remove the company from the current list locally
      const nextValue = value.filter((c: any) => c._key !== selectedKey)
      onChange(set(nextValue))

      setSelectedKey('')
    } catch (err) {
      console.error('Error during moving company logo:', err)
      alert('Failed to move company logo. Please check the developer console.')
    } finally {
      setMoving(false)
    }
  }

  const otherLines = marqueeLines.filter((line) => line._id !== baseDocId)

  return (
    <Stack space={4}>
      {/* Custom Utilities Dashboard Panel */}
      <Card padding={4} border radius={3} shadow={1} style={{ background: 'var(--card-bg-color)' }}>
        <Stack space={3}>
          <Text weight="bold" size={2}>
            Marquee Fast Management
          </Text>
          <Text size={1} muted>
            Advanced utilities to bulk upload company logo assets or move them between marquee rows instantly.
          </Text>

          <Grid columns={[1, 1, 2]} gap={4} style={{ marginTop: '0.5rem' }}>
            {/* Column 1: Bulk Upload */}
            <Card padding={3} border radius={2}>
              <Stack space={3} height="100%" justify="space-between">
                <Stack space={2}>
                  <Label size={1}>1. Bulk Upload Logos</Label>
                  <Text size={1} muted>
                    Select multiple image files. The system will upload them to Sanity and extract the company name directly from the filename.
                  </Text>
                </Stack>

                <Box style={{ marginTop: '0.5rem' }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <Button
                    text={uploading ? 'Uploading assets...' : 'Select & Upload Logos'}
                    icon={uploading ? undefined : UploadIcon}
                    tone="brand"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    style={{ cursor: uploading ? 'not-allowed' : 'pointer', width: '100%' }}
                  />
                </Box>

                {uploading && (
                  <Flex align="center" gap={2} style={{ marginTop: '0.5rem' }}>
                    <Spinner size={1} />
                    <Text size={1} style={{ color: 'var(--card-accent-color)' }}>
                      {uploadProgress}
                    </Text>
                  </Flex>
                )}
              </Stack>
            </Card>

            {/* Column 2: Move Logo to another Section */}
            <Card padding={3} border radius={2}>
              <Stack space={3}>
                <Label size={1}>2. Move Logo to Other Line</Label>
                
                <Grid columns={2} gap={2}>
                  <Stack space={2}>
                    <Text size={1} muted style={{ fontSize: '0.8rem' }}>Logo to Move:</Text>
                    <Select
                      value={selectedKey}
                      onChange={(e: any) => setSelectedKey(e.target.value)}
                      disabled={value.length === 0 || moving}
                    >
                      <option value="">-- Select Company --</option>
                      {value.map((c: any) => (
                        <option key={c._key} value={c._key}>
                          {c.name || 'Unnamed'}
                        </option>
                      ))}
                    </Select>
                  </Stack>

                  <Stack space={2}>
                    <Text size={1} muted style={{ fontSize: '0.8rem' }}>Destination Line:</Text>
                    <Select
                      value={targetLineId}
                      onChange={(e: any) => setTargetLineId(e.target.value)}
                      disabled={otherLines.length === 0 || moving}
                    >
                      {otherLines.map((line: any) => (
                        <option key={line._id} value={line._id}>
                          {line.title}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                </Grid>

                <Button
                  text={moving ? 'Moving logo...' : 'Move Logo'}
                  icon={moving ? undefined : ChevronRightIcon}
                  tone="primary"
                  onClick={handleMoveLogo}
                  disabled={moving || !selectedKey || !targetLineId}
                  style={{ cursor: moving || !selectedKey ? 'not-allowed' : 'pointer', marginTop: '0.5rem' }}
                />
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Render native Sanity array field underneath */}
      <Box borderTop style={{ paddingTop: '1rem' }}>
        {props.renderDefault(props)}
      </Box>
    </Stack>
  )
}
