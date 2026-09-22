import React from 'react'
import { useEffect, useState } from 'react'
import type { CmsData } from '../../types/cms';

const useFetch = (url) => {

    const [data, setData] = useState<CmsData>(null)
    const [loading, setLoading] = useState<boolean>(false)
    // Initialised to `true` and later assigned the caught error object, so
    // this state has always held either a boolean or an Error. Typed loosely
    // to preserve that exactly rather than changing the initial value.
    const [error, setError] = useState<CmsData>(true)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json as CmsData)
                setLoading(false)

            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [url])


    return { loading, error, data }
}

export default useFetch