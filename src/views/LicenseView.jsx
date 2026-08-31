import { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react'
import { useToast } from '../context/ToastContext'

const FAQS = [
  {
    q: '我可以将本站素材作为自己的电脑/手机壁纸或头像吗？',
    a: '完全可以。个人非商业用途的壁纸、社交媒体个人头像、设备锁屏等均属于自由使用范畴。',
  },
  {
    q: '我可以在个人非商业视频中使用这些素材作为背景插图吗？',
    a: '可以，但须在视频简介或片尾清晰注明素材出处与原作者（例如：插画 @苗库里 / 来自 Quantum Original Assets）。',
  },
  {
    q: '我能否对素材进行二次剪辑、滤镜调整或二次创作？',
    a: '未经原作者授权，禁止对素材原图进行修改、重绘、风格迁移合成、AI 训练微调或制作衍生售卖品。',
  },
  {
    q: '如果我需要在商业项目、商业游戏或广告宣传中使用，该如何获取授权？',
    a: '请通过 Quantum Original 官方主站或原作者官方联络渠道进行商务咨询与正式商用授权合作洽谈。',
  },
]

export default function LicenseView() {
  const [openFaq, setOpenFaq] = useState(null)
  const [copiedCredit, setCopiedCredit] = useState(false)
  const { showToast } = useToast()

  const creditText = 'Artwork by 苗库里 / Quantum Original (https://qoriginal.vip)'

  const handleCopyCredit = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(creditText).then(() => {
        setCopiedCredit(true)
        showToast?.('已复制标准署名文本', 'success')
        setTimeout(() => setCopiedCredit(false), 2000)
      })
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <div className="license">
      <div className="page-shell license__inner">
        <div className="gallery-head">
          <h1>授权说明</h1>
          <p>下载或使用本站素材即代表你已阅读并同意遵守以下条款。</p>
        </div>

        {/* Permission Matrix */}
        <div className="license-grid">
          <section className="license-card license-card--allowed">
            <div className="license-card__head">
              <CheckCircle2 size={20} className="license-card__icon license-card__icon--allowed" />
              <h2>你可以（允许用途）</h2>
            </div>
            <ul>
              <li>
                <strong>个人非商业展示：</strong>作为个人电脑、手机、平板的桌面壁纸与锁屏。
              </li>
              <li>
                <strong>学习与交流研究：</strong>用于个人美术学习、像素艺术鉴赏、非营利性技术交流。
              </li>
              <li>
                <strong>原画保存归档：</strong>在遵守本说明的前提下下载并保存在个人设备中。
              </li>
              <li>
                <strong>注明出处的非商业引用：</strong>在个人非营利视频或博客中展示原图（须保留署名）。
              </li>
            </ul>
          </section>

          <section className="license-card license-card--forbidden">
            <div className="license-card__head">
              <XCircle size={20} className="license-card__icon license-card__icon--forbidden" />
              <h2>你不可以（禁止用途）</h2>
            </div>
            <ul>
              <li>
                <strong>图库转售与重新分发：</strong>严禁将素材原文件打包至其他素材库、图库网站转售或重新上载。
              </li>
              <li>
                <strong>商业营利与广告宣传：</strong>严禁用于商业游戏、商品印花、周边售卖、付费视频或商业广告。
              </li>
              <li>
                <strong>二次修改与衍生制作：</strong>严禁修改、裁切合成、生成衍生品或用于生成式 AI 模型训练。
              </li>
              <li>
                <strong>虚假宣称原创：</strong>严禁宣称素材由你本人原创，或使用素材注册商标或专利。
              </li>
            </ul>
          </section>
        </div>

        {/* Third Party Attribution */}
        <section className="license-section">
          <h2>第三方来源素材与标准署名</h2>
          <p>
            部分素材条目在详情中标注了「来源」。此类素材的著作权归原作者所有，使用前请遵循来源页面所附的授权条款；标注「见来源说明」的素材不适用本站默认授权说明。
          </p>
          <div className="license-credit-box">
            <span className="license-credit-label">标准非商业引用署名格式：</span>
            <div className="license-credit-row">
              <code>{creditText}</code>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={handleCopyCredit}
              >
                {copiedCredit ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copiedCredit ? '已复制' : '复制署名'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="license-section">
          <h2>常见问题解答</h2>
          <div className="faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className="faq-chevron" />
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact Banner */}
        <section className="license-banner">
          <div className="license-banner__content">
            <h2>商业授权与合作咨询</h2>
            <p>如需将作品用于商业游戏、周边生产、出版物或商业推广，请通过官方通道联系。</p>
          </div>
          <a
            href="https://qoriginal.vip"
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary"
          >
            <span>访问 Quantum Original 主站</span>
            <ArrowUpRight size={16} />
          </a>
        </section>
      </div>
    </div>
  )
}
