import type { ReactNode } from 'react'
import { AppHeader, Brand } from './AppHeader'
import { CapabilityBar } from './CapabilityBar'
import { Navigation } from './Navigation'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="application-frame">
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <CapabilityBar />
      <AppHeader />

      <div className="app-shell">
        <aside className="sidebar" aria-label="Sidebar aplikasi">
          <p className="sidebar-label">MENU PRIBADI</p>
          <Navigation className="sidebar-nav" />
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
          <p className="prototype-disclosure">
            Prototype mode pribadi · Semua obat, jadwal, foto, status, dan angka
            pada layar adalah data simulasi.
          </p>
          {children}
        </main>

        <Navigation className="bottom-nav" />
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
