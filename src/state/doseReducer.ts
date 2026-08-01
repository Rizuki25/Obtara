import type {
  DoseOccurrence,
  DoseStatus,
  FinalDoseStatus,
  SkipReason,
} from '../domain/types'

export interface DoseState {
  occurrences: Record<string, DoseOccurrence>
  announcement: string
}

export type DoseAction =
  | { type: 'addOccurrence'; occurrence: DoseOccurrence }
  | { type: 'replaceOccurrences'; occurrences: DoseOccurrence[] }
  | { type: 'confirm'; id: string; at?: string }
  | { type: 'snooze'; id: string; minutes: number; at?: string }
  | {
      type: 'skip'
      id: string
      reason: SkipReason
      note?: string
      at?: string
    }
  | { type: 'markUnsure'; id: string; at?: string }
  | { type: 'clearAnnouncement' }

export const finalStatuses = new Set<DoseStatus>([
  'confirmed',
  'skipped',
  'unsure',
])

export function isFinalStatus(status: DoseStatus): status is FinalDoseStatus {
  return finalStatuses.has(status)
}

function timestamp(at?: string) {
  return at ?? new Date().toISOString()
}

function updateOccurrence(
  state: DoseState,
  id: string,
  update: (occurrence: DoseOccurrence) => DoseOccurrence,
  announcement: string,
): DoseState {
  const current = state.occurrences[id]

  if (!current || isFinalStatus(current.status)) {
    return state
  }

  return {
    occurrences: {
      ...state.occurrences,
      [id]: update(current),
    },
    announcement,
  }
}

export function createDoseState(occurrences: DoseOccurrence[]): DoseState {
  return {
    occurrences: Object.fromEntries(occurrences.map((dose) => [dose.id, dose])),
    announcement: '',
  }
}

export function doseReducer(state: DoseState, action: DoseAction): DoseState {
  switch (action.type) {
    case 'addOccurrence':
      return {
        occurrences: {
          ...state.occurrences,
          [action.occurrence.id]: action.occurrence,
        },
        announcement: 'Obat dan jadwal baru berhasil ditambahkan.',
      }
    case 'replaceOccurrences':
      return createDoseState(action.occurrences)
    case 'confirm':
      return updateOccurrence(
        state,
        action.id,
        (dose) => ({
          ...dose,
          status: 'confirmed',
          actionedAt: timestamp(action.at),
          remindAt: undefined,
        }),
        'Dosis ditandai sudah digunakan.',
      )
    case 'snooze':
      return updateOccurrence(
        state,
        action.id,
        (dose) => {
          const at = new Date(timestamp(action.at))
          at.setMinutes(at.getMinutes() + action.minutes)
          return {
            ...dose,
            status: 'snoozed',
            remindAt: at.toISOString(),
          }
        },
        `Pengingat diatur lagi dalam ${action.minutes} menit.`,
      )
    case 'skip':
      if (!action.reason) return state
      return updateOccurrence(
        state,
        action.id,
        (dose) => ({
          ...dose,
          status: 'skipped',
          actionedAt: timestamp(action.at),
          skipReason: action.reason,
          skipNote: action.note?.trim() || undefined,
          remindAt: undefined,
        }),
        'Dosis ditandai dilewati.',
      )
    case 'markUnsure':
      return updateOccurrence(
        state,
        action.id,
        (dose) => ({
          ...dose,
          status: 'unsure',
          actionedAt: timestamp(action.at),
          remindAt: undefined,
        }),
        'Dosis ditandai tidak yakin.',
      )
    case 'clearAnnouncement':
      return { ...state, announcement: '' }
  }
}
