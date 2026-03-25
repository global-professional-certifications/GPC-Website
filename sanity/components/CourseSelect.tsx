import React, { useCallback, useEffect, useState } from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'

export const CourseSelect = (props: any) => {
  const { value, onChange, schemaType } = props
  const [docs, setDocs] = useState<any[]>([])
  
  // Read the current category from the document form dynamically, or fallback to schema options
  const formCategory = useFormValue(['category']) as string | undefined
  const customCategory = schemaType?.options?.customCategory as string | undefined
  const category = customCategory || formCategory

  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    // Only fetch courses for the specific category to strictly isolate options
    let query = `*[_type == "testimonialCourse"] | order(order asc)`
    let params = {}
    
    if (category) {
      query = `*[_type == "testimonialCourse" && category == $cat] | order(order asc)`
      params = { cat: category }
    }
    
    client.fetch(query, params).then(setDocs)
  }, [category, client])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const val = event.currentTarget.value
      if (!val) {
        onChange(unset())
      } else {
        onChange(set({ _type: 'reference', _ref: val }))
      }
    },
    [onChange]
  )

  return (
    <select 
      value={value?._ref || ''} 
      onChange={handleChange}
      style={{ padding: '0.7em', fontSize: '1rem', cursor: 'pointer', width: '100%', border: '1px solid #caced1', borderRadius: '4px', background: 'transparent', color: 'inherit' }}
    >
      <option value="">--- Select A Course ---</option>
      {docs.map((d) => (
        <option key={d._id} value={d._id}>
          {d.name}
        </option>
      ))}
    </select>
  )
}
