import { useState } from 'react'
import {
  BellPlus,
  CheckCircle2,
  CircleHelp,
  CircleX,
  Clock3,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import { safetyCopy } from '../../copy/safety'
import type { DoseView, SkipReason } from '../../domain/types'
import { useDoses } from '../../state/doseContext'
import { isFinalStatus } from '../../state/doseReducer'
import { Button } from '../ui/Button'
import { getStatusLabel } from '../ui/statusLabels'
import { DoseActionDialog } from './DoseActionDialog'
import { SafetyNotice } from './SafetyNotice'
import { SkipReasonForm } from './SkipReasonForm'

const actionTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

type ActionPopup = 'snooze' | 'skip' | 'unsure' | null

interface DoseActionsProps {
  dose: DoseView
  variant?: 'dialog' | 'row'
}

export function DoseActions({ dose, variant = 'dialog' }: DoseActionsProps) {
  const { dispatch } = useDoses()
  const [popup, setPopup] = useState<ActionPopup>(null)
  const [popupTrigger, setPopupTrigger] = useState<HTMLButtonElement | null>(
    null,
  )
  const isRow = variant === 'row'

  if (isFinalStatus(dose.status)) {
    if (isRow) {
      return (
        <div className="row-final-state" role="status">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>
            {dose.status === 'confirmed'
              ? `Stok otomatis berkurang 1 unit (${dose.medication.stock} tersisa)`
              : `Status tercatat: ${getStatusLabel(dose.status)}`}
          </span>
        </div>
      )
    }

    return (
      <section className="final-panel" aria-labelledby="final-status-title">
        <h3 id="final-status-title">
          Sudah tercatat: {getStatusLabel(dose.status)}
        </h3>
        <p>
          {dose.actionedAt
            ? `Dicatat pukul ${actionTimeFormatter.format(new Date(dose.actionedAt))}. `
            : ''}
          {safetyCopy.final}
        </p>
        {dose.skipReason && <p>Alasan: {dose.skipReason}</p>}
      </section>
    )
  }

  const openPopup = (
    nextPopup: Exclude<ActionPopup, null>,
    trigger: HTMLButtonElement,
  ) => {
    setPopupTrigger(trigger)
    setPopup(nextPopup)
  }

  const closePopup = () => setPopup(null)

  const skip = (reason: SkipReason, note?: string) => {
    dispatch({ type: 'skip', id: dose.id, reason, note })
    closePopup()
  }

  const snooze = (minutes: number) => {
    dispatch({ type: 'snooze', id: dose.id, minutes })
    closePopup()
  }

  const markUnsure = () => {
    dispatch({ type: 'markUnsure', id: dose.id })
    closePopup()
  }

  return (
    <section
      className={`action-panel${isRow ? ' action-panel-row' : ''}`}
      aria-label={`Tindakan untuk ${dose.medication.name}`}
    >
      {!isRow && (
        <div className="action-heading">
          <h3>Apa yang ingin Anda catat?</h3>
          <p>{safetyCopy.confirmation}</p>
        </div>
      )}

      <div className={isRow ? 'row-action-buttons' : undefined}>
        <Button
          variant="primary"
          full={!isRow}
          onClick={() => dispatch({ type: 'confirm', id: dose.id })}
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          Dikonfirmasi (Sudah Digunakan)
        </Button>

        <Button
          variant={isRow ? 'utility' : 'secondary'}
          full={!isRow}
          aria-haspopup="dialog"
          onClick={(event) => openPopup('snooze', event.currentTarget)}
        >
          <BellPlus size={17} aria-hidden="true" />
          Tunda
        </Button>

        <Button
          aria-haspopup="dialog"
          onClick={(event) => openPopup('skip', event.currentTarget)}
        >
          <CircleX size={17} aria-hidden="true" />
          Lewati
        </Button>

        <Button
          className="button-unsure"
          aria-haspopup="dialog"
          onClick={(event) => openPopup('unsure', event.currentTarget)}
        >
          <CircleHelp size={17} aria-hidden="true" />
          Tidak Yakin
        </Button>
      </div>

      <DoseActionDialog
        open={popup === 'snooze'}
        title="Ingatkan lagi"
        description={`Pilih kapan OBTARA mengingatkan kembali jadwal ${dose.medication.name}. Status dosis belum menjadi final.`}
        icon={<Clock3 size={22} />}
        trigger={popupTrigger}
        onClose={closePopup}
      >
        <div className="snooze-dialog-content">
          <p className="action-dialog-section-label">Pilih waktu pengingat</p>
          <div className="snooze-options">
            {[10, 30, 60].map((minutes) => (
              <button
                type="button"
                className="snooze-option"
                onClick={() => snooze(minutes)}
                key={minutes}
              >
                <strong>{minutes} menit</strong>
                <span>Ingatkan kembali dalam {minutes} menit</span>
              </button>
            ))}
          </div>
          <Button full onClick={closePopup}>
            Batal
          </Button>
        </div>
      </DoseActionDialog>

      <DoseActionDialog
        open={popup === 'skip'}
        title="Lewati dosis"
        description="Catat alasan agar riwayat tetap jelas. Dosis yang dilewati tidak mengurangi stok."
        icon={<CircleX size={22} />}
        trigger={popupTrigger}
        onClose={closePopup}
      >
        <SkipReasonForm onCancel={closePopup} onSubmit={skip} />
      </DoseActionDialog>

      <DoseActionDialog
        open={popup === 'unsure'}
        title="Periksa sebelum tindakan berikutnya"
        description="Gunakan status ini ketika Anda tidak dapat memastikan apakah dosis sudah digunakan."
        icon={<ShieldAlert size={22} />}
        tone="unsure"
        trigger={popupTrigger}
        onClose={closePopup}
      >
        <SafetyNotice onCancel={closePopup} onConfirm={markUnsure} />
      </DoseActionDialog>
    </section>
  )
}
