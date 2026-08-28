import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AssetCard from '../components/AssetCard.jsx'
import AssetCardSkeleton from '../components/AssetCardSkeleton.jsx'
import AssetLightbox from '../components/AssetLightbox.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { categoryLabel } from '../data/assets'
import { useAssets } from '../hooks/useAssets'
import { useLightbox } from '../hooks/useLightbox'

export default function GalleryView() {
  const { assets, loading, error } = useAssets()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('cat') || 'all'
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState('date')

  const categories = useMemo(() => {
    const counts = new Map()
    assets.forEach((asset) => counts.set(asset.category, (counts.get(asset.category) || 0) + 1))
    return [...counts.entries()].map(([key, count]) => ({ key, label: categoryLabel(key), count }))
  }, [assets])

  const filtered = useMemo(() => {
    let list = assets
    if (category !== 'all') {
      list = list.filter((asset) => asset.category === category)
    }

    const keyword = query.trim().toLowerCase()
    if (keyword) {
      list = list.filter((asset) =>
        [asset.title, asset.description, ...asset.tags]
          .join(' ')
          .toLowerCase()
          .includes(keyword),
      )
    }

    const sorted = [...list]
    if (sort === 'date') {
      sorted.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    } else if (sort === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'zh'))
    } else if (sort === 'res') {
      sorted.sort((a, b) => b.width * b.height - a.width * a.height)
    }

    return sorted
  }, [assets, category, query, sort])

  const lightbox = useLightbox(filtered)

  const updateCategory = (next) => {
    if (next === 'all') {
      searchParams.delete('cat')
    } else {
      searchParams.set('cat', next)
    }
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <div className="gallery">
      <div className="page-shell">
        <div className="gallery-head">
          <h1>素材库</h1>
          <p>全部素材均可在线预览并下载高清原文件。</p>
        </div>

        <FilterBar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={updateCategory}
          sort={sort}
          onSortChange={setSort}
          categories={categories}
          shown={filtered.length}
          total={assets.length}
        />

        {loading ? (
          <div className="asset-grid">
            {Array.from({ length: 8 }, (_, index) => (
              <AssetCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="state-note state-note--error">
            <p>{error.message}</p>
            <p>请确认 public/assets/manifest.json 是否存在且包含素材条目。</p>
          </div>
        ) : filtered.length ? (
          <div className="asset-grid">
            {filtered.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onOpen={lightbox.openAt} />
            ))}
          </div>
        ) : (
          <div className="state-note">
            <p>没有符合条件素材质。</p>
            <p>试试调整关键词或切换分类。</p>
          </div>
        )}
      </div>

      {lightbox.asset ? (
        <AssetLightbox
          asset={lightbox.asset}
          position={lightbox.index + 1}
          total={lightbox.total}
          onClose={lightbox.close}
          onPrev={lightbox.index > 0 ? lightbox.prev : null}
          onNext={lightbox.index < lightbox.total - 1 ? lightbox.next : null}
        />
      ) : null}
    </div>
  )
}
