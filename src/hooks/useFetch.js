import { useState, useEffect } from 'react'

/**
 * useFetch - A custom hook that handles GET requests.
 *
 * Encapsulates the repetitive pattern of:
 *   - tracking loading state
 *   - tracking error state
 *   - fetching data on mount
 *   - storing the result
 *
 * Any component that needs to fetch data can use this hook
 * instead of writing the same useEffect + useState pattern every time.
 *
 * @param {string} url - The endpoint to fetch from.
 * @returns {{ data, loading, error }} - The fetched data, loading flag, and any error.
 */
function useFetch(url) {
  // data holds the parsed JSON response once the fetch completes
  const [data, setData] = useState(null)

  // loading is true while the request is in flight
  // Components can use this to show a spinner or skeleton
  const [loading, setLoading] = useState(true)

  // error holds any error message if the request fails
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reset state at the start of every new fetch.
    // This matters when the url prop changes — we don't want
    // stale data from a previous fetch showing while the new one loads.
    setLoading(true)
    setError(null)
    setData(null)

    // AbortController lets us cancel the fetch if the component
    // unmounts before the request completes, preventing memory leaks
    // and state updates on unmounted components.
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(res => {
        // A 404 or 500 response doesn't throw automatically in fetch —
        // we have to check res.ok ourselves and throw manually.
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        // AbortError is expected when the component unmounts — not a real error
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    // Cleanup function: cancel the fetch if the component unmounts
    // or if the url changes before the current fetch finishes
    return () => controller.abort()

  }, [url]) // re-run the effect whenever the url changes

  return { data, loading, error }
}

export default useFetch
