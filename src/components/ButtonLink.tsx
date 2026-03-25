import { motion, useReducedMotion } from 'framer-motion'
import type { MouseEventHandler, ReactNode } from 'react'
import { useCanHover } from '../hooks/useCanHover'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ButtonLink({
  href,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
}: ButtonLinkProps) {
  const shouldReduceMotion = useReducedMotion()
  const canHover = useCanHover()
  const variantClass =
    variant === 'primary' ? 'button-primary' : 'button-secondary'
  const sizeClass = size === 'lg' ? 'button-lg' : 'button-md'
  const isExternal = /^(https?:)?\/\//i.test(href)

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onClick={onClick}
      whileHover={
        shouldReduceMotion || !canHover ? undefined : { y: -2, scale: 1.01 }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { type: 'spring', stiffness: 260, damping: 20, mass: 0.78 }
      }
      className={`button-base ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </motion.a>
  )
}
