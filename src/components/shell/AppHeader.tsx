import { Moon, Type, UserRound } from 'lucide-react'

const unavailable = 'Belum tersedia di prototype'

export function Brand() {
  return (
    <div className="brand-lockup" aria-label="OBTARA Web">
      <span className="brand-icon" aria-hidden="true">
        <span />
      </span>
      <div>
        <div className="brand-line">
          <strong>OBTARA</strong>
          <span>WEB</span>
        </div>
        <p>Obat tertata, rutinitas terjaga.</p>
      </div>
    </div>
  )
}

export function AppHeader({
  profileName = 'Rizqie (Saya)',
}: {
  profileName?: string
}) {
  return (
    <header className="app-header">
      <Brand />
      <div className="header-actions">
        <div
          className="active-profile"
          aria-label={`Profil aktif: ${profileName.replace(' (Saya)', '')}, mode pribadi`}
        >
          <UserRound size={18} aria-hidden="true" />
          <span>
            <small>Profil aktif</small>
            <strong>{profileName}</strong>
          </span>
          <span className="personal-mode-pill">Pribadi</span>
        </div>
        <span className="header-divider" aria-hidden="true" />
        <button
          className="header-icon-button"
          type="button"
          aria-label={`Tema gelap — ${unavailable}`}
          title={unavailable}
          disabled
        >
          <Moon size={18} aria-hidden="true" />
        </button>
        <button
          className="header-icon-button"
          type="button"
          aria-label={`Ukuran teks — ${unavailable}`}
          title={unavailable}
          disabled
        >
          <Type size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
