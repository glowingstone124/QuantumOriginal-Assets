export default function AssetCardSkeleton() {
  return (
    <article className="asset-card asset-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--media" />
      <div className="asset-card__body">
        <div className="skeleton skeleton--line skeleton--line-short" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--chip" />
      </div>
    </article>
  )
}
