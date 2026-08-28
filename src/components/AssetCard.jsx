import DownloadButton from './DownloadButton.jsx'
import { categoryLabel } from '../data/assets'

export default function AssetCard({ asset, onOpen }) {
  return (
    <article className="asset-card" onClick={() => onOpen(asset)}>
      <div className="asset-card__media">
        <img src={asset.thumb} alt={asset.title} loading="lazy" decoding="async" />
        <div className="asset-card__overlay" aria-hidden="true">
          <span className="mono-label">预览详情</span>
        </div>
        <span className="asset-card__format mono-label">{asset.format}</span>
      </div>
      <div className="asset-card__body">
        <div className="asset-card__meta">
          <span className="asset-card__category">{categoryLabel(asset.category)}</span>
          {asset.date ? <time dateTime={asset.date}>{asset.date.replaceAll('-', '.')}</time> : null}
        </div>
        <h3>{asset.title}</h3>
        <div className="asset-card__actions">
          <DownloadButton asset={asset} variant="ghost" label="下载原图" />
        </div>
      </div>
    </article>
  )
}
