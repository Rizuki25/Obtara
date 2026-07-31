import {
  Archive,
  CircleUserRound,
  Clock3,
  HeartHandshake,
  History,
} from 'lucide-react'

const navigation = [
  { label: 'Hari Ini', Icon: Clock3, active: true },
  { label: 'Kabinet', Icon: Archive },
  { label: 'Riwayat', Icon: History },
  { label: 'Care Circle', Icon: HeartHandshake },
  { label: 'Profil', Icon: CircleUserRound },
]

export function Navigation({ className = '' }: { className?: string }) {
  return (
    <nav className={className} aria-label="Navigasi utama">
      {navigation.map(({ label, Icon, active }) => (
        <button
          type="button"
          className="nav-item"
          aria-current={active ? 'page' : undefined}
          disabled={!active}
          title={active ? label : `${label} — belum tersedia di prototype`}
          key={label}
        >
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
