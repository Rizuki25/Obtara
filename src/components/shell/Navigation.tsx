import { Boxes, CalendarDays, History, Pill, Settings } from 'lucide-react'

const navigation = [
  {
    label: 'Hari Ini',
    shortLabel: 'Hari Ini',
    Icon: CalendarDays,
    path: '/today',
  },
  { label: 'Obat Saya', shortLabel: 'Obat', Icon: Pill },
  { label: 'Stok & Refill', shortLabel: 'Stok', Icon: Boxes },
  { label: 'Riwayat', shortLabel: 'Riwayat', Icon: History },
  { label: 'Pengaturan', shortLabel: 'Pengaturan', Icon: Settings },
]

interface NavigationProps {
  className?: string
  activePath?: string
  onNavigate?: (path: string) => void
}

export function Navigation({
  className = '',
  activePath = '/today',
  onNavigate,
}: NavigationProps) {
  return (
    <nav className={className} aria-label="Navigasi utama">
      {navigation.map(({ label, shortLabel, Icon, path }) => {
        const enabled = Boolean(path)
        const active = path === activePath
        return (
          <button
            type="button"
            className="nav-item"
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            disabled={!enabled}
            title={enabled ? label : `${label} — belum tersedia di prototype`}
            onClick={() => path && onNavigate?.(path)}
            key={label}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            <span className="nav-label-full">{label}</span>
            <span className="nav-label-short">{shortLabel}</span>
          </button>
        )
      })}
    </nav>
  )
}
