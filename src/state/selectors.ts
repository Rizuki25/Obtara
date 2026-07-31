import type {
  DoseGroup,
  DoseOccurrence,
  DoseStatus,
  DoseView,
  Medication,
} from '../domain/types'

const groupLabels: Record<string, string> = {
  morning: 'Pagi',
  noon: 'Siang',
  evening: 'Sore',
  night: 'Malam',
}

function groupKey(date: Date) {
  const hour = date.getHours()
  if (hour < 11) return 'morning'
  if (hour < 15) return 'noon'
  if (hour < 19) return 'evening'
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

export function groupDoses(doses: DoseView[]): DoseGroup[] {
  const groups = new Map<string, DoseView[]>()

  for (const dose of doses) {
    const key = groupKey(new Date(dose.scheduledAt))
    groups.set(key, [...(groups.get(key) ?? []), dose])
  }

  return Array.from(groups.entries()).map(([key, groupedDoses]) => ({
    key,
    label: groupLabels[key],
    doses: groupedDoses,
  }))
}

export function summarizeDoses(doses: DoseView[]) {
  const resolvedStatuses = new Set<DoseStatus>([
    'confirmed',
    'skipped',
    'unsure',
  ])
  const resolved = doses.filter((dose) => resolvedStatuses.has(dose.status)).length
  return { total: doses.length, resolved, remaining: doses.length - resolved }
}
