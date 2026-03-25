import { Activity, Gem, Shield, Users } from 'lucide-react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const whyPoints = [
  {
    icon: Gem,
    title: 'Sharper vanilla+ survival',
    description:
      'Enough quality-of-life to keep the pace crisp without draining the survival identity out of the world.',
  },
  {
    icon: Users,
    title: 'A world shaped by players',
    description:
      'Settlements, rivalries, trading routes, and history that comes from the community instead of scripted filler.',
  },
  {
    icon: Activity,
    title: 'Momentum you can feel',
    description:
      'Fresh-season pressure, active nights, and enough movement that logging in never feels like entering a dead map.',
  },
]

export function WhySection() {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Why This Server"
            title={
              <>
                More than a map.
                <br />
                A world with pressure, pace, and community gravity.
              </>
            }
            description="The Village S3 is designed for players who want Minecraft survival to feel social, sharp, and worth investing in."
          />

          <div className="mt-8 space-y-4">
            {whyPoints.map((point) => {
              const Icon = point.icon

              return (
                <div
                  key={point.title}
                  className="rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/10 text-emerald-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/58">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-5 sm:grid-cols-2">
            <TiltCard className="glass-panel min-h-[20rem] rounded-[2.1rem] bg-[linear-gradient(180deg,rgba(137,255,149,0.13),rgba(255,255,255,0.04))] p-6 sm:col-span-2 sm:p-7">
              <p className="section-label">Editorial Focus</p>
              <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.02] text-white">
                The mood is Minecraft. The presentation feels closer to a game
                launch page than a server list card.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
                Dark atmosphere, stronger contrast, layered lighting, and a
                cleaner survival tone make the world feel premium before the
                player even joins it.
              </p>
            </TiltCard>

            <TiltCard className="glass-panel rounded-[2rem] p-6">
              <p className="section-label">Server Tone</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Friendly without being soft.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/58">
                Welcoming players, enough competition to matter, and room for
                bigger projects than a quick weekend spawn build.
              </p>
            </TiltCard>

            <TiltCard className="glass-panel rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <p className="section-label">Momentum Loop</p>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Vote feeds discovery. Discord feeds retention.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/58">
                That loop is what keeps The Village S3 from feeling empty after
                the first join.
              </p>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
