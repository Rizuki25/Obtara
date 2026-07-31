import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DoseProvider } from '../state/DoseProvider'
import { TodayPage } from './TodayPage'

function renderPage() {
  return render(
    <DoseProvider>
      <TodayPage />
    </DoseProvider>,
  )
}

describe('TodayPage', () => {
  it('menampilkan dashboard dan modal foto obat', async () => {
    const user = userEvent.setup()
    renderPage()

    expect(
      screen.getByRole('heading', { name: 'Jadwal Obat & Status Dosis' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Tambah Obat Rutin/i })).toBeDisabled()
    await user.click(
      screen.getByRole('button', {
        name: /Buka detail Amlodipine Besylate 10 mg, pukul 07/i,
      }),
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Amlodipine Besylate' }),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('dialog')).getAllByRole('img'),
    ).toHaveLength(2)
    expect(screen.getByText(/Lokasi Penyimpanan Fisik/i)).toBeInTheDocument()
  })

  it('mencatat konfirmasi hanya sekali dari baris obat', async () => {
    const user = userEvent.setup()
    renderPage()
    const row = screen
      .getByRole('button', { name: 'Amlodipine Besylate' })
      .closest('article')

    expect(row).not.toBeNull()
    await user.click(
      within(row as HTMLElement).getByRole('button', {
        name: 'Dikonfirmasi (Sudah Minum)',
      }),
    )

    expect(
      within(row as HTMLElement).getByText(/Stok otomatis berkurang 1 unit/i),
    ).toBeInTheDocument()
    expect(
      within(row as HTMLElement).queryByRole('button', {
        name: 'Dikonfirmasi (Sudah Minum)',
      }),
    ).not.toBeInTheDocument()
  })

  it('memerlukan alasan sebelum menyimpan dosis dilewati', async () => {
    const user = userEvent.setup()
    renderPage()
    const row = screen
      .getByRole('button', { name: 'Salbutamol Inhaler' })
      .closest('article')

    await user.click(within(row as HTMLElement).getByRole('button', { name: 'Lewati' }))
    const submit = within(row as HTMLElement).getByRole('button', {
      name: 'Simpan dilewati',
    })
    expect(submit).toBeDisabled()
    await user.selectOptions(
      within(row as HTMLElement).getByLabelText('Pilih alasan'),
      'Obat habis',
    )
    await user.click(submit)
    expect(within(row as HTMLElement).getByText(/Status tercatat: Dilewati/i)).toBeInTheDocument()
  })

  it('menampilkan copy keselamatan sebelum mencatat tidak yakin', async () => {
    const user = userEvent.setup()
    renderPage()
    const rows = screen.getAllByRole('button', { name: 'Metformin HCl' })
    const row = rows[0].closest('article')

    await user.click(
      within(row as HTMLElement).getByRole('button', { name: 'Tidak Yakin' }),
    )
    expect(
      within(row as HTMLElement).getByText(/mengganti jadwal yang terlewat/i),
    ).toBeInTheDocument()
    await user.click(
      within(row as HTMLElement).getByRole('button', {
        name: 'Ya, tandai tidak yakin',
      }),
    )
    expect(
      within(row as HTMLElement).getByText(/Status tercatat: Tidak yakin/i),
    ).toBeInTheDocument()
  })

  it('memfilter jadwal selesai', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(
      screen.getByRole('button', { name: 'Selesai / Dikonfirmasi' }),
    )
    expect(screen.getByRole('button', { name: 'Allopurinol' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Amlodipine Besylate' }),
    ).not.toBeInTheDocument()
  })
})
