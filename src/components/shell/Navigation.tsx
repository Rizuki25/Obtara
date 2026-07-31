import { Boxes, CalendarDays, History, Pill, Settings } from 'lucide-react'

const navigation = [
  {
    label: 'Hari Ini',
    shortLabel: 'Hari Ini',
    Icon: CalendarDays,
    active: true,
  },
  { label: 'Obat Saya', shortLabel: 'Obat', Icon: Pill },
  { label: 'Stok & Refill', shortLabel: 'Stok', Icon: Boxes },
  { label: 'Riwayat', shortLabel: 'Riwayat', Icon: History },
  { label: 'Pengaturan', shortLabel: 'Pengaturan', Icon: Settings },
]

export function Navigation({ className = '' }: { className?: string }) {
  return (
    <nav className={className} aria-label="Navigasi utama">
      {navigation.map(({ label, shortLabel, Icon, active }) => (
        <button
          type="button"
          className="nav-item"
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          disabled={!active}
          title={active ? label : `${label} — belum tersedia di prototype`}
          key={label}
        >
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          <span className="nav-label-full">{label}</span>
          <span className="nav-label-short">{shortLabel}</span>
        </button>
      ))}
    </nav>
  )
}
