import type { DoseOccurrence, Medication, Profile } from '../domain/types'

function atToday(hour: number, minute = 0) {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const mockProfile: Profile = {
  id: 'profile-sari',
  name: 'Ibu Sari',
  shortName: 'Sari',
}

export const medications: Medication[] = [
  {
    id: 'med-amlodipine',
    name: 'Amlodipine',
    strength: '5 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Sesudah sarapan',
    location: 'Kotak obat biru · Rak atas',
    visualLabel: 'A',
    tint: 'purple',
    stock: 18,
  },
  {
    id: 'med-metformin',
    name: 'Metformin',
    strength: '500 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Bersama makanan',
    location: 'Kotak obat putih · Rak tengah',
    visualLabel: 'M',
    tint: 'sky',
    stock: 24,
  },
  {
    id: 'med-vitamin-d',
    name: 'Vitamin D3',
    strength: '1.000 IU',
    form: 'Kapsul',
    amountPerDose: '1 kapsul',
    instructions: 'Sesudah makan siang',
    location: 'Laci meja makan',
    visualLabel: 'D3',
    tint: 'orange',
    stock: 11,
  },
  {
    id: 'med-atorvastatin',
    name: 'Atorvastatin',
    strength: '20 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Sesudah makan malam',
    location: 'Kotak obat biru · Rak bawah',
    visualLabel: 'AT',
    tint: 'teal',
    stock: 16,
  },
]

export const initialOccurrences: DoseOccurrence[] = [
  {
    id: 'dose-amlodipine-morning',
    medicationId: 'med-amlodipine',
    scheduledAt: atToday(7, 30),
    status: 'confirmed',
    actionedAt: atToday(7, 38),
  },
  {
    id: 'dose-metformin-morning',
    medicationId: 'med-metformin',
    scheduledAt: atToday(8, 0),
    status: 'due',
  },
  {
    id: 'dose-vitamin-d-noon',
    medicationId: 'med-vitamin-d',
    scheduledAt: atToday(12, 30),
    status: 'scheduled',
  },
  {
    id: 'dose-metformin-evening',
    medicationId: 'med-metformin',
    scheduledAt: atToday(18, 0),
    status: 'scheduled',
  },
  {
    id: 'dose-atorvastatin-night',
    medicationId: 'med-atorvastatin',
    scheduledAt: atToday(20, 0),
    status: 'scheduled',
  },
]
