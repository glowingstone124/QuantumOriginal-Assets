import { useCallback, useState } from 'react'

export function useLightbox(assets) {
  const [index, setIndex] = useState(-1)

  const openAt = useCallback(
    (asset) => {
      const found = assets.findIndex((item) => item.id === asset.id)
      setIndex(found >= 0 ? found : -1)
    },
    [assets],
  )
  const close = useCallback(() => setIndex(-1), [])
  const prev = useCallback(() => setIndex((current) => (current > 0 ? current - 1 : current)), [])
  const next = useCallback(
    () => setIndex((current) => (current >= 0 && current < assets.length - 1 ? current + 1 : current)),
    [assets.length],
  )

  return {
    asset: index >= 0 ? assets[index] : null,
    index,
    total: assets.length,
    openAt,
    close,
    prev,
    next,
  }
}
