import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`${alignment} ${className}`.trim()}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.02] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">
        {description}
      </p>
    </div>
  )
}
