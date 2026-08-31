import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import GalleryView from './views/GalleryView.jsx'
import HomeView from './views/HomeView.jsx'
import LicenseView from './views/LicenseView.jsx'
import QuickSearchModal from './components/QuickSearchModal.jsx'
import AssetLightbox from './components/AssetLightbox.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { useAssets } from './hooks/useAssets'
import { Home } from 'lucide-react'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function NotFoundView() {
  return (
    <div className="page-shell notfound-view">
      <div className="notfound-card">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">页面不存在</h1>
        <p className="notfound-desc">你所寻找的页面不存在或已迁移。</p>
        <Link className="btn btn--primary btn--lg" to="/">
          <Home size={18} />
          <span>返回素材库首页</span>
        </Link>
      </div>
    </div>
  )
}

function AppContent() {
  const { assets } = useAssets()
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeAsset, setActiveAsset] = useState(null)

  const activeIndex = activeAsset ? assets.findIndex((a) => a.id === activeAsset.id) : -1

  // Global shortcut handler for ⌘K / Ctrl+K / /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <ScrollToTop />
      <NavBar onOpenSearch={() => setSearchOpen(true)} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomeView onOpenSearch={() => setSearchOpen(true)} />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/license" element={<LicenseView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <SiteFooter />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        assets={assets}
        onSelectAsset={(asset) => setActiveAsset(asset)}
      />

      {/* Global Lightbox if opened via Quick Search Modal */}
      {activeAsset && (
        <AssetLightbox
          asset={activeAsset}
          position={activeIndex + 1}
          total={assets.length}
          onClose={() => setActiveAsset(null)}
          onPrev={activeIndex > 0 ? () => setActiveAsset(assets[activeIndex - 1]) : null}
          onNext={
            activeIndex < assets.length - 1 ? () => setActiveAsset(assets[activeIndex + 1]) : null
          }
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
