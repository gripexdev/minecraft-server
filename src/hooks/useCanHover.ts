import { useEffect, useState } from 'react'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

export function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(HOVER_QUERY)
    const update = () => setCanHover(mediaQuery.matches)

    update()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update)

      return () => {
        mediaQuery.removeEventListener('change', update)
      }
    }

    mediaQuery.addListener(update)

    return () => {
      mediaQuery.removeListener(update)
    }
  }, [])

  return canHover
}
