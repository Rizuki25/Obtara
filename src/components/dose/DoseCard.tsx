import { MapPin } from 'lucide-react'
import type { DoseView } from '../../domain/types'
import { MedicationVisual } from '../ui/MedicationVisual'
import { StatusBadge } from '../ui/StatusBadge'
import { DoseActions } from './DoseActions'

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function statusLabel(dose: DoseView) {
  if (dose.status === 'unconfirmed') return 'Belum Dikonfirmasi'
  if (dose.status === 'snoozed') return 'Ditunda +30m'
  if (dose.status === 'due') return 'Jatuh Tempo Sekarang'
  return undefined
}

interface DoseCardProps {
  dose: DoseView
  onOpen: (trigger: HTMLButtonElement) => void
}

export function DoseCard({ dose, onOpen }: DoseCardProps) {
  const { medication } = dose
  const time = timeFormatter.format(new Date(dose.scheduledAt))

  return (
    <article className="dose-card" data-status={dose.status}>
      <button
        type="button"
        className="medication-photo-button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-label={`Buka detail ${medication.name} ${medication.strength}, pukul ${time}`}
      >
        <MedicationVisual medication={medication} />
      </button>

      <div className="dose-card-copy">
        <div className="dose-pill-row">
          <span className="time-pill">{time} WIB</span>
          <span className="profile-pill" data-tint={dose.profileTint}>
            {dose.profileName}
          </span>
          <StatusBadge status={dose.status} label={statusLabel(dose)} />
        </div>
        <button
          type="button"
          className="dose-title-button"
          onClick={(event) => onOpen(event.currentTarget)}
        >
          {medication.name}
        </button>
        <div className="dose-specification">
          <strong>
            {medication.strength} ({medication.amountPerDose})
          </strong>
          <span aria-hidden="true">·</span>
          <span className="instruction-tag">{medication.instructions}</span>
        </div>
        <p className="dose-location">
          <MapPin size={16} aria-hidden="true" />
          {medication.location}
        </p>
      </div>

      <DoseActions dose={dose} variant="row" />
    </article>
  )
}
