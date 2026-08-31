import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import LogoMark from './icons/LogoMark.jsx'
import { Search, Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/gallery', label: '素材库' },
  { to: '/license', label: '授权说明' },
]

export default function NavBar({ onOpenSearch }) {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo-section" aria-label="Quantum Original Assets 首页">
          <LogoMark size={34} />
          <div className="logo-text-group">
            <span className="logo-text">Quantum Original</span>
            <span className="logo-sub mono-label">Assets</span>
          </div>
        </Link>

        <nav className="primary-nav" aria-label="主导航">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            aria-label="快速检索素材 (⌘K)"
            title="搜索 (⌘K / /)"
          >
            <Search size={15} />
            <span className="search-trigger-btn__text">检索</span>
            <kbd className="search-trigger-btn__kbd">⌘K</kbd>
          </button>

          <a
            className="site-link"
            href="https://qoriginal.vip"
            target="_blank"
            rel="noreferrer"
            title="前往 Quantum Original 官方主站"
          >
            <span>主站</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-nav-links">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'mobile-nav-link is-active' : 'mobile-nav-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="mobile-nav-search-btn"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenSearch?.()
              }}
            >
              <Search size={16} />
              <span>快速搜索素材 (⌘K)</span>
            </button>
            <a
              href="https://qoriginal.vip"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-link mobile-nav-link--ext"
            >
              <span>前往 Quantum Original 主站</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
