import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { DoseView } from '../../domain/types'
import { MedicationVisual } from '../ui/MedicationVisual'
import { StatusBadge } from '../ui/StatusBadge'
import { DoseActions } from './DoseActions'

const fullDateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

interface DoseDetailDialogProps {
  dose: DoseView | null
  onClose: () => void
}

export function DoseDetailDialog({ dose, onClose }: DoseDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dose && !dialog.open) dialog.showModal()
    if (!dose && dialog.open) dialog.close()
  }, [dose])

  if (!dose) return null

  const { medication } = dose

  return (
    <dialog
      className="dialog"
      ref={dialogRef}
      aria-labelledby="dose-detail-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="dialog-content">
        <header className="dialog-header">
          <div>
            <strong>Detail jadwal</strong>
            <p className="dialog-kicker">Periksa sebelum mencatat</p>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Tutup detail dosis"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className="dialog-body">
          <div className="detail-hero">
            <MedicationVisual medication={medication} />
            <div className="detail-title">
              <StatusBadge status={dose.status} />
              <h2 id="dose-detail-title">{medication.name}</h2>
              <p>{medication.strength} · {medication.amountPerDose}</p>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span>Waktu</span>
              <strong>{fullDateFormatter.format(new Date(dose.scheduledAt))}</strong>
            </div>
            <div className="detail-item">
              <span>Petunjuk</span>
              <strong>{medication.instructions}</strong>
            </div>
            <div className="detail-item">
              <span>Lokasi fisik</span>
              <strong>{medication.location}</strong>
            </div>
            <div className="detail-item">
              <span>Stok simulasi</span>
              <strong>{medication.stock} {medication.form.toLowerCase()}</strong>
            </div>
          </div>

          <DoseActions dose={dose} />
        </div>
      </div>
    </dialog>
  )
}
