import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Bell,
  Crown,
  Gem,
  MessageSquare,
  Server,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { ButtonLink } from './components/ButtonLink'
import { CopyIpButton } from './components/CopyIpButton'
import { Reveal } from './components/Reveal'
import { SceneHero } from './components/SceneHero'
import { TiltCard } from './components/TiltCard'
import { DISCORD_URL, SERVER_IP, SERVER_NAME, VOTE_URL } from './lib/site'

const navItems = [
  { label: 'Why Join', href: '#features' },
  { label: 'Vote', href: '#vote' },
  { label: 'Discord', href: '#discord' },
]

const heroHighlights = [
  'Community-driven SMP',
  'Vanilla+ feel',
  'Seasonal momentum',
]

const featureCards = [
  {
    icon: Users,
    title: 'Community-led SMP',
    description:
      'Trade routes, rivalries, shared builds, and a world that still feels alive when you log back in.',
  },
  {
    icon: Sparkles,
    title: 'Vanilla+ without clutter',
    description:
      'Clean quality-of-life energy that sharpens survival instead of burying it in gimmicks.',
  },
  {
    icon: Crown,
    title: 'Season 3 momentum',
    description:
      'Fresh-world pressure, evolving landmarks, and enough movement to make tonight worth joining.',
  },
  {
    icon: Trophy,
    title: 'Events with stakes',
    description:
      'Competitions, resets, and server moments that feel like part of the season instead of filler.',
  },
  {
    icon: Shield,
    title: 'Friendly, but still sharp',
    description:
      'Welcoming players, real grind, real competition, and plenty of room for long-term plans.',
  },
]

const voteReasons = [
  {
    icon: Zap,
    title: 'Push the server higher',
    description:
      'Voting gives The Village S3 more visibility while new players are actively searching for a world to join.',
  },
  {
    icon: Gem,
    title: 'Fill the world faster',
    description:
      'More visibility means more trade, more alliances, and a busier SMP every night of the week.',
  },
  {
    icon: Swords,
    title: 'Keep the momentum up',
    description:
      'A quick click helps events, rivalries, and community progression feel active instead of quiet.',
  },
]

const discordReasons = [
  {
    icon: Bell,
    title: 'Announcements that matter',
    description:
      'Stay ahead of resets, event drops, staff updates, and world-changing decisions before they land in-game.',
  },
  {
    icon: MessageSquare,
    title: 'The social hub',
    description:
      'Recruit players, share builds, find your lane, and stay part of the season when you are offline.',
  },
  {
    icon: Activity,
    title: 'Real-time server pulse',
    description:
      'See what is happening, what is planned next, and where the community energy is moving.',
  },
]

const pulseRows = [
  { label: 'Season', value: 'S3 live now' },
  { label: 'Mode', value: 'Vanilla+ SMP' },
  { label: 'Priority', value: 'Vote first' },
  { label: 'Social', value: 'Discord-driven' },
]

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [audioMuted, setAudioMuted] = useState(true)

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute left-[-14rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-emerald-400/18 blur-[140px]" />
        <div className="absolute right-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-sky-500/16 blur-[150px]" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-[180px]" />
        <div className="bg-grid-mask absolute inset-0 opacity-60" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="container-shell">
          <nav className="glass-panel flex items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-5">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 shadow-[0_0_32px_rgba(120,255,141,0.16)]">
                <span className="font-pixel text-2xl leading-none text-emerald-200">
                  V
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.32em] text-white">
                  {SERVER_NAME}
                </p>
                <p className="font-pixel text-lg leading-none text-emerald-200/80">
                  SMP / Season 3
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-[0.22em] text-white/58 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:inline-flex"
              >
                Join Discord
              </a>
              <ButtonLink
                href={VOTE_URL}
                className="px-4 py-2.5 text-xs shadow-[0_12px_28px_rgba(125,255,135,0.26)]"
              >
                Vote Now
              </ButtonLink>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section
          id="top"
          className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-screen"
        >
          <SceneHero className="absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(2,6,5,0.15),rgba(3,7,6,0.78)_62%,rgba(3,5,4,0.98)_100%)]" />

          <div className="container-shell relative z-10 grid gap-12 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-center">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/18 bg-black/25 px-4 py-2 shadow-[0_0_32px_rgba(131,255,154,0.1)]">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(131,255,154,0.95)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-100/90">
                  Season 3 is live
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-[5.75rem]">
                The Village{' '}
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                  S3
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                A cinematic SMP world with sharper vanilla+ survival, stronger
                community momentum, and enough activity to make every login feel
                worth it.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {heroHighlights.map((highlight) => (
                  <span key={highlight} className="pill-chip">
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={VOTE_URL}>
                  Vote Now
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={DISCORD_URL} variant="secondary">
                  Join Discord
                </ButtonLink>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/56">
                Voting is the first move. It puts the server in front of more
                players and helps the world feel busier, faster.
              </p>

              <div className="mt-8 max-w-2xl glass-panel rounded-[2rem] p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="section-label">Server IP</p>
                    <p className="mt-2 text-xl font-semibold tracking-[0.12em] text-white sm:text-2xl">
                      {SERVER_IP}
                    </p>
                    <p className="mt-2 text-sm text-white/52">
                      Copy it once. Drop in whenever the world calls.
                    </p>
                  </div>
                  <CopyIpButton className="sm:min-w-[10rem]" />
                </div>
              </div>
            </Reveal>

            <Reveal className="w-full lg:justify-self-end" delay={0.14}>
              <div className="space-y-4">
                <TiltCard className="glass-panel rounded-[2rem] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="section-label">Server Pulse</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">
                        Built to feel alive.
                      </h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                      <Server className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {pulseRows.map((row) => (
                      <div
                        key={row.label}
                        className="rounded-2xl border border-white/8 bg-black/20 p-4"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/38">
                          {row.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm text-white/55">
                      <span>Visibility push</span>
                      <span>Vote-driven</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/6">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 shadow-[0_0_20px_rgba(128,255,133,0.45)]" />
                    </div>
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.28em] text-white/35">
                    Placeholder UI ready for live player count, uptime, and TPS
                    data.
                  </p>
                </TiltCard>

                <TiltCard className="glass-panel rounded-[2rem] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="section-label">Ambient Control</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {audioMuted ? 'Muted by default' : 'Atmosphere enabled'}
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                      onClick={() => setAudioMuted((current) => !current)}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white transition hover:border-emerald-300/25 hover:bg-emerald-300/10 hover:text-emerald-100"
                      aria-pressed={!audioMuted}
                      aria-label="Toggle ambient audio placeholder"
                    >
                      {audioMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Optional soundtrack control is wired in as premium UI only,
                    so the page stays silent on first visit and ready for future
                    audio layers.
                  </p>
                </TiltCard>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="features" className="relative py-20 sm:py-28">
          <div className="container-shell">
            <Reveal className="max-w-2xl">
              <p className="section-label">Why Join</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Premium survival energy, without the noise.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/62">
                The Village S3 is built to feel polished, active, and worth
                committing to. Short copy. Strong reasons. No filler.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <Reveal
                    key={feature.title}
                    delay={0.06 * index}
                    className={
                      index === 0 || index === 3 ? 'lg:col-span-2' : ''
                    }
                  >
                    <TiltCard className="glass-panel h-full rounded-[2rem] p-6 sm:p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-base leading-8 text-white/58">
                        {feature.description}
                      </p>
                    </TiltCard>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="vote" className="relative py-20 sm:py-28">
          <div className="container-shell">
            <Reveal>
              <div className="glass-panel relative overflow-hidden rounded-[2.25rem] border border-emerald-300/16 bg-[linear-gradient(135deg,rgba(119,255,133,0.08),rgba(4,8,7,0.88)_42%,rgba(9,14,16,0.96)_100%)] p-6 sm:p-8 lg:p-12">
                <div
                  aria-hidden="true"
                  className="absolute right-[-8rem] top-[-8rem] h-[18rem] w-[18rem] rounded-full bg-emerald-300/18 blur-[120px]"
                />

                <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-start">
                  <div>
                    <p className="section-label">Vote First</p>
                    <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
                      Quick click. Real impact on the world.
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-white/64">
                      Voting is the fastest way to help The Village S3 stay
                      visible, keep the player flow strong, and make the server
                      feel busier every night.
                    </p>

                    <div className="mt-8 grid gap-4">
                      {voteReasons.map((reason) => {
                        const Icon = reason.icon

                        return (
                          <div
                            key={reason.title}
                            className="rounded-[1.5rem] border border-white/8 bg-black/18 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/10 text-emerald-200">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">
                                  {reason.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-white/56">
                                  {reason.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <TiltCard className="glass-panel rounded-[2rem] bg-black/25 p-6 sm:p-7">
                    <p className="section-label">Priority Action</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      Put The Village S3 in front of more players today.
                    </h3>
                    <p className="mt-4 text-base leading-8 text-white/58">
                      Less friction. Better visibility. Stronger momentum for
                      the season and everyone building inside it.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                          What happens next
                        </p>
                        <p className="mt-2 text-base text-white/72">
                          Vote, boost discovery, and help the world feel more
                          active tonight.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/8 p-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
                          Best next step
                        </p>
                        <p className="mt-2 text-base text-white/78">
                          Hit the vote button now, then join the Discord to stay
                          connected after the click.
                        </p>
                      </div>
                    </div>

                    <ButtonLink href={VOTE_URL} className="mt-7 w-full justify-center">
                      Vote Now
                      <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  </TiltCard>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="discord" className="relative py-20 sm:py-28">
          <div className="container-shell grid gap-10 lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1fr)] lg:items-center">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {discordReasons.map((reason, index) => {
                  const Icon = reason.icon
                  const wideCard = index === 1

                  return (
                    <TiltCard
                      key={reason.title}
                      className={`glass-panel rounded-[2rem] p-6 ${
                        wideCard ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/18 bg-sky-400/10 text-sky-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-white">
                        {reason.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/56">
                        {reason.description}
                      </p>
                    </TiltCard>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="section-label">Discord Community</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
                The social hub behind the server.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">
                Join for updates, event calls, build flexes, server decisions,
                and the day-to-day community energy that keeps a world like this
                alive.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  'Announcements',
                  'Event pings',
                  'Build showcases',
                  'Community chat',
                ].map((tag) => (
                  <span key={tag} className="pill-chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={DISCORD_URL} variant="secondary">
                  Join Discord
                </ButtonLink>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/72 transition hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                >
                  Back to top
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative pb-28 pt-6 lg:pb-10">
        <div className="container-shell">
          <Reveal>
            <div className="glass-panel flex flex-col gap-6 rounded-[2.25rem] px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="section-label">Final CTA</p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Join the world while Season 3 still has heat.
                </h2>
                <p className="mt-3 text-base leading-8 text-white/58">
                  Vote first. Join the Discord second. Copy the IP and get into
                  the world.
                </p>
                <p className="mt-4 text-lg font-semibold tracking-[0.12em] text-emerald-100">
                  {SERVER_IP}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
                <CopyIpButton compact className="sm:min-w-[10.5rem]" />
                <ButtonLink href={VOTE_URL}>
                  Vote Now
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={DISCORD_URL} variant="secondary">
                  Join Discord
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/12 bg-[rgba(6,10,8,0.88)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <ButtonLink href={VOTE_URL} className="min-w-0 flex-1 justify-center px-5 py-3">
            Vote Now
          </ButtonLink>
          <CopyIpButton compact className="shrink-0 px-4 py-3" />
        </div>
      </div>
    </div>
  )
}

export default App
