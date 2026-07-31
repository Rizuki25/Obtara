import { ChevronRight } from 'lucide-react'
import type { DoseView } from '../../domain/types'
import { MedicationVisual } from '../ui/MedicationVisual'
import { StatusBadge } from '../ui/StatusBadge'

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

interface DoseCardProps {
  dose: DoseView
  onOpen: (trigger: HTMLButtonElement) => void
}

export function DoseCard({ dose, onOpen }: DoseCardProps) {
  const { medication } = dose
  return (
    <button
      type="button"
      className="dose-card"
      onClick={(event) => onOpen(event.currentTarget)}
      aria-label={`Buka detail ${medication.name} ${medication.strength}, pukul ${timeFormatter.format(new Date(dose.scheduledAt))}`}
    >
      <MedicationVisual medication={medication} />
      <span className="dose-card-copy">
        <strong>{medication.name}</strong>
        <span className="dose-card-dose">
          {medication.strength} · {medication.amountPerDose}
        </span>
        <span className="dose-card-meta">
          <span>{timeFormatter.format(new Date(dose.scheduledAt))}</span>
          <span>{medication.instructions}</span>
        </span>
      </span>
      <StatusBadge status={dose.status} />
      <ChevronRight className="chevron" size={18} aria-hidden="true" />
    </button>
  )
}
