import { ButtonLink } from '../ButtonLink'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { DISCORD_URL } from '../../lib/site'

const discordPoints = ['Updates', 'Announcements', 'Events', 'Community chat']

export function DiscordSection() {
  return (
    <section id="discord" className="relative py-16 sm:py-20">
      <div className="container-shell">
        <Reveal>
          <div className="glass-panel rounded-[2.4rem] border border-sky-300/12 bg-[linear-gradient(180deg,rgba(105,151,255,0.12),rgba(255,255,255,0.04))] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Discord"
                  title={
                    <>
                      Join Discord second.
                      <br />
                      Stay in the loop.
                    </>
                  }
                  description="All updates for The Village S3 live here."
                  className="max-w-2xl"
                />

                <div className="mt-6 flex flex-wrap gap-2">
                  {discordPoints.map((point) => (
                    <span key={point} className="pill-chip">
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <ButtonLink
                href={DISCORD_URL}
                variant="secondary"
                size="lg"
                className="w-full justify-center"
              >
                Join Discord
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
