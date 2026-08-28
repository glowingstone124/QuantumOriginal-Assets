import { Link } from 'react-router-dom'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <p className="wordmark footer-wordmark" aria-hidden="true">
          QUANTUM ORIGINAL
        </p>
        <div className="footer-grid">
          <div className="footer-cell">
            <span className="footer-cell__label mono-label">站点导航</span>
            <nav className="footer-nav" aria-label="页脚导航">
              <Link to="/gallery">
                <span>素材库</span>
              </Link>
              <Link to="/license">
                <span>授权说明</span>
              </Link>
            </nav>
          </div>
          <div className="footer-cell">
            <span className="footer-cell__label mono-label">关于</span>
            <p className="footer-desc">
              Quantum Original 出品的高清原创视觉素材库，支持在线预览与原文件下载，
              默认以 CC0 1.0 授权。
            </p>
          </div>
          <div className="footer-cell">
            <span className="footer-cell__label mono-label">状态</span>
            <p className="footer-desc">
              Copyright {currentYear} Quantum Original &amp; Holographic Lab.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
