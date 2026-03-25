import { Check, Copy } from 'lucide-react'
import { useEffect, useEffectEvent, useState } from 'react'
import { SERVER_IP } from '../lib/site'

type CopyIpButtonProps = {
  className?: string
  compact?: boolean
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function CopyIpButton({
  className = '',
  compact = false,
}: CopyIpButtonProps) {
  const [copied, setCopied] = useState(false)

  const clearCopied = useEffectEvent(() => {
    setCopied(false)
  })

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      clearCopied()
    }, 1800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [copied])

  const handleCopy = async () => {
    try {
      await writeClipboard(SERVER_IP)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040705] ${
        copied
          ? 'border-emerald-200/30 bg-emerald-300/16 text-emerald-50'
          : 'border-white/12 bg-white/[0.05] text-white/85 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
      } ${className}`.trim()}
      aria-label="Copy server IP"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? 'Copied' : compact ? 'Copy IP' : 'Copy IP'}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Server IP copied to clipboard.' : ''}
      </span>
    </button>
  )
}
