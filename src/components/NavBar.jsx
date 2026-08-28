import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import LogoMark from './icons/LogoMark.jsx'

const LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/gallery', label: '素材库' },
  { to: '/license', label: '授权说明' },
]

export default function NavBar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo-section">
          <LogoMark size={36} />
          <span className="logo-text-group">
            <span className="logo-text">Quantum Original</span>
            <span className="logo-sub mono-label">Assets</span>
          </span>
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
            className="theme-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
