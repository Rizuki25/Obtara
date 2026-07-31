export type DoseStatus =
  | 'scheduled'
  | 'due'
  | 'snoozed'
  | 'confirmed'
  | 'skipped'
  | 'unsure'
  | 'unconfirmed'

export type FinalDoseStatus = 'confirmed' | 'skipped' | 'unsure'

export type MedicationTint =
  | 'sky'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'teal'
  | 'green'

export type SkipReason =
  | 'Lupa'
  | 'Obat habis'
  | 'Merasa tidak nyaman'
  | 'Sesuai arahan tenaga kesehatan'
  | 'Lainnya'

export interface Medication {
  id: string
  name: string
  strength: string
  form: string
  amountPerDose: string
  instructions: string
  location: string
  visualLabel: string
  tint: MedicationTint
  stock: number
}

export interface DoseOccurrence {
  id: string
  medicationId: string
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
  doses: DoseView[]
}
