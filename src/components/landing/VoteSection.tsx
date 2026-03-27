import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../ButtonLink'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { VOTE_URL } from '../../lib/site'

const votePoints = ['Support the server', 'Help more players find it', 'Keep Season 3 active']

export function VoteSection() {
  return (
    <section id="vote" className="relative py-16 sm:py-20">
      <div className="container-shell">
        <Reveal>
          <div className="glass-panel rounded-[2rem] border border-emerald-300/14 bg-[linear-gradient(135deg,rgba(118,255,136,0.12),rgba(8,14,10,0.94)_42%,rgba(5,9,9,0.98)_100%)] p-5 sm:rounded-[2.4rem] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Vote"
                  title={
                    <>
                      Vote first.
                      <br />
                      That is the main action.
                    </>
                  }
                  description="Quick, simple, and the fastest way to support The Village S3."
                  className="max-w-2xl"
                  align="responsive"
                />

                <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {votePoints.map((point) => (
                    <span key={point} className="pill-chip">
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-md flex-col gap-3 lg:mx-0 lg:max-w-none">
                <ButtonLink href={VOTE_URL} size="lg" className="w-full justify-center">
                  Vote Now
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                  Do this first
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
