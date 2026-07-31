import type { Medication } from '../../domain/types'

export function MedicationVisual({ medication }: { medication: Medication }) {
  return (
    <div
      className="medication-visual"
      data-tint={medication.tint}
      role="img"
      aria-label={`Ilustrasi kemasan ${medication.name} ${medication.strength}. Foto asli belum tersedia.`}
    >
      {medication.visualLabel}
    </div>
  )
}
