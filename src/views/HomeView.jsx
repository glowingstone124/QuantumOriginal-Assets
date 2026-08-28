import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AssetCard from '../components/AssetCard.jsx'
import AssetCardSkeleton from '../components/AssetCardSkeleton.jsx'
import AssetLightbox from '../components/AssetLightbox.jsx'
import { categoryLabel } from '../data/assets'
import { useAssets } from '../hooks/useAssets'
import { useLightbox } from '../hooks/useLightbox'

export default function HomeView() {
  const { assets, loading, error } = useAssets()
  const lightbox = useLightbox(assets)

  const featured = useMemo(() => {
    const picked = assets.filter((asset) => asset.featured)
    return (picked.length ? picked : assets).slice(0, 4)
  }, [assets])

  const categories = useMemo(() => {
    const counts = new Map()
    assets.forEach((asset) => counts.set(asset.category, (counts.get(asset.category) || 0) + 1))
    return [...counts.entries()].map(([key, count]) => ({ key, label: categoryLabel(key), count }))
  }, [assets])

  const stats = useMemo(() => {
    const categoryCount = new Set(assets.map((asset) => asset.category)).size
    const maxWidth = assets.reduce((max, asset) => Math.max(max, asset.width), 0)
    return [
      { label: '素材总数', value: assets.length ? String(assets.length) : '—' },
      { label: '覆盖分类', value: categoryCount ? String(categoryCount) : '—' },
      {
        label: '最高分辨率',
        value: maxWidth >= 1000 ? `${Math.round(maxWidth / 1000)}K+` : maxWidth > 0 ? `${maxWidth}px` : '高清原文件',
      },
      { label: '授权方式', value: 'CC0' },
    ]
  }, [assets])

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero__inner">
          <h1 id="home-title" className="wordmark hero-wordmark">
            <span>Quantum</span>
            <span>Original</span>
          </h1>
          <p className="hero-assets wordmark-solid" aria-hidden="true">
            Assets
          </p>
          <a className="scroll-cue" href="#home-featured">
            <span>向下探索</span>
            <span className="scroll-cue-line" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="stats-strip" aria-label="素材库数据">
        <div className="page-shell stats-strip__inner">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span className="mono-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="home-featured" className="home-section" aria-labelledby="featured-title">
        <div className="page-shell">
          <div className="section-heading">
            <h2 id="featured-title">精选素材</h2>
            <Link className="section-link" to="/gallery">
              查看全部 <span aria-hidden="true">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="asset-grid asset-grid--featured">
              {Array.from({ length: 4 }, (_, index) => (
                <AssetCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="state-note state-note--error">
              <p>{error.message}</p>
              <p>请确认 public/assets/manifest.json 是否存在且包含素材条目。</p>
            </div>
          ) : featured.length ? (
            <div className="asset-grid asset-grid--featured">
              {featured.map((asset) => (
                <AssetCard key={asset.id} asset={asset} onOpen={lightbox.openAt} />
              ))}
            </div>
          ) : (
            <p className="state-note mono-label">暂无精选素材</p>
          )}
        </div>
      </section>

      {categories.length ? (
        <section className="home-section home-section--tight" aria-labelledby="categories-title">
          <div className="page-shell">
            <div className="section-heading">
              <h2 id="categories-title">按分类浏览</h2>
            </div>
            <div className="category-grid">
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  className="category-card"
                  to={`/gallery?cat=${cat.key}`}
                >
                  <strong>{cat.label}</strong>
                  <span className="mono-label">{cat.count} 件作品</span>
                  <span className="category-card__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
