import { motion, useReducedMotion, useScroll } from 'framer-motion'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ButtonLink } from './components/ButtonLink'
import { CopyIpButton } from './components/CopyIpButton'
import { DiscordSection } from './components/landing/DiscordSection'
import { FinalSection } from './components/landing/FinalSection'
import { HeroSection } from './components/landing/HeroSection'
import { LandingFooter } from './components/landing/LandingFooter'
import { MobileMenu } from './components/landing/MobileMenu'
import { SiteHeader } from './components/landing/SiteHeader'
import { VoteSection } from './components/landing/VoteSection'
import { useCanHover } from './hooks/useCanHover'
import { VOTE_URL } from './lib/site'

const navItems = [
  { id: 'top', label: 'Home' },
  { id: 'vote', label: 'Vote' },
  { id: 'discord', label: 'Discord' },
  { id: 'final', label: 'Play' },
]

const ambientOrbs = [
  { left: '6%', top: '18%', size: 7, delay: '0s', duration: '18s' },
  { left: '14%', top: '62%', size: 5, delay: '1.4s', duration: '14s' },
  { left: '28%', top: '12%', size: 4, delay: '2.4s', duration: '16s' },
  { left: '42%', top: '76%', size: 6, delay: '0.8s', duration: '19s' },
  { left: '58%', top: '22%', size: 7, delay: '1.8s', duration: '17s' },
  { left: '71%', top: '54%', size: 4, delay: '2.1s', duration: '15s' },
  { left: '84%', top: '18%', size: 6, delay: '1.2s', duration: '18s' },
  { left: '90%', top: '70%', size: 5, delay: '2.8s', duration: '14s' },
]

function App() {
  const shouldReduceMotion = useReducedMotion()
  const canHover = useCanHover()
  const { scrollYProgress } = useScroll()
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('top')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0.2, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (Boolean(shouldReduceMotion) || !canHover || !rootRef.current) {
      return
    }

    const rect = rootRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    rootRef.current.style.setProperty('--pointer-x', `${x.toFixed(2)}%`)
    rootRef.current.style.setProperty('--pointer-y', `${y.toFixed(2)}%`)
  }

  const handlePointerLeave = () => {
    if (!rootRef.current) {
      return
    }

    rootRef.current.style.setProperty('--pointer-x', '72%')
    rootRef.current.style.setProperty('--pointer-y', '14%')
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={canHover ? handlePointerMove : undefined}
      onPointerLeave={canHover ? handlePointerLeave : undefined}
      className="app-shell relative isolate min-h-screen overflow-hidden"
      style={
        {
          '--pointer-x': '72%',
          '--pointer-y': '14%',
        } as CSSProperties
      }
    >
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-emerald-300 via-lime-200 to-sky-300"
        style={{ scaleX: scrollYProgress }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
        <div className="mouse-light absolute inset-0" />
        <div className="absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-emerald-400/16 blur-[180px]" />
        <div className="absolute right-[-10rem] top-[10rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/14 blur-[170px]" />
        <div className="absolute bottom-[-16rem] left-1/2 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-[220px]" />
        <div className="bg-grid-mask absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0" />
        {ambientOrbs.map((orb, index) => (
          <span
            key={`${orb.left}-${orb.top}-${index}`}
            className="ambient-orb"
            style={{
              left: orb.left,
              top: orb.top,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              animationDelay: orb.delay,
              animationDuration: orb.duration,
            }}
          />
        ))}
      </div>

      <SiteHeader
        navItems={navItems}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((current) => !current)}
      />

      <MobileMenu
        navItems={navItems}
        activeSection={activeSection}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main id="main-content">
        <HeroSection />

        <div className="container-shell">
          <div className="section-divider" />
        </div>
        <VoteSection />

        <div className="container-shell">
          <div className="section-divider" />
        </div>
        <DiscordSection />

        <div className="container-shell">
          <div className="section-divider" />
        </div>
        <FinalSection />
      </main>

      <LandingFooter navItems={navItems} />

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/12 bg-[rgba(6,10,8,0.9)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
          <ButtonLink href={VOTE_URL} className="min-w-0 flex-1 justify-center" size="lg">
            Vote Now
          </ButtonLink>
          <CopyIpButton compact className="shrink-0 px-4 py-4" />
        </div>
      </div>
    </div>
  )
}

export default App
