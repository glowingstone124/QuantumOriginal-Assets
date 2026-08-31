import { useState } from 'react'
import { Download, Copy, Check, ArrowRight } from 'lucide-react'
import DownloadButton from './DownloadButton.jsx'
import { categoryLabel } from '../data/assets'
import { useToast } from '../context/ToastContext'

export default function AssetCard({ asset, onOpen }) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopyLink = (e) => {
    e.stopPropagation()
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(asset.file).then(() => {
        setCopied(true)
        showToast?.(`已复制「${asset.title}」直链`, 'success')
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const resLabel = asset.width && asset.height ? `${asset.width} × ${asset.height}` : null

  return (
    <article
      className="asset-card"
      onClick={() => onOpen(asset)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(asset)}
    >
      <div className="asset-card__media">
        <img
          src={asset.thumb}
          alt={asset.title}
          loading="lazy"
          decoding="async"
          className="asset-card__img"
        />

        {/* Angular Corner Format Badge */}
        <span className="asset-card__format mono-label">{asset.format}</span>

        {/* Minimalist Hover Overlay */}
        <div className="asset-card__overlay" aria-hidden="true">
          <span className="mono-label asset-card__overlay-text">检视详情 [SPACE]</span>
        </div>
      </div>

      <div className="asset-card__body">
        <div className="asset-card__meta">
          <span className="asset-card__category">{categoryLabel(asset.category)}</span>
          {asset.date && (
            <time dateTime={asset.date} className="asset-card__date mono-label">
              {asset.date.replaceAll('-', '.')}
            </time>
          )}
          {resLabel && <span className="asset-card__res mono-label">{resLabel}</span>}
        </div>

        <h3 className="asset-card__title">{asset.title}</h3>

        <div className="asset-card__actions">
          <DownloadButton
            asset={asset}
            variant="ghost"
            size="sm"
            label="下载原图"
            className="asset-card__dl"
          />
          <button
            type="button"
            className="asset-card__copy-btn"
            onClick={handleCopyLink}
            title={copied ? '已复制链接' : '复制原图直链'}
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </article>
  )
}
