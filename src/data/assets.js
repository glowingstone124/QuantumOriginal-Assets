export const CATEGORY_META = {
  pixelfantasia: { label: 'Pixel Fantasia', folder: 'pixelfantasia' },
  illustration: { label: 'Pixel Fantasia', folder: 'illustrations' },
}

export function categoryLabel(key) {
  return CATEGORY_META[key]?.label || 'Pixel Fantasia'
}

function guessFormat(file) {
  const match = /\.([a-z0-9]+)(?:$|\?)/i.exec(file || '')
  return match ? match[1].toUpperCase() : 'FILE'
}

export function normalizeAsset(raw, index) {
  return {
    id: String(raw.id || `asset-${index + 1}`),
    title: raw.title || raw.id || `未命名素材 ${index + 1}`,
    description: raw.description || '',
    category: raw.category || 'pixelfantasia',
    file: raw.file || '',
    thumb: raw.thumb || raw.file || '',
    width: Number(raw.width) || 0,
    height: Number(raw.height) || 0,
    bytes: Number(raw.bytes) || 0,
    format: String(raw.format || guessFormat(raw.file)).toUpperCase(),
    tags: Array.isArray(raw.tags) ? raw.tags : ['Pixel Fantasia'],
    series: raw.series || 'Pixel Fantasia',
    artist: raw.artist || '',
    artistUrl: raw.artistUrl || '',
    date: raw.date || '',
    license: raw.license || '个人非商业使用',
    source: raw.source || '',
    featured: Boolean(raw.featured),
  }
}

export async function fetchAssets() {
  try {
    const res = await fetch('/assets/manifest.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`manifest.json 加载失败（HTTP ${res.status}）`)
    const list = await res.json()
    if (!Array.isArray(list)) throw new Error('manifest.json 格式错误：顶层应为数组')
    const assets = list.map(normalizeAsset).filter((asset) => asset.file)
    if (!assets.length) throw new Error('manifest.json 中暂无素材条目')
    return { assets, error: null }
  } catch (error) {
    return { assets: [], error }
  }
}
