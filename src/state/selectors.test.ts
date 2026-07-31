import { describe, expect, it } from 'vitest'
import type { DoseOccurrence, Medication } from '../domain/types'
import {
  filterDoses,
  groupDoses,
  selectDoseViews,
  summarizeDoses,
} from './selectors'

const medication: Medication = {
  id: 'med-1',
  name: 'Obat Uji',
  brand: 'Generik',
  strength: '5 mg',
  form: 'Tablet',
  amountPerDose: '1 tablet',
  instructions: 'Sesudah makan',
  location: 'Rak',
  note: 'Catatan uji',
  visualLabel: 'OU',
  tint: 'sky',
  stock: 10,
  images: [],
}

const occurrences: Record<string, DoseOccurrence> = {
  night: {
    id: 'night',
    medicationId: 'med-1',
    profileName: 'Ibu Uji',
    profileTint: 'purple',
    scheduledAt: '2026-07-31T20:00:00',
    status: 'scheduled',
  },
  morning: {
    id: 'morning',
    medicationId: 'med-1',
    profileName: 'Ibu Uji',
    profileTint: 'purple',
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
    expect(groups.map((group) => group.range)).toEqual([
      '05:00 - 11:00',
      '18:00 - 23:00',
    ])
  })

  it('menghitung metrik dashboard', () => {
    const summary = summarizeDoses(selectDoseViews(occurrences, [medication]))
    expect(summary).toEqual({
      total: 2,
      resolved: 1,
      confirmed: 1,
      delayed: 0,
      remaining: 1,
    })
  })

  it('memfilter status yang selesai dan perlu tindakan', () => {
    const doses = selectDoseViews(occurrences, [medication])
    expect(filterDoses(doses, 'resolved').map((dose) => dose.id)).toEqual([
      'morning',
    ])
    expect(filterDoses(doses, 'needs-action').map((dose) => dose.id)).toEqual([
      'night',
    ])
  })
})
