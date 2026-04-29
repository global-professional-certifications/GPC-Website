import React, { useState, useEffect } from 'react'
import { useClient } from 'sanity'
import { Card, Stack, Text, Button, Select, Grid, Checkbox, Flex, Label, Box } from '@sanity/ui'
import { RefreshIcon, ChevronRightIcon, ResetIcon } from '@sanity/icons'

const BulkMover = () => {
  const [entries, setEntries] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [targetCourseId, setTargetCourseId] = useState('')
  const [targetCategory, setTargetCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [entryData, courseData] = await Promise.all([
      client.fetch(`*[_type in ["successStory", "wallOfExcellence"]] | order(_type asc, name asc) { _id, _type, name, category, "courseName": course.name, "courseRef": course._ref, "courseRefs": course[]._ref }`),
      client.fetch(`*[_type == "testimonialCourse"] | order(name asc) { _id, name, category }`)
    ])
    setEntries(entryData)
    setCourses(courseData)
    setLoading(false)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const selectAll = () => {
    setSelectedIds(entries.map(e => e._id))
  }

  const selectNone = () => {
    setSelectedIds([])
  }

  const handleBulkMove = async () => {
    if (selectedIds.length === 0) return
    if (!targetCourseId && !targetCategory) {
      alert('Please select a target course or category')
      return
    }

    setLoading(true)
    setMessage(`Moving ${selectedIds.length} items...`)

    try {
      const transaction = client.transaction()
      
      selectedIds.forEach(id => {
        const entry = entries.find(e => e._id === id)
        if (!entry) return

        const patch: any = {}
        
        if (targetCourseId) {
          if (entry._type === 'wallOfExcellence') {
            patch.course = [{ _type: 'reference', _ref: targetCourseId }]
          } else {
            patch.course = { _type: 'reference', _ref: targetCourseId }
          }
        }

        if (targetCategory && entry._type === 'successStory') {
          patch.category = targetCategory
        }

        transaction.patch(id, p => p.set(patch))
      })

      await transaction.commit()
      setMessage(`Successfully moved ${selectedIds.length} items!`)
      setSelectedIds([])
      await fetchData()
    } catch (err) {
      console.error(err)
      setMessage('Error moving items. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Card padding={4} border shadow={1} radius={2}>
          <Stack space={4}>
            <Text weight="bold" size={2}>Bulk Operations Dashboard</Text>
            <Text size={1} muted>Select entries from the list below and move them to a different course or section in one click.</Text>
            
            <Grid columns={[1, 1, 3]} gap={4}>
              <Stack space={2}>
                <Label>1. Move to Course</Label>
                <Select value={targetCourseId} onChange={(e: any) => setTargetCourseId(e.target.value)}>
                  <option value="">-- No Change --</option>
                  {courses.map(c => (
                    <option key={c._id} value={c._id}>{c.name} ({c.category || 'Legacy'})</option>
                  ))}
                </Select>
              </Stack>

              <Stack space={2}>
                <Label>2. Change Section (Stories Only)</Label>
                <Select value={targetCategory} onChange={(e: any) => setTargetCategory(e.target.value)}>
                  <option value="">-- No Change --</option>
                  <option value="video">Video Testimonial</option>
                  <option value="written">Written Testimonial</option>
                  <option value="image">Image Testimonial</option>
                </Select>
              </Stack>

              <Stack space={2} justify="flex-end">
                <Button 
                  text={`Move ${selectedIds.length} selected items`} 
                  tone="primary" 
                  onClick={handleBulkMove} 
                  disabled={loading || selectedIds.length === 0}
                  padding={3}
                />
              </Stack>
            </Grid>

            {message && <Text tone={message.includes('Error') ? 'critical' : 'positive'}>{message}</Text>}
          </Stack>
        </Card>

        <Card padding={4} border radius={2}>
          <Stack space={4}>
            <Flex justify="space-between" align="center">
              <Text weight="bold">Entries List ({entries.length})</Text>
              <Flex gap={2}>
                <Button size={1} text="Select All" onClick={selectAll} mode="ghost" />
                <Button size={1} text="Select None" onClick={selectNone} mode="ghost" />
                <Button size={1} text="Refresh" onClick={fetchData} mode="ghost" icon={RefreshIcon} />
              </Flex>
            </Flex>

            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <Stack space={1}>
                {entries.map(entry => {
                  const isSelected = selectedIds.includes(entry._id)
                  return (
                    <Card 
                      key={entry._id} 
                      padding={3} 
                      border 
                      radius={1} 
                      style={{ background: isSelected ? '#f0f7ff' : 'transparent', cursor: 'pointer' }}
                      onClick={() => toggleSelect(entry._id)}
                    >
                      <Flex align="center" gap={3}>
                        <Checkbox checked={isSelected} readOnly />
                        <Stack space={2} flex={1}>
                          <Text size={1} weight="semibold">{entry.name}</Text>
                          <Text size={1} muted>
                            Type: {entry._type} | 
                            Section: {entry.category || 'N/A'} | 
                            Course: {entry.courseName || (entry.courseRefs ? 'Multiple' : 'None')}
                          </Text>
                        </Stack>
                      </Flex>
                    </Card>
                  )
                })}
              </Stack>
            </div>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}

export default BulkMover
