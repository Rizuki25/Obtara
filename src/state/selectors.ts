import type {
  DoseFilter,
  DoseGroup,
  DoseOccurrence,
  DoseStatus,
  DoseView,
  Medication,
} from '../domain/types'

const groupLabels: Record<string, { label: string; range: string }> = {
  morning: { label: 'Pagi', range: '05:00 - 11:00' },
  noon: { label: 'Siang', range: '11:00 - 15:00' },
  evening: { label: 'Sore', range: '15:00 - 18:00' },
  night: { label: 'Malam', range: '18:00 - 23:00' },
}

function groupKey(date: Date) {
  const hour = date.getHours()
  if (hour < 11) return 'morning'
  if (hour < 15) return 'noon'
  if (hour < 18) return 'evening'
  return 'night'
}

export function selectDoseViews(
  occurrences: Record<string, DoseOccurrence>,
  medications: Medication[],
): DoseView[] {
  const medicationById = new Map(medications.map((item) => [item.id, item]))

  return Object.values(occurrences)
    .map((dose) => {
      const medication = medicationById.get(dose.medicationId)
      if (!medication) return null
      return { ...dose, medication }
    })
    .filter((dose): dose is DoseView => dose !== null)
    .sort(
      (left, right) =>
        new Date(left.scheduledAt).getTime() -
        new Date(right.scheduledAt).getTime(),
    )
}

export function filterDoses(doses: DoseView[], filter: DoseFilter) {
  if (filter === 'all') return doses
  const resolvedStatuses = new Set<DoseStatus>(['confirmed', 'skipped', 'unsure'])
  return doses.filter((dose) =>
    filter === 'resolved'
      ? resolvedStatuses.has(dose.status)
      : !resolvedStatuses.has(dose.status),
  )
}

export function groupDoses(doses: DoseView[]): DoseGroup[] {
  const groups = new Map<string, DoseView[]>()

  for (const dose of doses) {
    const key = groupKey(new Date(dose.scheduledAt))
    groups.set(key, [...(groups.get(key) ?? []), dose])
  }

  return Array.from(groups.entries()).map(([key, groupedDoses]) => ({
    key,
    label: groupLabels[key].label,
    range: groupLabels[key].range,
    doses: groupedDoses,
  }))
}

export function summarizeDoses(doses: DoseView[]) {
  const resolvedStatuses = new Set<DoseStatus>(['confirmed', 'skipped', 'unsure'])
  const resolved = doses.filter((dose) => resolvedStatuses.has(dose.status)).length
  const confirmed = doses.filter((dose) => dose.status === 'confirmed').length
  const delayed = doses.filter((dose) =>
    ['snoozed', 'skipped'].includes(dose.status),
  ).length
  return {
    total: doses.length,
    resolved,
    confirmed,
    delayed,
    remaining: doses.length - resolved,
  }
}
