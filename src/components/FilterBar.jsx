import { Search, X } from 'lucide-react'

export default function FilterBar({
  query,
  onQueryChange,
  tag,
  onTagChange,
  sort,
  onSortChange,
  tags,
  shown,
  total,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <Search size={16} className="filter-bar__search-icon" />
        <input
          type="search"
          value={query}
          placeholder="搜索素材标题、作者或标签…"
          aria-label="搜索素材"
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {query && (
          <button
            type="button"
            className="filter-bar__clear-btn"
            onClick={() => onQueryChange('')}
            aria-label="清空搜索"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="filter-bar__chips" aria-label="标签筛选">
        <button
          type="button"
          className={tag === 'all' ? 'chip is-active' : 'chip'}
          onClick={() => onTagChange('all')}
        >
          <span>全部</span>
          <em>{total}</em>
        </button>
        {tags.map((t) => (
          <button
            key={t.name}
            type="button"
            className={tag === t.name ? 'chip is-active' : 'chip'}
            onClick={() => onTagChange(t.name)}
          >
            <span>#{t.name}</span>
            <em>{t.count}</em>
          </button>
        ))}
      </div>

      <label className="filter-bar__sort">
        <span className="mono-label">排序</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="date">最新发布</option>
          <option value="name">名称 (A→Z)</option>
          <option value="res">超清分辨率</option>
          <option value="size">文件大小</option>
        </select>
      </label>

      <span className="filter-bar__count mono-label">{shown} 项结果</span>
    </div>
  )
}
