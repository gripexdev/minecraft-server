import { Menu, X } from 'lucide-react'
import { ButtonLink } from '../ButtonLink'
import { DISCORD_URL, SERVER_NAME, VOTE_URL } from '../../lib/site'

type NavItem = {
  id: string
  label: string
}

type SiteHeaderProps = {
  navItems: NavItem[]
  activeSection: string
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export function SiteHeader({
  navItems,
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
}: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="container-shell">
        <nav className="glass-panel flex items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-5">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 shadow-[0_0_38px_rgba(130,255,144,0.18)]">
              <span className="font-pixel text-[1.7rem] leading-none text-emerald-100">
                V
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.32em] text-white">
                {SERVER_NAME}
              </p>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-emerald-200/58">
                Premium SMP / S3
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`nav-link px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${
                  activeSection === item.id
                    ? 'nav-link-active'
                    : ''
                }`}
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
              className="button-base button-secondary hidden px-4 py-2.5 text-xs tracking-[0.22em] sm:inline-flex"
            >
              Join Discord
            </a>
            <ButtonLink
              href={VOTE_URL}
              className="shadow-[0_14px_32px_rgba(125,255,135,0.28)] max-[420px]:px-4 max-[420px]:text-[0.68rem]"
            >
              Vote Now
            </ButtonLink>
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="icon-button inline-flex h-11 w-11 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
