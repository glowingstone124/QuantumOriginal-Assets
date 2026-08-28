import { useEffect, useRef, useState } from 'react'
import DownloadButton from './DownloadButton.jsx'
import { categoryLabel } from '../data/assets'
import { formatBytes } from '../utils/download'

export default function AssetLightbox({ asset, onClose, onPrev, onNext, position, total }) {
  const [measured, setMeasured] = useState(null)
  const closeRef = useRef(null)

  useEffect(() => {
    setMeasured(null)
  }, [asset?.id])

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev?.()
      if (event.key === 'ArrowRight') onNext?.()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onPrev, onNext])

  if (!asset) return null

  const resolution = measured
    ? `${measured.w} × ${measured.h}`
    : asset.width > 0
      ? `${asset.width} × ${asset.height}`
      : '加载后识别'

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={asset.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="关闭预览"
      >
        ×
      </button>

      <div className="lightbox__stage">
        {onPrev ? (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={onPrev}
            aria-label="上一个素材"
          >
            ←
          </button>
        ) : null}
        <img
          key={asset.file}
          src={asset.file}
          alt={asset.title}
          decoding="async"
          onLoad={(event) =>
            setMeasured({
              w: event.currentTarget.naturalWidth,
              h: event.currentTarget.naturalHeight,
            })
          }
        />
        {onNext ? (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={onNext}
            aria-label="下一个素材"
          >
            →
          </button>
        ) : null}
      </div>

      <aside className="lightbox__panel">
        <div className="lightbox__head">
          <span className="mono-label">
            {categoryLabel(asset.category)}
            {total > 0 ? ` ${position} / ${total}` : ''}
          </span>
          <h2>{asset.title}</h2>
          {asset.description ? <p>{asset.description}</p> : null}
        </div>

        <dl className="lightbox__facts">
          {asset.artist ? (
            <div>
              <dt>创作者</dt>
              <dd>
                {asset.artistUrl ? (
                  <a href={asset.artistUrl} target="_blank" rel="noreferrer">
                    {asset.artist}
                  </a>
                ) : (
                  asset.artist
                )}
              </dd>
            </div>
          ) : null}
          {asset.series ? (
            <div>
              <dt>系列</dt>
              <dd>{asset.series}</dd>
            </div>
          ) : null}
          <div>
            <dt>格式</dt>
            <dd>{asset.format}</dd>
          </div>
          <div>
            <dt>分辨率</dt>
            <dd>{resolution}</dd>
          </div>
          <div>
            <dt>文件大小</dt>
            <dd>{formatBytes(asset.bytes)}</dd>
          </div>
          <div>
            <dt>发布日期</dt>
            <dd>{asset.date || '—'}</dd>
          </div>
          <div>
            <dt>授权</dt>
            <dd>{asset.license}</dd>
          </div>
          {asset.source ? (
            <div>
              <dt>来源</dt>
              <dd>
                <a href={asset.source} target="_blank" rel="noreferrer">
                  {asset.source}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        {asset.tags.length ? (
          <div className="lightbox__tags">
            {asset.tags.map((tag) => (
              <span key={tag} className="chip chip--static">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="lightbox__actions">
          <DownloadButton asset={asset} />
          <a className="btn" href={asset.file} target="_blank" rel="noreferrer">
            在新标签打开
          </a>
        </div>
      </aside>
    </div>
  )
}
