import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { categoryLabel } from '../data/assets'

export default function QuickSearchModal({ isOpen, onClose, assets, onSelectAsset }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = query.trim()
    ? assets.filter((asset) => {
        const text = `${asset.title} ${asset.series} ${asset.artist} ${asset.category} ${categoryLabel(asset.category)} ${asset.tags.join(' ')}`.toLowerCase()
        return text.includes(query.trim().toLowerCase())
      })
    : assets.slice(0, 6)

  const handleAssetClick = (asset) => {
    onClose()
    onSelectAsset(asset)
  }

  const handleGoToGallery = () => {
    onClose()
    navigate(`/gallery?q=${encodeURIComponent(query.trim())}`)
  }

  return createPortal(
    <div
      className="search-palette-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="快速检索素材"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="search-palette">
        <div className="search-palette__input-wrap">
          <Search size={18} className="search-palette__icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-palette__input"
            placeholder="搜索素材标题、作者或标签…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleGoToGallery()
              }
            }}
          />
          {query && (
            <button
              type="button"
              className="search-palette__clear"
              onClick={() => setQuery('')}
              aria-label="清空搜索"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="search-palette__esc">ESC</kbd>
        </div>

        <div className="search-palette__content">
          <div className="search-palette__section-title">
            <span>{query.trim() ? `搜索结果 (${filtered.length})` : '素材快速检视'}</span>
            {query.trim() && (
              <button
                type="button"
                className="search-palette__all-btn"
                onClick={handleGoToGallery}
              >
                在素材库中查看全部 <ArrowRight size={13} />
              </button>
            )}
          </div>

          <div className="search-palette__list">
            {filtered.length > 0 ? (
              filtered.map((asset) => (
                <div
                  key={asset.id}
                  className="search-palette__item"
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="search-palette__item-thumb">
                    <img src={asset.thumb} alt={asset.title} loading="lazy" />
                  </div>
                  <div className="search-palette__item-info">
                    <div className="search-palette__item-title">{asset.title}</div>
                    <div className="search-palette__item-meta">
                      <span className="search-palette__tag-cat">
                        {categoryLabel(asset.category)}
                      </span>
                      {asset.artist && (
                        <span className="search-palette__tag-artist">@{asset.artist}</span>
                      )}
                      {asset.width && asset.height && (
                        <span className="search-palette__tag-dim">
                          {asset.width}×{asset.height}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-palette__empty">
                <p>未找到与 “{query}” 相关的素材</p>
              </div>
            )}
          </div>
        </div>

        <div className="search-palette__footer">
          <div className="search-palette__hints">
            <span><kbd>↵</kbd> 在图库中搜索</span>
            <span><kbd>ESC</kbd> 关闭</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
