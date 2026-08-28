import { useState } from 'react'
import { downloadAsset } from '../utils/download'

export default function DownloadButton({ asset, variant = 'primary', label = '下载原文件' }) {
  const [state, setState] = useState('idle')

  const handleClick = async (event) => {
    event.stopPropagation()
    if (state === 'busy') return
    setState('busy')
    const result = await downloadAsset(asset)
    setState(result.ok ? 'done' : 'fallback')
    window.setTimeout(() => setState('idle'), 2600)
  }

  const text =
    state === 'busy'
      ? '准备中…'
      : state === 'done'
        ? '已开始下载'
        : state === 'fallback'
          ? '已打开原图'
          : label

  return (
    <button
      type="button"
      className={`btn ${variant === 'primary' ? 'btn--primary' : ''} download-btn`}
      data-state={state}
      disabled={state === 'busy'}
      onClick={handleClick}
    >
      <span className="download-btn__glyph" aria-hidden="true">
        {state === 'busy' ? '◌' : '↓'}
      </span>
      <span>{text}</span>
    </button>
  )
}
