import { useEffect, useState } from 'react'
import { fetchAssets } from '../data/assets'

export function useAssets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchAssets().then((result) => {
      if (cancelled) return
      setAssets(result.assets)
      setError(result.error)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { assets, loading, error }
}
