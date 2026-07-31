import { useState } from 'react'
import { BellPlus, Check, CircleHelp, Forward } from 'lucide-react'
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
}

export function DoseActions({ dose }: DoseActionsProps) {
  const { dispatch } = useDoses()
  const [panel, setPanel] = useState<'none' | 'snooze' | 'skip' | 'unsure'>('none')

  if (isFinalStatus(dose.status)) {
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
    <section className="action-panel" aria-labelledby="dose-action-title">
      <div className="action-heading">
        <h3 id="dose-action-title">Apa yang ingin Anda catat?</h3>
        <p>{safetyCopy.confirmation}</p>
      </div>

      <Button
        variant="primary"
        full
        onClick={() => dispatch({ type: 'confirm', id: dose.id })}
      >
        <Check size={20} aria-hidden="true" />
        Sudah digunakan
      </Button>

      <Button
        variant="secondary"
        full
        aria-expanded={panel === 'snooze'}
        onClick={() => setPanel(panel === 'snooze' ? 'none' : 'snooze')}
      >
        <BellPlus size={20} aria-hidden="true" />
        Ingatkan lagi
      </Button>

      {panel === 'snooze' && (
        <section className="inline-panel" aria-label="Pilihan waktu pengingat">
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

      <div className="secondary-actions">
        <Button
          aria-expanded={panel === 'skip'}
          onClick={() => setPanel(panel === 'skip' ? 'none' : 'skip')}
        >
          <Forward size={20} aria-hidden="true" />
          Lewati dosis
        </Button>
        <Button
          aria-expanded={panel === 'unsure'}
          onClick={() => setPanel(panel === 'unsure' ? 'none' : 'unsure')}
        >
          <CircleHelp size={20} aria-hidden="true" />
          Saya tidak yakin
        </Button>
      </div>

      {panel === 'skip' && (
        <SkipReasonForm onCancel={() => setPanel('none')} onSubmit={skip} />
      )}

      {panel === 'unsure' && (
        <SafetyNotice
          onCancel={() => setPanel('none')}
          onConfirm={() => dispatch({ type: 'markUnsure', id: dose.id })}
        />
      )}
    </section>
  )
}
