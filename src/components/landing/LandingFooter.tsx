type NavItem = {
  id: string
  label: string
}

type LandingFooterProps = {
  navItems: NavItem[]
}

export function LandingFooter({ navItems }: LandingFooterProps) {
  return (
    <footer className="relative pb-28 pt-4 lg:pb-12">
      <div className="container-shell">
        <div className="section-divider" />
        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/38">
              The Village S3
            </p>
            <p className="mt-2 text-sm text-white/52">
              Vote first. Discord second. Copy the IP and play.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/52">
            {navItems.slice(1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-link"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
