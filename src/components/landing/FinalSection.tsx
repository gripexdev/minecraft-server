import { ButtonLink } from '../ButtonLink'
import { CopyIpButton } from '../CopyIpButton'
import { Reveal } from '../Reveal'
import { DISCORD_URL, SERVER_IP, VOTE_URL } from '../../lib/site'

export function FinalSection() {
  return (
    <section id="final" className="relative py-16 sm:py-20">
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,24,18,0.96),rgba(8,11,10,0.98))] p-5 shadow-[0_34px_120px_rgba(0,0,0,0.52)] sm:rounded-[2.6rem] sm:p-8 lg:p-10">
            <div className="absolute left-[18%] top-[-10rem] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-[120px]" />
            <div className="absolute right-[-5rem] top-[10%] h-[20rem] w-[20rem] rounded-full bg-sky-400/12 blur-[120px]" />

            <div className="relative z-10 text-center md:text-left">
              <p className="section-label">Play Now</p>
              <h2 className="mt-4 text-[clamp(2.35rem,8vw,4.6rem)] font-semibold leading-[0.94] text-white">
                Vote.
                <br />
                Join Discord.
                <br />
                Copy the IP.
              </h2>

              <div className="mx-auto mt-8 max-w-3xl rounded-[1.8rem] border border-white/10 bg-black/24 p-5 backdrop-blur-2xl sm:p-6 md:mx-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                  Server IP
                </p>
                <p className="mt-3 break-words text-[1.65rem] font-semibold tracking-[0.04em] text-emerald-100 sm:text-[2rem] sm:tracking-[0.08em]">
                  {SERVER_IP}
                </p>
              </div>

              <div className="mx-auto mt-6 grid max-w-md gap-3 md:mx-0 md:max-w-none md:grid-cols-3">
                <ButtonLink href={VOTE_URL} size="lg" className="w-full justify-center">
                  Vote Now
                </ButtonLink>
                <ButtonLink
                  href={DISCORD_URL}
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Join Discord
                </ButtonLink>
                <CopyIpButton className="w-full justify-center" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
