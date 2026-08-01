import type { ReactNode } from 'react'
import { AppHeader, Brand } from './AppHeader'
import { CapabilityBar } from './CapabilityBar'
import { Navigation } from './Navigation'

interface AppShellProps {
  children: ReactNode
  profileName?: string
  activePath?: string
  onNavigate?: (path: string) => void
  onReset?: () => void
}

export function AppShell({
  children,
  profileName,
  activePath = '/today',
  onNavigate,
  onReset,
}: AppShellProps) {
  return (
    <div className="application-frame">
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <CapabilityBar />
      <AppHeader profileName={profileName} />

      <div className="app-shell">
        <aside className="sidebar" aria-label="Sidebar aplikasi">
          <p className="sidebar-label">MENU PRIBADI</p>
          <Navigation
            className="sidebar-nav"
            activePath={activePath}
            onNavigate={onNavigate}
          />
          <section
            className="safety-card"
            aria-labelledby="safety-principle-title"
          >
            <h2 id="safety-principle-title">Catatan Aman</h2>
            <p>
              “Belum Dikonfirmasi” berarti OBTARA belum menerima catatan Anda.
              Jika ragu, periksa instruksi obat atau minta bantuan.
            </p>
          </section>
        </aside>

        <header className="mobile-header">
          <Brand />
        </header>

        <main className="app-main" id="main-content" tabIndex={-1}>
          <div className="prototype-disclosure">
            <p>
              Prototype mode pribadi · Semua obat, jadwal, foto, status, dan
              angka pada layar adalah data simulasi.
            </p>
            {onReset ? (
              <button type="button" onClick={onReset}>
                Mulai ulang prototype
              </button>
            ) : null}
          </div>
          {children}
        </main>

        <Navigation
          className="bottom-nav"
          activePath={activePath}
          onNavigate={onNavigate}
        />
      </div>

      <footer className="site-footer">
        <p>
          <strong>OBTARA Web Platform</strong>
          <span>·</span>Obat tertata, rutinitas terjaga.
        </p>
        <p>Rutinitas obat pribadi dengan dukungan keluarga yang opsional.</p>
      </footer>
    </div>
  )
}
