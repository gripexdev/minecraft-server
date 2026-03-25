import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export function ButtonLink({
  href,
  children,
  className = '',
  variant = 'primary',
}: ButtonLinkProps) {
  const shouldReduceMotion = useReducedMotion()
  const variantClass =
    variant === 'primary' ? 'button-primary' : 'button-secondary'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={`${variantClass} ${className}`.trim()}
    >
      {children}
    </motion.a>
  )
}
