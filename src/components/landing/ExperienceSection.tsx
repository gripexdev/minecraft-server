import {
  Activity,
  Crown,
  Gem,
  Shield,
  Swords,
  Users,
} from 'lucide-react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const experienceCards = [
  {
    icon: Gem,
    title: 'Vanilla+ survival',
    description:
      'The core loop stays familiar, but the pacing is cleaner, the friction is lower, and the world feels easier to commit to long term.',
    tags: ['Clean QoL', 'Survival-first'],
    className: 'lg:col-span-5 lg:row-span-2',
    accent: 'from-emerald-300/18 via-emerald-300/6 to-white/[0.03]',
  },
  {
    icon: Crown,
    title: 'Season progression',
    description:
      'Season 3 gives every new build, trade route, and power shift more weight because the world is still moving upward.',
    tags: ['Fresh pressure', 'Season identity'],
    className: 'lg:col-span-3',
    accent: 'from-sky-400/16 via-sky-400/5 to-white/[0.03]',
  },
  {
    icon: Users,
    title: 'Community-driven world',
    description:
      'Players create the stories here. Alliances, towns, flex builds, and rivalries are the actual content.',
    tags: ['Shared builds', 'Player history'],
    className: 'lg:col-span-4',
    accent: 'from-white/14 via-white/[0.04] to-white/[0.02]',
  },
  {
    icon: Swords,
    title: 'Events with stakes',
    description:
      'Event nights and resets are there to create momentum, not distract from the survival world.',
    tags: ['Competition', 'Reset beats'],
    className: 'lg:col-span-4',
    accent: 'from-emerald-300/14 via-lime-200/6 to-white/[0.03]',
  },
  {
    icon: Activity,
    title: 'Consistent player activity',
    description:
      'A strong vote and Discord loop keeps new players flowing in and helps the world feel busy faster.',
    tags: ['Player flow', 'More life nightly'],
    className: 'lg:col-span-3',
    accent: 'from-sky-400/16 via-white/[0.03] to-white/[0.02]',
  },
  {
    icon: Shield,
    title: 'Culture that keeps people around',
    description:
      'Friendly enough to be welcoming, sharp enough to reward grind, planning, and the people who stay invested.',
    tags: ['Welcoming', 'Still competitive'],
    className: 'lg:col-span-5',
    accent: 'from-white/16 via-emerald-300/5 to-white/[0.03]',
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Server Experience"
            title={
              <>
                Reasons to join that feel
                <br />
                like a real world, not filler copy.
              </>
            }
            description="The highlights below are designed to answer the real question players ask: why would I commit to this server instead of the next one?"
            className="max-w-3xl"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {experienceCards.map((card, index) => {
            const Icon = card.icon

            return (
              <Reveal
                key={card.title}
                delay={0.04 * index}
                className={card.className}
              >
                <TiltCard
                  className={`glass-panel h-full rounded-[2rem] bg-gradient-to-br ${card.accent} p-6 sm:p-7`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/18 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-8 text-white/60">
                    {card.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/14 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
