import { useState } from 'react'
import { useClient } from 'sanity'
import { Stack, Button, Text, Box, Card } from '@sanity/ui'

export const MoveToCourseAction = (props: any) => {
  const { id, type, onComplete } = props
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const client = useClient({ apiVersion: '2024-01-01' })

  if (!['wallOfExcellence', 'successStory'].includes(type)) {
    return null
  }

  const handleOpen = async () => {
    setLoading(true)
    setDialogOpen(true)
    const result = await client.fetch(`*[_type == "testimonialCourse"] | order(name asc) { _id, name, category }`)
    setCourses(result)
    setLoading(false)
  }

  const handleMove = async (courseId: string) => {
    setLoading(true)
    try {
      if (type === 'wallOfExcellence') {
        await client.patch(id).set({ course: [{ _type: 'reference', _ref: courseId }] }).commit()
      } else {
        await client.patch(id).set({ course: { _type: 'reference', _ref: courseId } }).commit()
      }
      onComplete()
    } catch (err) {
      console.error('Move failed', err)
    } finally {
      setLoading(false)
      setDialogOpen(false)
    }
  }

  return {
    label: 'Move to Course',
    onHandle: handleOpen,
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => setDialogOpen(false),
      header: 'Select Target Course',
      content: (
        <Box padding={4}>
          {loading ? (
            <Text>Loading courses...</Text>
          ) : (
            <Stack space={2}>
              {courses.map((course) => (
                <Button
                  key={course._id}
                  onClick={() => handleMove(course._id)}
                  mode="ghost"
                  padding={3}
                  justify="flex-start"
                >
                  <Stack space={2}>
                    <Text size={1} weight="semibold">{course.name}</Text>
                    <Text size={1} muted>Section: {course.category || 'Legacy'}</Text>
                  </Stack>
                </Button>
              ))}
            </Stack>
          )}
        </Box>
      )
    }
  }
}
