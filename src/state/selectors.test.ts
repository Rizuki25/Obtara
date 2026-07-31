import { describe, expect, it } from 'vitest'
import type { DoseOccurrence, Medication } from '../domain/types'
import { groupDoses, selectDoseViews, summarizeDoses } from './selectors'

const medication: Medication = {
  id: 'med-1',
  name: 'Obat Uji',
  strength: '5 mg',
  form: 'Tablet',
  amountPerDose: '1 tablet',
  instructions: 'Sesudah makan',
  location: 'Rak',
  visualLabel: 'OU',
  tint: 'sky',
  stock: 10,
}

const occurrences: Record<string, DoseOccurrence> = {
  night: {
    id: 'night',
    medicationId: 'med-1',
    scheduledAt: '2026-07-31T20:00:00',
    status: 'scheduled',
  },
  morning: {
    id: 'morning',
    medicationId: 'med-1',
    scheduledAt: '2026-07-31T08:00:00',
    status: 'confirmed',
  },
}

describe('dose selectors', () => {
  it('mengurutkan dosis dan menggabungkan detail obat', () => {
    const doses = selectDoseViews(occurrences, [medication])
    expect(doses.map((dose) => dose.id)).toEqual(['morning', 'night'])
    expect(doses[0].medication.name).toBe('Obat Uji')
  })

  it('mengelompokkan dosis berdasarkan bagian hari', () => {
    const groups = groupDoses(selectDoseViews(occurrences, [medication]))
    expect(groups.map((group) => group.label)).toEqual(['Pagi', 'Malam'])
  })

  it('menghitung ringkasan status final', () => {
    const summary = summarizeDoses(selectDoseViews(occurrences, [medication]))
    expect(summary).toEqual({ total: 2, resolved: 1, remaining: 1 })
  })
})
