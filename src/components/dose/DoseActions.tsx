import { useState } from 'react'
import {
  BellPlus,
  CheckCircle2,
  CircleHelp,
  CircleX,
  ShieldCheck,
} from 'lucide-react'
import { safetyCopy } from '../../copy/safety'
import type { DoseView, SkipReason } from '../../domain/types'
import { useDoses } from '../../state/doseContext'
import { isFinalStatus } from '../../state/doseReducer'
import { Button } from '../ui/Button'
import { getStatusLabel } from '../ui/statusLabels'
import { SafetyNotice } from './SafetyNotice'
import { SkipReasonForm } from './SkipReasonForm'

const actionTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

interface DoseActionsProps {
  dose: DoseView
  variant?: 'dialog' | 'row'
}

export function DoseActions({ dose, variant = 'dialog' }: DoseActionsProps) {
  const { dispatch } = useDoses()
  const [panel, setPanel] = useState<'none' | 'snooze' | 'skip' | 'unsure'>('none')
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
        <h3 id="final-status-title">Sudah tercatat: {getStatusLabel(dose.status)}</h3>
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

  const skip = (reason: SkipReason, note?: string) => {
    dispatch({ type: 'skip', id: dose.id, reason, note })
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
          Dikonfirmasi (Sudah Minum)
        </Button>

        <Button
          variant={isRow ? 'utility' : 'secondary'}
          full={!isRow}
          aria-expanded={panel === 'snooze'}
          onClick={() => setPanel(panel === 'snooze' ? 'none' : 'snooze')}
        >
          <BellPlus size={17} aria-hidden="true" />
          Tunda
        </Button>

        <Button
          aria-expanded={panel === 'skip'}
          onClick={() => setPanel(panel === 'skip' ? 'none' : 'skip')}
        >
          <CircleX size={17} aria-hidden="true" />
          Lewati
        </Button>

        <Button
          className="button-unsure"
          aria-expanded={panel === 'unsure'}
          onClick={() => setPanel(panel === 'unsure' ? 'none' : 'unsure')}
        >
          <CircleHelp size={17} aria-hidden="true" />
          Tidak Yakin
        </Button>
      </div>

      {panel === 'snooze' && (
        <section className="inline-panel row-action-expansion" aria-label="Pilihan waktu pengingat">
          <h4>Ingatkan dalam</h4>
          <div className="snooze-options">
            {[10, 30, 60].map((minutes) => (
              <Button
                key={minutes}
                onClick={() => {
                  dispatch({ type: 'snooze', id: dose.id, minutes })
                  setPanel('none')
                }}
              >
                {minutes} menit
              </Button>
            ))}
          </div>
        </section>
      )}

      {panel === 'skip' && (
        <div className="row-action-expansion">
          <SkipReasonForm onCancel={() => setPanel('none')} onSubmit={skip} />
        </div>
      )}

      {panel === 'unsure' && (
        <div className="row-action-expansion">
          <SafetyNotice
            onCancel={() => setPanel('none')}
            onConfirm={() => dispatch({ type: 'markUnsure', id: dose.id })}
          />
        </div>
      )}
    </section>
  )
}
