import type { ReactNode } from 'react'
import { mockProfile } from '../../data/mockData'
import { Navigation } from './Navigation'

function Brand() {
  return (
    <div className="brand" aria-label="OBTARA">
      <span className="brand-mark" aria-hidden="true">O</span>
      <span>OBTARA</span>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Langsung ke konten</a>

      <header className="mobile-header">
        <Brand />
        <div className="profile-chip" aria-label={`Profil aktif: ${mockProfile.name}`}>
          <span className="profile-avatar" aria-hidden="true">IS</span>
          <span>{mockProfile.name}</span>
        </div>
      </header>

      <aside className="sidebar" aria-label="Sidebar aplikasi">
        <Brand />
        <div className="sidebar-profile">
          <span className="profile-avatar" aria-hidden="true">IS</span>
          <div>
            <strong>{mockProfile.name}</strong>
            <span>Profil pengguna obat</span>
          </div>
        </div>
        <Navigation className="sidebar-nav" />
        <p className="sidebar-note">
          Prototype tahap pertama menggunakan data simulasi. Tidak ada data kesehatan yang dikirim.
        </p>
      </aside>

      <main className="app-main" id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Navigation className="bottom-nav" />
    </div>
  )
}
