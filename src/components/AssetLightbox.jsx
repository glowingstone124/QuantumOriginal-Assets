import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
} from 'lucide-react'
import DownloadButton from './DownloadButton.jsx'
import { categoryLabel } from '../data/assets'
import { formatBytes } from '../utils/download'
import { useToast } from '../context/ToastContext'

export default function AssetLightbox({
  asset,
  onClose,
  onPrev,
  onNext,
  position,
  total,
}) {
  const [measured, setMeasured] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    setMeasured(null)
    setZoom(1)
  }, [asset?.id])

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev?.()
      if (event.key === 'ArrowRight') onNext?.()
      if (event.key === '+' || event.key === '=') setZoom((z) => Math.min(z + 0.5, 3))
      if (event.key === '-' || event.key === '_') setZoom((z) => Math.max(z - 0.5, 1))
      if (event.key === '0') setZoom(1)
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onPrev, onNext])

  const handleCopyLink = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(asset.file).then(() => {
        setCopied(true)
        showToast?.(`已复制「${asset.title}」直链`, 'success')
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  if (!asset) return null

  const width = measured?.w || asset.width || 0
  const height = measured?.h || asset.height || 0
  const resolution = width > 0 && height > 0 ? `${width} × ${height}` : '加载中…'

  return createPortal(
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
        aria-label="关闭检视器"
        title="关闭 (Esc)"
      >
        <X size={20} />
      </button>

      {/* Main Image Stage */}
      <div className="lightbox__stage">
        {onPrev && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={onPrev}
            aria-label="上一个素材 (←)"
            title="上一个 (←)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div
          className="lightbox__img-container"
          style={{ transform: `scale(${zoom})`, transition: 'transform 160ms ease-out' }}
        >
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
        </div>

        {onNext && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={onNext}
            aria-label="下一个素材 (→)"
            title="下一个 (→)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Stage Zoom Controls */}
        <div className="lightbox__stage-controls">
          <button
            type="button"
            className="lightbox__stage-btn"
            onClick={() => setZoom((z) => Math.min(z + 0.5, 3))}
            title="放大 (+)"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="lightbox__stage-btn"
            onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
            disabled={zoom <= 1}
            title="缩小 (-)"
          >
            <ZoomOut size={16} />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              className="lightbox__stage-btn"
              onClick={() => setZoom(1)}
              title="重置缩放 (0)"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Metadata Panel */}
      <aside className="lightbox__panel">
        <div className="lightbox__head">
          <div className="lightbox__head-row">
            <span className="lightbox__category-badge">{categoryLabel(asset.category)}</span>
            {total > 0 && <span className="lightbox__counter">{position} / {total}</span>}
          </div>
          <h2>{asset.title}</h2>
          {asset.description && <p>{asset.description}</p>}
        </div>

        <dl className="lightbox__facts">
          {asset.artist && (
            <div>
              <dt>创作者</dt>
              <dd>
                {asset.artistUrl ? (
                  <a href={asset.artistUrl} target="_blank" rel="noreferrer">
                    {asset.artist} ↗
                  </a>
                ) : (
                  asset.artist
                )}
              </dd>
            </div>
          )}
          {asset.series && (
            <div>
              <dt>系列</dt>
              <dd>{asset.series}</dd>
            </div>
          )}
          <div>
            <dt>格式标准</dt>
            <dd>{asset.format}</dd>
          </div>
          <div>
            <dt>分辨率</dt>
            <dd className="hud-highlight">{resolution}</dd>
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
            <dt>授权模式</dt>
            <dd>{asset.license}</dd>
          </div>
          {asset.source && (
            <div>
              <dt>来源出处</dt>
              <dd>
                <a href={asset.source} target="_blank" rel="noreferrer">
                  来源链接 ↗
                </a>
              </dd>
            </div>
          )}
        </dl>

        {asset.tags && asset.tags.length > 0 && (
          <div className="lightbox__tags">
            {asset.tags.map((tag) => (
              <span key={tag} className="chip chip--static">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="lightbox__actions">
          <DownloadButton asset={asset} variant="primary" label="下载超清原文件" />
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleCopyLink}
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            <span>{copied ? '已复制直链' : '复制原图链接'}</span>
          </button>
          <a
            className="btn btn--secondary"
            href={asset.file}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            <span>在新标签打开</span>
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  )
}
