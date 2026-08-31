export default function AssetCardSkeleton() {
  return (
    <div className="asset-card asset-card--skeleton" aria-hidden="true">
      <div className="asset-card__media skeleton skeleton--media" />
      <div className="asset-card__body">
        <div className="skeleton skeleton--line" style={{ width: '40%', height: '0.8rem', marginBottom: '0.6rem' }} />
        <div className="skeleton skeleton--line" style={{ width: '80%', height: '1.2rem', marginBottom: '0.9rem' }} />
        <div className="asset-card__actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="skeleton skeleton--btn" style={{ width: '100%', height: '36px' }} />
        </div>
      </div>
    </div>
  )
}
