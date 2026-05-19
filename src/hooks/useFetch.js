import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {
    
    setLoading(true)
    setError(null)
    setData(null)

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()

  }, [url]) 

  return { data, loading, error }
}

export default useFetch
