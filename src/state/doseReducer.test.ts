import { describe, expect, it } from 'vitest'
import type { DoseOccurrence } from '../domain/types'
import { createDoseState, doseReducer } from './doseReducer'

const occurrence: DoseOccurrence = {
  id: 'dose-1',
  medicationId: 'med-1',
  scheduledAt: '2026-07-31T08:00:00.000Z',
  status: 'due',
}

function initialState() {
  return createDoseState([occurrence])
}

describe('doseReducer', () => {
  it('mengonfirmasi dosis dan menyimpan waktu tindakan', () => {
    const state = doseReducer(initialState(), {
      type: 'confirm',
      id: 'dose-1',
      at: '2026-07-31T08:05:00.000Z',
    })

    expect(state.occurrences['dose-1']).toMatchObject({
      status: 'confirmed',
      actionedAt: '2026-07-31T08:05:00.000Z',
    })
  })

  it('mencegah tindakan final kedua pada event yang sama', () => {
    const confirmed = doseReducer(initialState(), {
      type: 'confirm',
      id: 'dose-1',
      at: '2026-07-31T08:05:00.000Z',
    })
    const duplicate = doseReducer(confirmed, {
      type: 'skip',
      id: 'dose-1',
      reason: 'Lupa',
      at: '2026-07-31T08:06:00.000Z',
    })

    expect(duplicate).toBe(confirmed)
    expect(duplicate.occurrences['dose-1'].status).toBe('confirmed')
  })

  it('menunda tanpa menjadikan dosis final', () => {
    const snoozed = doseReducer(initialState(), {
      type: 'snooze',
      id: 'dose-1',
      minutes: 30,
      at: '2026-07-31T08:00:00.000Z',
    })
    const confirmed = doseReducer(snoozed, {
      type: 'confirm',
      id: 'dose-1',
      at: '2026-07-31T08:30:00.000Z',
    })

    expect(snoozed.occurrences['dose-1'].status).toBe('snoozed')
    expect(snoozed.occurrences['dose-1'].remindAt).toBe(
      '2026-07-31T08:30:00.000Z',
    )
    expect(confirmed.occurrences['dose-1'].status).toBe('confirmed')
  })

  it('menyimpan alasan ketika dosis dilewati', () => {
    const state = doseReducer(initialState(), {
      type: 'skip',
      id: 'dose-1',
      reason: 'Obat habis',
      note: 'Akan membeli besok',
      at: '2026-07-31T08:10:00.000Z',
    })

    expect(state.occurrences['dose-1']).toMatchObject({
      status: 'skipped',
      skipReason: 'Obat habis',
      skipNote: 'Akan membeli besok',
    })
  })

  it('menjadikan status tidak yakin sebagai status final', () => {
    const unsure = doseReducer(initialState(), {
      type: 'markUnsure',
      id: 'dose-1',
      at: '2026-07-31T08:15:00.000Z',
    })
    const afterConfirm = doseReducer(unsure, {
      type: 'confirm',
      id: 'dose-1',
    })

    expect(unsure.occurrences['dose-1'].status).toBe('unsure')
    expect(afterConfirm).toBe(unsure)
  })
})
