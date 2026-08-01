import { useState, type FormEvent } from 'react'
import { BellRing, LockKeyhole, UserRound } from 'lucide-react'
import { Brand } from '../components/shell/AppHeader'
import { CapabilityBar } from '../components/shell/CapabilityBar'
import { Button } from '../components/ui/Button'

interface OnboardingPageProps {
  onComplete: (name: string, timezone: string) => void
}

const timezoneOptions = [
  { value: 'Asia/Jakarta', label: 'WIB — Jakarta' },
  { value: 'Asia/Makassar', label: 'WITA — Makassar' },
  { value: 'Asia/Jayapura', label: 'WIT — Jayapura' },
]

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('Asia/Jakarta')
  const [understood, setUnderstood] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !understood) return
    onComplete(name, timezone)
  }

  return (
    <div className="onboarding-page">
      <CapabilityBar />
      <header className="onboarding-header">
        <Brand />
        <span>Pengaturan pribadi</span>
      </header>

      <main className="onboarding-main">
        <section
          className="onboarding-intro"
          aria-labelledby="onboarding-title"
        >
          <span className="step-pill">LANGKAH 1 DARI 2</span>
          <h1 id="onboarding-title">Atur OBTARA untuk saya</h1>
          <p>
            Mulai dengan satu profil pribadi. Anda tidak perlu membuat keluarga
            atau mengundang caregiver untuk menggunakan fitur utama.
          </p>

          <div
            className="onboarding-benefits"
            aria-label="Prinsip mode pribadi"
          >
            <article>
              <UserRound size={20} aria-hidden="true" />
              <div>
                <strong>Satu profil “Saya”</strong>
                <span>Jadwal dan catatan tampil untuk diri sendiri.</span>
              </div>
            </article>
            <article>
              <LockKeyhole size={20} aria-hidden="true" />
              <div>
                <strong>Tersimpan di browser</strong>
                <span>Prototype ini belum mengirim data ke server.</span>
              </div>
            </article>
            <article>
              <BellRing size={20} aria-hidden="true" />
              <div>
                <strong>Pengingat bukan bukti konsumsi</strong>
                <span>Status hanya mencatat pilihan yang Anda buat.</span>
              </div>
            </article>
          </div>
        </section>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>PROFIL PRIBADI</span>
            <h2>Bagaimana OBTARA menyapa Anda?</h2>
            <p>Untuk pengujian, gunakan nama samaran dan data contoh.</p>
          </div>

          <div className="form-field">
            <label htmlFor="profile-name">Nama panggilan</label>
            <input
              className="input"
              id="profile-name"
              name="profileName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Contoh: Rizqie"
              autoComplete="off"
              maxLength={40}
              required
            />
            <small>Akan ditampilkan sebagai “Nama (Saya)”.</small>
          </div>

          <div className="form-field">
            <label htmlFor="profile-timezone">Zona waktu jadwal</label>
            <select
              className="select"
              id="profile-timezone"
              name="timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            >
              {timezoneOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <label className="safety-agreement">
            <input
              type="checkbox"
              checked={understood}
              onChange={(event) => setUnderstood(event.target.checked)}
            />
            <span>
              Saya memahami bahwa prototype ini bukan pengganti instruksi tenaga
              kesehatan dan saya akan memakai data contoh, bukan data kesehatan
              nyata.
            </span>
          </label>

          <Button
            variant="primary"
            full
            type="submit"
            disabled={!name.trim() || !understood}
          >
            Lanjut tambah obat
          </Button>
          <p className="optional-support-note">
            Dukungan keluarga dapat diaktifkan nanti dari Pengaturan dan tidak
            menghalangi penggunaan pribadi.
          </p>
        </form>
      </main>
    </div>
  )
}
