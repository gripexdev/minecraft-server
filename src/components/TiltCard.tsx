import { useReducedMotion } from 'framer-motion'
import type { HTMLAttributes, PointerEvent, ReactNode } from 'react'
import { useCanHover } from '../hooks/useCanHover'

type TiltCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function TiltCard({
  children,
  className = '',
  onPointerLeave,
  onPointerMove,
  ...props
}: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const canHover = useCanHover()

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)

    if (shouldReduceMotion || !canHover) {
      return
    }

    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const pointerX = (event.clientX - rect.left) / rect.width
    const pointerY = (event.clientY - rect.top) / rect.height
    const rotateX = (0.5 - pointerY) * 10
    const rotateY = (pointerX - 0.5) * 12

    element.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`)
    element.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`)
    element.style.setProperty('--pointer-x', `${(pointerX * 100).toFixed(2)}%`)
    element.style.setProperty('--pointer-y', `${(pointerY * 100).toFixed(2)}%`)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event)

    const element = event.currentTarget
    element.style.setProperty('--rotate-x', '0deg')
    element.style.setProperty('--rotate-y', '0deg')
    element.style.setProperty('--pointer-x', '50%')
    element.style.setProperty('--pointer-y', '50%')
  }

  return (
    <div
      className={`tilt-panel relative overflow-hidden ${className}`.trim()}
      onPointerMove={canHover ? handlePointerMove : undefined}
      onPointerLeave={canHover ? handlePointerLeave : undefined}
      {...props}
    >
      <div className="tilt-shine" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
