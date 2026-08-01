import { useState, type FormEvent } from 'react'
import {
  Camera,
  CircleAlert,
  Clock3,
  Package,
  Pill,
  UserRound,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import type { NewMedicationInput } from '../domain/types'
import { useDoses } from '../state/doseContext'

interface AddMedicationPageProps {
  onCancel: () => void
  onSaved: () => void
}

const blankForm: NewMedicationInput = {
  name: '',
  brand: '',
  strength: '',
  form: 'Tablet',
  amountPerDose: '',
  instructions: 'Sesudah makan',
  location: '',
  note: '',
  stock: 0,
  scheduleTime: '09:00',
}

const exampleForm: NewMedicationInput = {
  name: 'Vitamin Contoh',
  brand: 'Kemasan Demo',
  strength: '10 mg',
  form: 'Tablet',
  amountPerDose: '1 tablet',
  instructions: 'Sesudah makan',
  location: 'Kotak obat demo',
  note: 'Data simulasi untuk mencoba alur OBTARA.',
  stock: 10,
  scheduleTime: '09:00',
}

export function AddMedicationPage({
  onCancel,
  onSaved,
}: AddMedicationPageProps) {
  const { addMedication, profile } = useDoses()
  const [form, setForm] = useState(blankForm)

  const update = <Key extends keyof NewMedicationInput>(
    key: Key,
    value: NewMedicationInput[Key],
  ) => setForm((current) => ({ ...current, [key]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.stock < 0) return
    addMedication(form)
    onSaved()
  }

  return (
    <section
      className="medication-form-page"
      aria-labelledby="add-medication-title"
    >
      <header className="medication-form-hero">
        <div>
          <span className="step-pill">LANGKAH 2 DARI 2</span>
          <h1 id="add-medication-title">Tambah obat saya</h1>
          <p>
            Lengkapi data contoh agar OBTARA dapat membuat satu jadwal untuk
            Hari Ini. Kolom bertanda * wajib diisi.
          </p>
        </div>
        <Button variant="secondary" onClick={() => setForm(exampleForm)}>
          Isi data contoh
        </Button>
      </header>

      <aside className="prototype-data-warning">
        <CircleAlert size={20} aria-hidden="true" />
        <p>
          <strong>Gunakan data simulasi.</strong> Jangan masukkan nama obat,
          kondisi kesehatan, atau foto pribadi yang sebenarnya pada prototype
          ini.
        </p>
      </aside>

      <form className="medication-form" onSubmit={handleSubmit}>
        <section className="form-section" aria-labelledby="owner-section-title">
          <div className="form-section-heading">
            <UserRound size={21} aria-hidden="true" />
            <div>
              <h2 id="owner-section-title">Pemilik</h2>
              <p>Mode pribadi menetapkan pemilik secara otomatis.</p>
            </div>
          </div>
          <div className="locked-profile-field">
            <span>Profil</span>
            <strong>{profile.name}</strong>
            <small>Data tetap pribadi di browser ini.</small>
          </div>
        </section>

        <section
          className="form-section"
          aria-labelledby="identity-section-title"
        >
          <div className="form-section-heading">
            <Pill size={21} aria-hidden="true" />
            <div>
              <h2 id="identity-section-title">Identitas obat</h2>
              <p>Tulis sesuai label data contoh yang digunakan dalam tes.</p>
            </div>
          </div>
          <div className="form-grid form-grid-two">
            <div className="form-field form-field-wide">
              <label htmlFor="medication-name">Nama obat *</label>
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
            <div className="form-field">
              <label htmlFor="medication-brand">Merek atau kemasan</label>
              <input
                className="input"
                id="medication-brand"
                value={form.brand}
                onChange={(event) => update('brand', event.target.value)}
                placeholder="Contoh: Kemasan Demo"
                maxLength={80}
              />
            </div>
            <div className="form-field">
              <label htmlFor="medication-strength">Kekuatan *</label>
              <input
                className="input"
                id="medication-strength"
                value={form.strength}
                onChange={(event) => update('strength', event.target.value)}
                placeholder="Contoh: 10 mg"
                maxLength={40}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="medication-form">Bentuk *</label>
              <select
                className="select"
                id="medication-form"
                value={form.form}
                onChange={(event) => update('form', event.target.value)}
              >
                {['Tablet', 'Kapsul', 'Cair', 'Puff', 'Lainnya'].map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="medication-amount">Jumlah per penggunaan *</label>
              <input
                className="input"
                id="medication-amount"
                value={form.amountPerDose}
                onChange={(event) =>
                  update('amountPerDose', event.target.value)
                }
                placeholder="Contoh: 1 tablet"
                maxLength={40}
                required
              />
            </div>
          </div>

          <div className="photo-placeholder">
            <Camera size={22} aria-hidden="true" />
            <div>
              <strong>Foto obat belum diaktifkan</strong>
              <span>
                Upload dan kamera akan ditambahkan setelah alur formulir dasar
                tervalidasi. Jadwal memakai ilustrasi huruf sementara.
              </span>
            </div>
            <span className="coming-soon-pill">TAHAP BERIKUTNYA</span>
          </div>
        </section>

        <section
          className="form-section"
          aria-labelledby="schedule-section-title"
        >
          <div className="form-section-heading">
            <Clock3 size={21} aria-hidden="true" />
            <div>
              <h2 id="schedule-section-title">Jadwal</h2>
              <p>Satu waktu harian untuk versi prototype awal.</p>
            </div>
          </div>
          <div className="form-grid form-grid-two">
            <div className="form-field">
              <label htmlFor="medication-time">Waktu penggunaan *</label>
              <input
                className="input"
                id="medication-time"
                type="time"
                value={form.scheduleTime}
                onChange={(event) => update('scheduleTime', event.target.value)}
                required
              />
              <small>Zona waktu: {profile.timezone}</small>
            </div>
            <div className="form-field">
              <label htmlFor="medication-instructions">Petunjuk *</label>
              <select
                className="select"
                id="medication-instructions"
                value={form.instructions}
                onChange={(event) => update('instructions', event.target.value)}
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
        </section>

        <section className="form-section" aria-labelledby="stock-section-title">
          <div className="form-section-heading">
            <Package size={21} aria-hidden="true" />
            <div>
              <h2 id="stock-section-title">Penyimpanan dan stok</h2>
              <p>Membantu mengenali tempat obat dan jumlah awal.</p>
            </div>
          </div>
          <div className="form-grid form-grid-two">
            <div className="form-field">
              <label htmlFor="medication-location">Lokasi penyimpanan *</label>
              <input
                className="input"
                id="medication-location"
                value={form.location}
                onChange={(event) => update('location', event.target.value)}
                placeholder="Contoh: Kotak obat demo"
                maxLength={100}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="medication-stock">Stok awal *</label>
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
            <div className="form-field form-field-wide">
              <label htmlFor="medication-note">Catatan opsional</label>
              <textarea
                className="textarea"
                id="medication-note"
                value={form.note}
                onChange={(event) => update('note', event.target.value)}
                placeholder="Catatan data simulasi"
                maxLength={240}
              />
            </div>
          </div>
        </section>

        <footer className="medication-form-actions">
          <Button variant="secondary" onClick={onCancel}>
            Kembali ke Hari Ini
          </Button>
          <Button variant="primary" type="submit">
            Simpan obat &amp; lihat Hari Ini
          </Button>
        </footer>
      </form>
    </section>
  )
}
