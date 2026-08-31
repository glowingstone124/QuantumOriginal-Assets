import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AssetCard from '../components/AssetCard.jsx'
import AssetCardSkeleton from '../components/AssetCardSkeleton.jsx'
import AssetLightbox from '../components/AssetLightbox.jsx'
import { categoryLabel } from '../data/assets'
import { useAssets } from '../hooks/useAssets'
import { useLightbox } from '../hooks/useLightbox'
import { ArrowRight, Maximize2 } from 'lucide-react'

export default function HomeView() {
  const { assets, loading, error } = useAssets()
  const lightbox = useLightbox(assets)

  const featured = useMemo(() => {
    const picked = assets.filter((asset) => asset.featured)
    return (picked.length ? picked : assets).slice(0, 4)
  }, [assets])

  const spotlightAsset = useMemo(() => {
    return assets.find((asset) => asset.featured) || assets[0] || null
  }, [assets])

  const seriesList = useMemo(() => {
    const counts = new Map()
    assets.forEach((asset) => {
      const name = asset.series || 'Pixel Fantasia'
      counts.set(name, (counts.get(name) || 0) + 1)
    })
    return [...counts.entries()].map(([name, count]) => ({ name, count }))
  }, [assets])

  const stats = useMemo(() => {
    const maxWidth = assets.reduce((max, asset) => Math.max(max, asset.width), 0)
    return [
      { label: '素材总数', value: assets.length ? String(assets.length) : '—' },
      { label: '收录系列', value: 'Pixel Fantasia' },
      {
        label: '最高分辨率',
        value: maxWidth >= 3840 ? '4K+' : maxWidth > 0 ? `${maxWidth}px` : '4K UHD',
      },
      { label: '授权方式', value: '个人非商业' },
    ]
  }, [assets])

  return (
    <div className="home">
      {/* Editorial Architectural Hero */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero__split">
          {/* Left Column: Typographic Exhibition Header */}
          <div className="home-hero__left">
            <div className="hero-wordmark-wrap">
              <h1 id="home-title" className="wordmark hero-wordmark">
                <span>Quantum</span>
                <span>Original</span>
              </h1>
              <div className="hero-assets wordmark-solid" aria-hidden="true">
                Assets
              </div>
            </div>

            <p className="hero-lead">
              官方原创视觉素材归档库。收录 Pixel Fantasia 原创艺术系列作品，提供 4K+ 超清母带原画在线检视与无损文件下载。
            </p>

            <div className="hero-cta-group">
              <Link to="/gallery" className="btn btn--primary btn--lg">
                <span>浏览全部素材</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/license" className="btn btn--secondary btn--lg">
                <span>授权使用说明</span>
              </Link>
            </div>

            {/* Quick Series Jump Bar */}
            <div className="hero-quick-links">
              {seriesList.map((s) => (
                <Link
                  key={s.name}
                  to={`/gallery?tag=${encodeURIComponent(s.name)}`}
                  className="hero-quick-tag"
                >
                  <span>#{s.name}</span>
                  <span className="hero-quick-tag__count">{s.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Spotlight Exhibition Card */}
          {spotlightAsset && (
            <div className="home-hero__right">
              <div
                className="hero-spotlight"
                onClick={() => lightbox.openAt(spotlightAsset)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && lightbox.openAt(spotlightAsset)}
              >
                <div className="hero-spotlight__media">
                  <img
                    src={spotlightAsset.thumb}
                    alt={spotlightAsset.title}
                    className="hero-spotlight__img"
                  />
                  <div className="hero-spotlight__badge mono-label">
                    {spotlightAsset.series || 'Pixel Fantasia'}
                  </div>
                  <div className="hero-spotlight__overlay">
                    <span className="hero-spotlight__zoom-btn">
                      <Maximize2 size={16} />
                      <span>全屏检视</span>
                    </span>
                  </div>
                </div>
                <div className="hero-spotlight__footer">
                  <div className="hero-spotlight__info">
                    <h3 className="hero-spotlight__title">{spotlightAsset.title}</h3>
                    {spotlightAsset.artist && (
                      <span className="hero-spotlight__artist">
                        by {spotlightAsset.artist}
                      </span>
                    )}
                  </div>
                  {spotlightAsset.width && spotlightAsset.height && (
                    <span className="hero-spotlight__res mono-label">
                      {spotlightAsset.width} × {spotlightAsset.height}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4-Cell Structural Stats HUD */}
      <section className="stats-strip" aria-label="素材库指标">
        <div className="page-shell stats-strip__inner">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Assets Grid */}
      <section id="home-featured" className="home-section" aria-labelledby="featured-title">
        <div className="page-shell">
          <div className="section-heading">
            <h2 id="featured-title">精选作品</h2>
            <Link className="section-link" to="/gallery">
              <span>全部素材库</span>
              <ArrowRight size={16} />
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
              <p>请确认素材库配置文件是否存在且格式正确。</p>
            </div>
          ) : featured.length ? (
            <div className="asset-grid asset-grid--featured">
              {featured.map((asset) => (
                <AssetCard key={asset.id} asset={asset} onOpen={lightbox.openAt} />
              ))}
            </div>
          ) : (
            <p className="state-note">暂无精选素材</p>
          )}
        </div>
      </section>

      {/* Series Section */}
      {seriesList.length ? (
        <section className="home-section home-section--tight" aria-labelledby="series-title">
          <div className="page-shell">
            <div className="section-heading">
              <h2 id="series-title">系列作品</h2>
            </div>
            <div className="category-grid">
              {seriesList.map((s) => (
                <Link
                  key={s.name}
                  className="category-card"
                  to={`/gallery?tag=${encodeURIComponent(s.name)}`}
                >
                  <strong>{s.name}</strong>
                  <span className="category-card__count">{s.count} 件作品</span>
                  <span className="category-card__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Lightbox Modal */}
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
