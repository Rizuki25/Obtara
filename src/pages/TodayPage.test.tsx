import { render, screen } from '@testing-library/react'
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
  it('menampilkan jadwal dan detail dosis', async () => {
    const user = userEvent.setup()
    renderPage()

    expect(screen.getByRole('heading', { name: /Selamat datang, Sari/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Buka detail Metformin 500 mg, pukul 08/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Metformin' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sudah digunakan' })).toBeInTheDocument()
  })

  it('mencatat konfirmasi hanya sekali dan mengganti kontrol tindakan', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /Buka detail Metformin 500 mg, pukul 08/i }))
    await user.click(screen.getByRole('button', { name: 'Sudah digunakan' }))

    expect(screen.getByRole('heading', { name: /Sudah tercatat: Dikonfirmasi/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sudah digunakan' })).not.toBeInTheDocument()
  })

  it('memerlukan alasan sebelum menyimpan dosis dilewati', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /Buka detail Vitamin D3/i }))
    await user.click(screen.getByRole('button', { name: 'Lewati dosis' }))

    const submit = screen.getByRole('button', { name: 'Simpan dilewati' })
    expect(submit).toBeDisabled()
    await user.selectOptions(screen.getByLabelText('Pilih alasan'), 'Obat habis')
    expect(submit).toBeEnabled()
    await user.click(submit)
    expect(screen.getByRole('heading', { name: /Sudah tercatat: Dilewati/i })).toBeInTheDocument()
  })

  it('menampilkan copy keselamatan sebelum mencatat tidak yakin', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /Buka detail Atorvastatin/i }))
    await user.click(screen.getByRole('button', { name: 'Saya tidak yakin' }))

    expect(screen.getByText(/mengganti jadwal yang terlewat/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ya, tandai tidak yakin' }))
    expect(screen.getByRole('heading', { name: /Sudah tercatat: Tidak yakin/i })).toBeInTheDocument()
  })
})
