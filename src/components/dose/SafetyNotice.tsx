import { ShieldAlert } from 'lucide-react'
import { safetyCopy } from '../../copy/safety'
import { Button } from '../ui/Button'

interface SafetyNoticeProps {
  onCancel: () => void
  onConfirm: () => void
}

export function SafetyNotice({ onCancel, onConfirm }: SafetyNoticeProps) {
  return (
    <section className="safety-notice action-popup-safety" aria-labelledby="safety-copy-title">
      <h3 id="safety-copy-title">
        <ShieldAlert size={20} aria-hidden="true" />
        Aman saat ragu
      </h3>
      <p>{safetyCopy.unsure}</p>
      <p>{safetyCopy.late}</p>
      <div className="form-actions">
        <Button onClick={onCancel}>Kembali</Button>
        <Button variant="primary" onClick={onConfirm}>
          Ya, tandai tidak yakin
        </Button>
      </div>
    </section>
  )
}
