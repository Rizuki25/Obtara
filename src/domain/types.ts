export type DoseStatus =
  | 'scheduled'
  | 'due'
  | 'snoozed'
  | 'confirmed'
  | 'skipped'
  | 'unsure'
  | 'unconfirmed'

export type FinalDoseStatus = 'confirmed' | 'skipped' | 'unsure'
export type DoseFilter = 'all' | 'needs-action' | 'resolved'

export type MedicationTint =
  'sky' | 'purple' | 'pink' | 'orange' | 'teal' | 'green'

export type SkipReason =
  | 'Lupa'
  | 'Obat habis'
  | 'Merasa tidak nyaman'
  | 'Sesuai arahan tenaga kesehatan'
  | 'Lainnya'

export interface MedicationImage {
  src: string
  alt: string
  label: string
  credit: string
}

export interface Medication {
  id: string
  name: string
  brand: string
  strength: string
  form: string
  amountPerDose: string
  instructions: string
  location: string
  note: string
  visualLabel: string
  tint: MedicationTint
  stock: number
  images: MedicationImage[]
}

export interface DoseOccurrence {
  id: string
  medicationId: string
  profileName: string
  profileTint: MedicationTint
  scheduledAt: string
  status: DoseStatus
  actionedAt?: string
  remindAt?: string
  skipReason?: SkipReason
  skipNote?: string
}

export interface Profile {
  id: string
  name: string
  shortName: string
}

export interface DoseView extends DoseOccurrence {
  medication: Medication
}

export interface DoseGroup {
  key: string
  label: string
  range: string
  doses: DoseView[]
}
