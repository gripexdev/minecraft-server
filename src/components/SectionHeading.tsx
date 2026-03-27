import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  className?: string
  align?: 'left' | 'center' | 'responsive'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  const alignment =
    align === 'center'
      ? 'text-center mx-auto'
      : align === 'responsive'
        ? 'text-center mx-auto lg:text-left lg:mx-0'
        : 'text-left'

  return (
    <div className={`${alignment} ${className}`.trim()}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2.2rem,7vw,3.6rem)] font-semibold leading-[1.02] text-white lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  )
}
