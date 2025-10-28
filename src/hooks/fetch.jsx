import { use, useEffect, useState } from 'react'

const fetch = (url) => {

    const [data, setData] = useState(null)
    const { error, setError } = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
                setLoading(false)

            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
    }, [url])


    return { data, error, loading }
}

export default fetch