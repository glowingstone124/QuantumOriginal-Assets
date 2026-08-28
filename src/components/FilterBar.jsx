export default function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
  shown,
  total,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <input
          type="search"
          value={query}
          placeholder="搜索标题或标签…"
          aria-label="搜索素材"
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div className="filter-bar__chips" aria-label="分类筛选">
        <button
          type="button"
          className={category === 'all' ? 'chip is-active' : 'chip'}
          onClick={() => onCategoryChange('all')}
        >
          全部 <em>{total}</em>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={category === cat.key ? 'chip is-active' : 'chip'}
            onClick={() => onCategoryChange(cat.key)}
          >
            {cat.label} <em>{cat.count}</em>
          </button>
        ))}
      </div>

      <label className="filter-bar__sort">
        <span className="mono-label">排序</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="date">最新优先</option>
          <option value="name">名称 A→Z</option>
          <option value="res">分辨率优先</option>
        </select>
      </label>

      <span className="filter-bar__count mono-label">{shown} 项结果</span>
    </div>
  )
}
