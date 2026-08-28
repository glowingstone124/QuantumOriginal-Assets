export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value >= 100 || unit === 0 ? Math.round(value) : value.toFixed(2)} ${units[unit]}`
}

export function suggestedFilename(asset) {
  try {
    const url = new URL(asset.file, window.location.href)
    const name = decodeURIComponent(url.pathname.split('/').pop() || '')
    return name || asset.id
  } catch {
    return asset.id
  }
}

export async function downloadAsset(asset) {
  try {
    const res = await fetch(asset.file, { mode: 'cors' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = suggestedFilename(asset)
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 8000)
    return { ok: true, message: '已开始下载' }
  } catch {
    window.open(asset.file, '_blank', 'noopener,noreferrer')
    return { ok: false, message: '已在新标签页打开原图，请手动保存' }
  }
}
