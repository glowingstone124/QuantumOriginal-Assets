import { useState } from 'react'
import { Download, Loader2, CheckCircle2, ExternalLink } from 'lucide-react'
import { downloadAsset } from '../utils/download'
import { useToast } from '../context/ToastContext'

export default function DownloadButton({
  asset,
  variant = 'primary',
  size = 'md',
  label = '下载原图',
  showIcon = true,
  className = '',
}) {
  const [state, setState] = useState('idle')
  const { showToast } = useToast()

  const handleClick = async (event) => {
    event.stopPropagation()
    if (state === 'busy') return
    setState('busy')

    const result = await downloadAsset(asset)

    if (result.ok) {
      setState('done')
      showToast?.(`正在下载「${asset.title}」超清原图`, 'success')
    } else {
      setState('fallback')
      showToast?.(result.message || '已在新标签页打开原图', 'info')
    }

    window.setTimeout(() => setState('idle'), 2600)
  }

  const renderIcon = () => {
    if (!showIcon) return null
    if (state === 'busy') return <Loader2 size={16} className="btn-icon animate-spin" />
    if (state === 'done') return <CheckCircle2 size={16} className="btn-icon text-success" />
    if (state === 'fallback') return <ExternalLink size={16} className="btn-icon text-warning" />
    return <Download size={16} className="btn-icon" />
  }

  const text =
    state === 'busy'
      ? '准备中…'
      : state === 'done'
        ? '已开始下载'
        : state === 'fallback'
          ? '已打开原图'
          : label

  const buttonClasses = [
    'btn',
    variant === 'primary' ? 'btn--primary' : variant === 'ghost' ? 'btn--ghost' : 'btn--secondary',
    `btn--${size}`,
    'download-btn',
    state !== 'idle' ? `download-btn--${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={buttonClasses}
      data-state={state}
      disabled={state === 'busy'}
      onClick={handleClick}
      aria-label={`下载 ${asset.title} 原图`}
    >
      {renderIcon()}
      <span>{text}</span>
    </button>
  )
}
