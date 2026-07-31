import { useState } from 'react'
import type { SkipReason } from '../../domain/types'
import { Button } from '../ui/Button'

const reasons: SkipReason[] = [
  'Lupa',
  'Obat habis',
  'Merasa tidak nyaman',
  'Sesuai arahan tenaga kesehatan',
  'Lainnya',
]

interface SkipReasonFormProps {
  onCancel: () => void
  onSubmit: (reason: SkipReason, note?: string) => void
}

export function SkipReasonForm({ onCancel, onSubmit }: SkipReasonFormProps) {
  const [reason, setReason] = useState<SkipReason | ''>('')
  const [note, setNote] = useState('')

  return (
    <form
      className="inline-panel"
      onSubmit={(event) => {
        event.preventDefault()
        if (reason) onSubmit(reason, note)
      }}
    >
      <h4>Alasan melewati dosis</h4>
      <p>Catatan ini membantu riwayat tetap jelas tanpa menghakimi.</p>
      <div className="form-field">
        <label htmlFor="skip-reason">Pilih alasan</label>
        <select
          className="select"
          id="skip-reason"
          value={reason}
          required
          onChange={(event) => setReason(event.target.value as SkipReason)}
        >
          <option value="">Pilih salah satu</option>
          {reasons.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="skip-note">Catatan tambahan (opsional)</label>
        <textarea
          className="textarea"
          id="skip-note"
          value={note}
          maxLength={240}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Tambahkan konteks singkat"
        />
      </div>
      <div className="form-actions">
        <Button onClick={onCancel}>Batal</Button>
        <Button variant="primary" type="submit" disabled={!reason}>
          Simpan dilewati
        </Button>
      </div>
    </form>
  )
}
