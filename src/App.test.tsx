import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { DoseProvider } from './state/DoseProvider'
import { PERSONAL_STORAGE_KEY } from './state/personalStorage'

function renderApp() {
  return render(
    <DoseProvider>
      <App />
    </DoseProvider>,
  )
}

describe('alur personal-first', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/today')
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
  })

  it('mengantar pengguna baru dari onboarding ke obat pertama', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(
      screen.getByRole('heading', { name: 'Atur OBTARA untuk saya' }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe('/onboarding')

    await user.type(screen.getByLabelText('Nama panggilan'), 'Naya')
    await user.click(
      screen.getByRole('checkbox', {
        name: /bukan pengganti instruksi tenaga kesehatan/i,
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Lanjut tambah obat' }))

    expect(window.location.pathname).toBe('/medications/new')
    expect(
      screen.getByRole('heading', { name: 'Tambah obat saya' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('Naya (Saya)').length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: 'Isi data contoh' }))
    await user.click(
      screen.getByRole('button', {
        name: 'Simpan obat & lihat Hari Ini',
      }),
    )

    expect(window.location.pathname).toBe('/today')
    expect(
      screen.getByRole('heading', { name: 'Jadwal Obat Saya' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Vitamin Contoh' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Amlodipine Besylate')).not.toBeInTheDocument()

    const stored = JSON.parse(
      window.localStorage.getItem(PERSONAL_STORAGE_KEY) ?? '{}',
    ) as { onboardingComplete?: boolean; medications?: unknown[] }
    expect(stored.onboardingComplete).toBe(true)
    expect(stored.medications).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Tambah Obat' }))
    expect(window.location.pathname).toBe('/medications/new')
    expect(
      screen.getByRole('heading', { name: 'Tambah obat saya' }),
    ).toBeInTheDocument()
  })

  it('memuat kembali profil dan obat yang tersimpan di browser', () => {
    window.localStorage.setItem(
      PERSONAL_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        onboardingComplete: true,
        useDemoData: false,
        profile: {
          id: 'profile-local',
          name: 'Naya (Saya)',
          shortName: 'Naya',
          timezone: 'Asia/Jakarta',
        },
        medications: [
          {
            id: 'med-local',
            name: 'Obat Contoh Lokal',
            brand: 'Demo',
            strength: '5 mg',
            form: 'Tablet',
            amountPerDose: '1 tablet',
            instructions: 'Sesudah makan',
            location: 'Kotak demo',
            note: 'Data simulasi',
            visualLabel: 'OC',
            tint: 'teal',
            stock: 8,
            images: [],
          },
        ],
        occurrences: [
          {
            id: 'dose-local',
            medicationId: 'med-local',
            profileName: 'Naya (Saya)',
            profileTint: 'teal',
            scheduledAt: new Date().toISOString(),
            status: 'scheduled',
          },
        ],
      }),
    )

    renderApp()

    expect(
      screen.getByLabelText('Profil aktif: Naya, mode pribadi'),
    ).toBeInTheDocument()
    const row = screen
      .getByRole('button', { name: 'Obat Contoh Lokal' })
      .closest('article')
    expect(row).not.toBeNull()
    expect(within(row as HTMLElement).getByText('Naya (Saya)')).toBeVisible()
  })
})
