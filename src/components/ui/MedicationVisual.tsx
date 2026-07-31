import type { Medication } from '../../domain/types'

interface MedicationVisualProps {
  medication: Medication
  imageIndex?: number
  className?: string
}

export function MedicationVisual({
  medication,
  imageIndex = 0,
  className = '',
}: MedicationVisualProps) {
  const image = medication.images[imageIndex]

  if (image) {
    return (
      <figure
        className={`medication-visual medication-photo ${className}`.trim()}
      >
        <img src={image.src} alt={image.alt} />
        <figcaption className="visually-hidden">{image.credit}</figcaption>
      </figure>
    )
  }

  return (
    <div
      className={`medication-visual ${className}`.trim()}
      data-tint={medication.tint}
      role="img"
      aria-label={`Ilustrasi kemasan ${medication.name} ${medication.strength}. Foto asli belum tersedia.`}
    >
      {medication.visualLabel}
    </div>
  )
}
