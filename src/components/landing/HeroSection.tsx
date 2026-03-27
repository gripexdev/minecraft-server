import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../ButtonLink'
import { CopyIpButton } from '../CopyIpButton'
import { Reveal } from '../Reveal'
import { SceneHero } from '../SceneHero'
import { DISCORD_URL, SERVER_IP, VOTE_URL } from '../../lib/site'

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="container-shell relative z-10 grid gap-10 md:gap-12 xl:grid-cols-[minmax(0,0.86fr)_minmax(28rem,0.94fr)] xl:items-center">
        <Reveal className="mx-auto max-w-[40rem] xl:mx-0">
          <span className="pill-chip mx-auto border-emerald-300/16 bg-emerald-300/10 text-emerald-100/88 xl:mx-0">
            Season 3 live
          </span>

          <h1 className="mt-7 text-center text-[clamp(3.15rem,13vw,6rem)] font-semibold leading-[0.92] text-white xl:text-left">
            <span className="block text-[0.72rem] uppercase tracking-[0.34em] text-white/40 sm:text-base sm:tracking-[0.46em]">
              The Village S3
            </span>
            <span className="mt-3 block">
              Vote first.
              <br />
              Join fast.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-center text-base leading-8 text-white/66 sm:text-lg xl:mx-0 xl:text-left">
            Vote to support the server, join Discord for updates, copy the IP,
            and get in.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row xl:mx-0">
            <ButtonLink href={VOTE_URL} size="lg" className="w-full justify-center sm:w-auto sm:justify-start">
              Vote Now
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={DISCORD_URL}
              variant="secondary"
              size="lg"
              className="w-full justify-center sm:w-auto sm:justify-start"
            >
              Join Discord
            </ButtonLink>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-6 xl:mx-0">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 text-center sm:text-left">
                <p className="section-label">Server IP</p>
                <p className="mt-3 break-words text-[1.45rem] font-semibold tracking-[0.04em] text-white sm:text-[1.7rem] sm:tracking-[0.08em]">
                  {SERVER_IP}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/52">
                  Copy it and play.
                </p>
              </div>
              <CopyIpButton className="w-full justify-center sm:w-auto sm:min-w-[11rem]" />
            </div>
          </div>
        </Reveal>

        <Reveal className="w-full xl:justify-self-end" delay={0.08}>
          <div className="mx-auto w-full max-w-[34rem] sm:max-w-[42rem] xl:ml-auto">
            <div className="hero-stage relative min-h-[25rem] w-full overflow-hidden rounded-[2rem] sm:min-h-[32rem] sm:rounded-[2.6rem] xl:min-h-[40rem] xl:aspect-[0.92]">
              <SceneHero className="absolute inset-0" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
