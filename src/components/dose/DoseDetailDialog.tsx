import { useEffect, useRef } from 'react'
import { CircleAlert, Info, MapPin, ShieldCheck, X } from 'lucide-react'
import type { DoseView } from '../../domain/types'

interface DoseDetailDialogProps {
  dose: DoseView | null
  onClose: () => void
}

export function DoseDetailDialog({ dose, onClose }: DoseDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dose && !dialog.open) dialog.showModal()
    if (!dose && dialog.open) dialog.close()
  }, [dose])

  if (!dose) return null
  const { medication } = dose

  return (
    <dialog
      className="dialog medication-dialog"
      ref={dialogRef}
      aria-labelledby="dose-detail-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="dialog-content medication-dialog-content">
        <header className="medication-dialog-header">
          <div>
            <span className="photo-kicker">FOTO &amp; KEMASAN OBAT (DEMO)</span>
            <h2 id="dose-detail-title">{medication.name}</h2>
            <p>Merek / Kemasan: {medication.brand}</p>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Tutup detail dosis"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </header>

        <div className="medication-dialog-body">
          <div className="medication-gallery">
            {medication.images.slice(0, 2).map((image) => (
              <figure className="gallery-item" key={image.src}>
                <figcaption>{image.label}</figcaption>
                <img src={image.src} alt={image.alt} />
                <span className="visually-hidden">{image.credit}</span>
              </figure>
            ))}
          </div>

          <section
            className="medication-information"
            aria-label="Informasi obat"
          >
            <div>
              <MapPin
                className="info-icon info-icon-blue"
                size={22}
                aria-hidden="true"
              />
              <p>
                <strong>Lokasi Penyimpanan Fisik:</strong>
                {medication.location}
              </p>
            </div>
            <div>
              <Info
                className="info-icon info-icon-teal"
                size={22}
                aria-hidden="true"
              />
              <p>
                <strong>Dosis &amp; Aturan Minum:</strong>
                {medication.strength} ({medication.amountPerDose}) (
                {medication.instructions.toLowerCase()})
              </p>
            </div>
            <div>
              <ShieldCheck
                className="info-icon info-icon-green"
                size={22}
                aria-hidden="true"
              />
              <p>
                <strong>Catatan Tambahan:</strong>
                {medication.note}
              </p>
            </div>
          </section>

          <aside className="photo-warning">
            <CircleAlert size={20} aria-hidden="true" />
            <p>
              Foto pada prototype adalah contoh visual dan bukan foto obat yang
              sebenarnya.
              <strong>
                {' '}
                Jangan gunakan foto demo ini untuk mengidentifikasi atau memilih
                obat.
              </strong>
            </p>
          </aside>
        </div>
      </div>
    </dialog>
  )
}
