import { useState } from 'react'
import { useClient } from 'sanity'
import { Stack, Button, Text, Box } from '@sanity/ui'

export const MoveToCategoryAction = (props: any) => {
  const { id, type, onComplete } = props
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const client = useClient({ apiVersion: '2024-01-01' })

  if (type !== 'successStory') {
    return null
  }

  const categories = [
    { title: 'Video Testimonial', value: 'video' },
    { title: 'Written Testimonial', value: 'written' },
    { title: 'Image Testimonial', value: 'image' },
  ]

  const handleMove = async (category: string) => {
    setLoading(true)
    try {
      await client.patch(id).set({ category }).commit()
      onComplete()
    } catch (err) {
      console.error('Move failed', err)
    } finally {
      setLoading(false)
      setDialogOpen(false)
    }
  }

  return {
    label: 'Change Section/Category',
    onHandle: () => setDialogOpen(true),
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => setDialogOpen(false),
      header: 'Select Target Section',
      content: (
        <Box padding={4}>
          <Stack space={2}>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => handleMove(cat.value)}
                mode="ghost"
                padding={3}
                text={cat.title}
                justify="flex-start"
              />
            ))}
          </Stack>
        </Box>
      )
    }
  }
}
