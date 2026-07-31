import {
  Archive,
  Boxes,
  CalendarDays,
  FileText,
  HeartHandshake,
  Settings,
  ShieldAlert,
} from 'lucide-react'

const navigation = [
  { label: 'Hari Ini', shortLabel: 'Hari Ini', Icon: CalendarDays, active: true },
  { label: 'Kabinet Obat', shortLabel: 'Kabinet', Icon: Archive },
  { label: 'Stok & Refill', shortLabel: 'Stok', Icon: Boxes },
  { label: 'Caregiver', shortLabel: 'Caregiver', Icon: ShieldAlert, count: 1 },
  { label: 'Riwayat & Laporan', shortLabel: 'Riwayat', Icon: FileText },
  { label: 'Care Circle', shortLabel: 'Care Circle', Icon: HeartHandshake },
  { label: 'Pengaturan', shortLabel: 'Pengaturan', Icon: Settings },
]

export function Navigation({ className = '' }: { className?: string }) {
  return (
    <nav className={className} aria-label="Navigasi utama">
      {navigation.map(({ label, shortLabel, Icon, active, count }) => (
        <button
          type="button"
          className="nav-item"
          aria-current={active ? 'page' : undefined}
          disabled={!active}
          title={active ? label : `${label} — belum tersedia di prototype`}
          key={label}
        >
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          <span className="nav-label-full">{label}</span>
          <span className="nav-label-short">{shortLabel}</span>
          {count && <span className="nav-count" aria-label={`${count} alert`}>{count}</span>}
        </button>
      ))}
    </nav>
  )
}
