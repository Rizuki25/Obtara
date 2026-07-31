import type { DoseStatus } from '../../domain/types'
import { getStatusLabel } from './statusLabels'

interface StatusBadgeProps {
  status: DoseStatus
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel = label ?? getStatusLabel(status)
  return (
    <span
      className="status-badge"
      data-status={status}
      aria-label={`Status: ${displayLabel}`}
    >
      <span className="status-dot" aria-hidden="true" />
      {displayLabel}
    </span>
  )
}
