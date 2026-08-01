import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  Camera,
  CircleAlert,
  Clock3,
  ImageUp,
  MapPin,
  Package,
  X,
} from 'lucide-react'
import type { MedicationImage, NewMedicationInput } from '../../domain/types'
import { useDoses } from '../../state/doseContext'
import { Button } from '../ui/Button'

interface AddMedicationDialogProps {
  open: boolean
  trigger: HTMLButtonElement | null
  onClose: () => void
  onSaved: () => void
}

const photoPresets: Array<MedicationImage & { shortLabel: string }> = [
  {
    src: '/images/medications/blister-blue.jpg',
    alt: 'Foto demo obat dalam kemasan blister biru',
    label: 'Foto demo kemasan blister',
    credit: 'Foto demo prototype',
    shortLabel: 'Pill Strips',
  },
  {
    src: '/images/medications/assorted-pills.jpg',
    alt: 'Foto demo pil dan kapsul beragam warna',
    label: 'Foto demo kapsul',
    credit: 'Foto demo prototype',
    shortLabel: 'Kapsul Contoh',
  },
  {
    src: '/images/medications/blister-pack.jpg',
    alt: 'Foto demo kemasan obat berbentuk blister',
    label: 'Foto demo kemasan obat',
    credit: 'Foto demo prototype',
    shortLabel: 'Kemasan Blister',
  },
  {
    src: '/images/medications/pills-orange.jpg',
    alt: 'Foto demo kapsul dalam kemasan berwarna jingga',
    label: 'Foto demo obat berwarna jingga',
    credit: 'Foto demo prototype',
    shortLabel: 'Obat Contoh',
  },
]

const blankForm: NewMedicationInput = {
  name: '',
  brand: '',
  strength: '',
  form: 'Tablet',
  amountPerDose: '',
  instructions: 'Sesudah makan',
  location: '',
  note: '',
  stock: 30,
  stockUnit: 'tablet',
  refillThreshold: 10,
  scheduleTime: '07:00',
  image: null,
}

const exampleForm: NewMedicationInput = {
  name: 'Vitamin Contoh',
  brand: 'Kemasan Demo',
  strength: '10 mg',
  form: 'Tablet',
  amountPerDose: '1 tablet (10 mg)',
  instructions: 'Sesudah makan',
  location: 'Kotak Obat Utama - Laci 1',
  note: 'Data simulasi untuk mencoba alur OBTARA.',
  stock: 30,
  stockUnit: 'tablet',
  refillThreshold: 10,
  scheduleTime: '07:00',
  image: photoPresets[0],
}

export function AddMedicationDialog({
  open,
  trigger,
  onClose,
  onSaved,
}: AddMedicationDialogProps) {
  const { addMedication, profile } = useDoses()
  const [form, setForm] = useState(blankForm)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    return () => {
      window.setTimeout(() => trigger?.focus(), 0)
    }
  }, [open, trigger])

  if (!open) return null

  const update = <Key extends keyof NewMedicationInput>(
    key: Key,
    value: NewMedicationInput[Key],
  ) => setForm((current) => ({ ...current, [key]: value }))

  const cancel = () => {
    setForm(blankForm)
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.stock < 0 || form.refillThreshold < 0) return
    addMedication(form)
    setForm(blankForm)
    onSaved()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="add-medication-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        cancel()
      }}
      onClose={onClose}
    >
      <div className="add-medication-dialog-surface">
        <span className="add-medication-dialog-handle" aria-hidden="true" />
        <header className="add-medication-dialog-header">
          <div>
            <span className="add-medication-kicker">FORMULIR TAMBAH OBAT</span>
            <h2 id={titleId}>Tambah Obat Rutin Baru</h2>
            <p id={descriptionId}>
              Masukkan data fisik obat, lokasi penyimpanan kabinet, foto
              kemasan, dan jadwal otomatis.
            </p>
          </div>
          <button
            type="button"
            className="icon-button add-medication-dialog-close"
            onClick={cancel}
            aria-label="Tutup formulir tambah obat"
          >
            <X size={23} aria-hidden="true" />
          </button>
        </header>

        <form className="add-medication-popup-form" onSubmit={handleSubmit}>
          <div className="add-medication-dialog-body">
            <aside className="popup-data-warning">
              <CircleAlert size={18} aria-hidden="true" />
              <p>
                <strong>Gunakan data simulasi.</strong> Jangan masukkan data
                kesehatan atau foto pribadi yang sebenarnya.
              </p>
              <button type="button" onClick={() => setForm(exampleForm)}>
                Isi data contoh
              </button>
            </aside>

            <div className="popup-form-field popup-form-field-wide">
              <label htmlFor="medication-owner">Pemilik Obat</label>
              <div className="popup-locked-owner" id="medication-owner">
                <span>{profile.name}</span>
                <small>Profil pribadi · tersimpan di browser ini</small>
              </div>
            </div>

            <div className="popup-form-grid popup-form-grid-two">
              <div className="popup-form-field">
                <label htmlFor="medication-name">
                  Nama Obat (Generik/Bahan Aktif) *
                </label>
                <input
                  className="input"
                  id="medication-name"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  placeholder="Contoh: Vitamin Contoh"
                  maxLength={80}
                  required
                />
              </div>
              <div className="popup-form-field">
                <label htmlFor="medication-brand">
                  Merek Dagang / Pabrik (Opsional)
                </label>
                <input
                  className="input"
                  id="medication-brand"
                  value={form.brand}
                  onChange={(event) => update('brand', event.target.value)}
                  placeholder="Contoh: Kemasan Demo"
                  maxLength={80}
                />
              </div>
            </div>

            <div className="popup-form-grid popup-form-grid-three">
              <div className="popup-form-field">
                <label htmlFor="medication-form">Bentuk Sediaan *</label>
                <select
                  className="select"
                  id="medication-form"
                  value={form.form}
                  onChange={(event) => update('form', event.target.value)}
                >
                  {['Tablet', 'Kapsul', 'Cair', 'Puff', 'Lainnya'].map(
                    (item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="popup-form-field">
                <label htmlFor="medication-amount">
                  Dosis / Jumlah Sekali Pakai *
                </label>
                <input
                  className="input"
                  id="medication-amount"
                  value={form.amountPerDose}
                  onChange={(event) =>
                    update('amountPerDose', event.target.value)
                  }
                  placeholder="Contoh: 1 tablet (10 mg)"
                  maxLength={50}
                  required
                />
              </div>
              <div className="popup-form-field">
                <label htmlFor="medication-instructions">
                  Instruksi Makanan *
                </label>
                <select
                  className="select"
                  id="medication-instructions"
                  value={form.instructions}
                  onChange={(event) =>
                    update('instructions', event.target.value)
                  }
                >
                  {[
                    'Sesudah makan',
                    'Saat makan',
                    'Sebelum makan',
                    'Bebas',
                    'Sesuai label',
                  ].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="popup-form-field popup-form-field-wide">
              <label htmlFor="medication-location">
                Lokasi Penyimpanan Kabinet Fisik *
              </label>
              <div className="location-input-wrap">
                <MapPin size={17} aria-hidden="true" />
                <input
                  className="input"
                  id="medication-location"
                  value={form.location}
                  onChange={(event) => update('location', event.target.value)}
                  placeholder="Contoh: Kotak Obat Utama - Laci 1"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <section
              className="popup-photo-panel"
              aria-labelledby="photo-panel-title"
            >
              <header>
                <div>
                  <Camera size={18} aria-hidden="true" />
                  <h3 id="photo-panel-title">Foto Fisik &amp; Kemasan Obat</h3>
                </div>
                <div className="photo-mode-switch" aria-label="Mode foto">
                  <span>Preset Demo</span>
                  <button
                    type="button"
                    disabled
                    title="Kamera live belum tersedia di prototype"
                  >
                    Kamera Live
                  </button>
                </div>
              </header>

              <div className="photo-upload-row">
                <div className="selected-photo-preview">
                  {form.image ? (
                    <img src={form.image.src} alt={form.image.alt} />
                  ) : (
                    <ImageUp size={24} aria-hidden="true" />
                  )}
                </div>
                <div>
                  <button
                    className="photo-upload-button"
                    type="button"
                    disabled
                    title="Upload berkas akan tersedia pada tahap berikutnya"
                  >
                    <ImageUp size={16} aria-hidden="true" />
                    Pilih Berkas Foto
                  </button>
                  <p>
                    Upload foto belum aktif. Pilih salah satu preset demo di
                    bawah agar tidak memakai data nyata.
                  </p>
                </div>
              </div>

              <div className="photo-preset-list">
                {photoPresets.map((preset) => (
                  <button
                    type="button"
                    className="photo-preset-card"
                    aria-pressed={form.image?.src === preset.src}
                    onClick={() => update('image', preset)}
                    key={preset.src}
                  >
                    <img src={preset.src} alt="" />
                    <span>{preset.shortLabel}</span>
                  </button>
                ))}
              </div>
            </section>

            <section
              className="popup-inline-section"
              aria-labelledby="schedule-title"
            >
              <div className="popup-inline-heading">
                <Clock3 size={18} aria-hidden="true" />
                <div>
                  <h3 id="schedule-title">Waktu / Jam Penggunaan Harian</h3>
                  <small>Zona waktu {profile.timezone}</small>
                </div>
              </div>
              <div className="schedule-time-control">
                <input
                  className="input"
                  aria-label="Waktu penggunaan harian"
                  type="time"
                  value={form.scheduleTime}
                  onChange={(event) =>
                    update('scheduleTime', event.target.value)
                  }
                  required
                />
                <span>Setiap hari</span>
              </div>
            </section>

            <section
              className="popup-inline-section"
              aria-labelledby="stock-title"
            >
              <div className="popup-inline-heading">
                <Package size={18} aria-hidden="true" />
                <div>
                  <h3 id="stock-title">Stok dan Pengingat Refill</h3>
                  <small>Jumlah awal dan batas peringatan stok.</small>
                </div>
              </div>
              <div className="popup-form-grid popup-form-grid-three">
                <div className="popup-form-field">
                  <label htmlFor="medication-stock">
                    Stok Awal Fisik Saat Ini *
                  </label>
                  <input
                    className="input"
                    id="medication-stock"
                    type="number"
                    min="0"
                    max="9999"
                    value={form.stock}
                    onChange={(event) =>
                      update('stock', Number(event.target.value))
                    }
                    required
                  />
                </div>
                <div className="popup-form-field">
                  <label htmlFor="medication-stock-unit">Satuan Stok *</label>
                  <input
                    className="input"
                    id="medication-stock-unit"
                    value={form.stockUnit}
                    onChange={(event) =>
                      update('stockUnit', event.target.value)
                    }
                    placeholder="tablet"
                    maxLength={30}
                    required
                  />
                </div>
                <div className="popup-form-field">
                  <label htmlFor="medication-refill-threshold">
                    Ambang Peringatan Refill *
                  </label>
                  <input
                    className="input"
                    id="medication-refill-threshold"
                    type="number"
                    min="0"
                    max="9999"
                    value={form.refillThreshold}
                    onChange={(event) =>
                      update('refillThreshold', Number(event.target.value))
                    }
                    required
                  />
                </div>
              </div>
            </section>

            <div className="popup-form-field popup-form-field-wide popup-note-field">
              <label htmlFor="medication-note">
                Catatan Khusus Dokter / Perawat
              </label>
              <textarea
                className="textarea"
                id="medication-note"
                value={form.note}
                onChange={(event) => update('note', event.target.value)}
                placeholder="Contoh: Gunakan catatan simulasi untuk pengujian."
                maxLength={240}
              />
            </div>
          </div>

          <footer className="add-medication-dialog-footer">
            <Button variant="secondary" onClick={cancel}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan Obat ke Kabinet
            </Button>
          </footer>
        </form>
      </div>
    </dialog>,
    document.body,
  )
}
