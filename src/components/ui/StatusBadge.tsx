import type { DoseStatus } from '../../domain/types'
import { getStatusLabel } from './statusLabels'

export function StatusBadge({ status }: { status: DoseStatus }) {
  const label = getStatusLabel(status)
  return (
    <span className="status-badge" data-status={status} aria-label={`Status: ${label}`}>
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  )
}
