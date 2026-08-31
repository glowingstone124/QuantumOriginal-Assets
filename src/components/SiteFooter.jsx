import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp } from 'lucide-react'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <p className="wordmark footer-wordmark" aria-hidden="true">
          QUANTUM ORIGINAL
        </p>

        <div className="footer-grid">
          <div className="footer-cell">
            <h3 className="footer-cell__title">站点导航</h3>
            <nav className="footer-nav" aria-label="页脚导航">
              <Link to="/">
                <span>首页探索</span>
              </Link>
              <Link to="/gallery">
                <span>素材库</span>
              </Link>
              <Link to="/license">
                <span>授权说明</span>
              </Link>
            </nav>
          </div>

          <div className="footer-cell">
            <h3 className="footer-cell__title">外部生态</h3>
            <nav className="footer-nav" aria-label="外部传送门">
              <a href="https://qoriginal.vip" target="_blank" rel="noreferrer">
                <span>Quantum Original 主站</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://space.bilibili.com/152309938"
                target="_blank"
                rel="noreferrer"
              >
                <span>创作者 @苗库里</span>
                <ArrowUpRight size={14} />
              </a>
            </nav>
          </div>

          <div className="footer-cell">
            <h3 className="footer-cell__title">关于素材库</h3>
            <p className="footer-desc">
              Quantum Original 官方出品的高清原创视觉素材库，支持在线预览与原文件下载。
              素材仅限个人非商业使用。
            </p>
          </div>

          <div className="footer-cell">
            <h3 className="footer-cell__title">版权声明</h3>
            <p className="footer-desc">
              © {currentYear} Quantum Original &amp; Holographic Lab.
              <br />
              All rights reserved.
            </p>
            <div className="footer-back-top-wrap">
              <button
                type="button"
                className="btn btn--secondary btn--sm footer-back-top-btn"
                onClick={scrollToTop}
              >
                <ArrowUp size={14} />
                <span>返回顶部</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
