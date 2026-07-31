import type { ReactNode } from 'react'
import { AppHeader, Brand } from './AppHeader'
import { CapabilityBar } from './CapabilityBar'
import { Navigation } from './Navigation'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="application-frame">
      <a className="skip-link" href="#main-content">Langsung ke konten</a>
      <CapabilityBar />
      <AppHeader />

      <div className="app-shell">
        <aside className="sidebar" aria-label="Sidebar aplikasi">
          <p className="sidebar-label">MENU UTAMA</p>
          <Navigation className="sidebar-nav" />
          <section className="safety-card" aria-labelledby="safety-principle-title">
            <h2 id="safety-principle-title">Prinsip Keselamatan</h2>
            <p>
              Status “Belum Dikonfirmasi” berbeda dengan “pasti tidak diminum”.
              Verifikasi selalu melalui komunikasi langsung jika ragu.
            </p>
          </section>
        </aside>

        <header className="mobile-header">
          <Brand />
        </header>

        <main className="app-main" id="main-content" tabIndex={-1}>
          <p className="prototype-disclosure">
            Prototype pengujian · Semua nama, jadwal, foto, status, dan angka pada layar adalah data simulasi.
          </p>
          {children}
        </main>

        <Navigation className="bottom-nav" />
      </div>

      <footer className="site-footer">
        <p><strong>OBTARA Web Platform</strong><span>·</span>Obat tertata, keluarga terjaga.</p>
        <p>Home medication safety and family care platform.</p>
      </footer>
    </div>
  )
}
