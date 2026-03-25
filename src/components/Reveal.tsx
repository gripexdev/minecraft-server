import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 28,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
        y: {
          type: 'spring',
          stiffness: 110,
          damping: 18,
          mass: 0.84,
          delay,
        },
      }}
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  )
}
