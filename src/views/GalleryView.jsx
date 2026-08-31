import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AssetCard from '../components/AssetCard.jsx'
import AssetCardSkeleton from '../components/AssetCardSkeleton.jsx'
import AssetLightbox from '../components/AssetLightbox.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { useAssets } from '../hooks/useAssets'
import { useLightbox } from '../hooks/useLightbox'

export default function GalleryView() {
  const { assets, loading, error } = useAssets()
  const [searchParams, setSearchParams] = useSearchParams()
  const tag = searchParams.get('tag') || 'all'
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState('date')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null && q !== query) {
      setQuery(q)
    }
  }, [searchParams])

  const tagsList = useMemo(() => {
    const counts = new Map()
    assets.forEach((asset) => {
      asset.tags.forEach((t) => {
        counts.set(t, (counts.get(t) || 0) + 1)
      })
    })
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'))
  }, [assets])

  const filtered = useMemo(() => {
    let list = assets
    if (tag !== 'all') {
      list = list.filter((asset) => asset.tags.includes(tag))
    }

    const keyword = query.trim().toLowerCase()
    if (keyword) {
      list = list.filter((asset) =>
        [asset.title, asset.description, asset.artist, asset.series, ...asset.tags]
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
    } else if (sort === 'size') {
      sorted.sort((a, b) => (b.bytes || 0) - (a.bytes || 0))
    }

    return sorted
  }, [assets, tag, query, sort])

  const lightbox = useLightbox(filtered)

  const updateTag = (next) => {
    if (next === 'all') {
      searchParams.delete('tag')
    } else {
      searchParams.set('tag', next)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const updateQuery = (next) => {
    setQuery(next)
    if (!next.trim()) {
      searchParams.delete('q')
    } else {
      searchParams.set('q', next)
    }
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <div className="gallery">
      <div className="page-shell">
        <div className="gallery-head">
          <h1>素材库</h1>
          <p>全部素材均可在线即时预览并免费下载高清母带原文件。</p>
        </div>

        <FilterBar
          query={query}
          onQueryChange={updateQuery}
          tag={tag}
          onTagChange={updateTag}
          sort={sort}
          onSortChange={setSort}
          tags={tagsList}
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
            <p>请确认 public/assets/manifest.json 是否存在且格式正确。</p>
          </div>
        ) : filtered.length ? (
          <div className="asset-grid">
            {filtered.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onOpen={lightbox.openAt} />
            ))}
          </div>
        ) : (
          <div className="state-note">
            <p>没有找到符合条件的素材作品。</p>
            <p>建议尝试调整搜索关键词或切换标签。</p>
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
