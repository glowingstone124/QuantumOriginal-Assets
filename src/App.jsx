import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import GalleryView from './views/GalleryView.jsx'
import HomeView from './views/HomeView.jsx'
import LicenseView from './views/LicenseView.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function NotFoundView() {
  return (
    <div className="page-shell notfound">
      <span className="mono-label">404</span>
      <h1>页面不存在</h1>
      <Link className="btn btn--primary" to="/">
        返回首页
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/license" element={<LicenseView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
