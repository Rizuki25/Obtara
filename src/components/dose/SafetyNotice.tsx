import { ShieldAlert } from 'lucide-react'
import { safetyCopy } from '../../copy/safety'
import { Button } from '../ui/Button'

interface SafetyNoticeProps {
  onCancel: () => void
  onConfirm: () => void
}

export function SafetyNotice({ onCancel, onConfirm }: SafetyNoticeProps) {
  return (
    <section className="safety-notice" aria-labelledby="safety-title">
      <h4 id="safety-title">
        <ShieldAlert size={20} aria-hidden="true" />
        Periksa sebelum tindakan berikutnya
      </h4>
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
