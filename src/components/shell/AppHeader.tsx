import { ChevronDown, Moon, ShieldAlert, Type } from 'lucide-react'

const unavailable = 'Belum tersedia di prototype'

export function Brand() {
  return (
    <div className="brand-lockup" aria-label="OBTARA Web">
      <span className="brand-icon" aria-hidden="true"><span /></span>
      <div>
        <div className="brand-line"><strong>OBTARA</strong><span>WEB</span></div>
        <p>Obat tertata, keluarga terjaga.</p>
      </div>
    </div>
  )
}

export function AppHeader() {
  return (
    <header className="app-header">
      <Brand />
      <div className="header-actions">
        <button className="family-switcher" type="button" disabled title={unavailable}>
          <span className="family-dot" aria-hidden="true" />
          Semua Keluarga
          <ChevronDown size={16} aria-hidden="true" />
        </button>
        <button className="caregiver-alert" type="button" disabled title={unavailable}>
          <ShieldAlert size={18} aria-hidden="true" />
          Alert Caregiver
          <span>1</span>
        </button>
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
