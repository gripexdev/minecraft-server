import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../ButtonLink'
import { CopyIpButton } from '../CopyIpButton'
import { SERVER_IP, VOTE_URL, DISCORD_URL } from '../../lib/site'

type NavItem = {
  id: string
  label: string
}

type MobileMenuProps = {
  navItems: NavItem[]
  activeSection: string
  open: boolean
  onClose: () => void
}

export function MobileMenu({
  navItems,
  activeSection,
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-24 top-20 z-[60] lg:hidden sm:inset-x-4 sm:top-24"
        >
          <div className="glass-panel flex max-h-full flex-col overflow-hidden rounded-[2rem] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:p-5">
            <div className="space-y-2 overflow-y-auto pr-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClose}
                  className={`menu-link px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] ${
                    activeSection === item.id
                      ? 'menu-link-active'
                      : ''
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={VOTE_URL}
                size="lg"
                className="justify-center"
                onClick={onClose}
              >
                Vote Now
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={DISCORD_URL}
                variant="secondary"
                size="lg"
                className="justify-center"
                onClick={onClose}
              >
                Join Discord
              </ButtonLink>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
              <p className="section-label">Server IP</p>
              <p className="mt-2 break-all text-[1.02rem] font-semibold tracking-[0.06em] text-white sm:text-lg sm:tracking-[0.1em]">
                {SERVER_IP}
              </p>
              <CopyIpButton className="mt-4 w-full justify-center" compact />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
