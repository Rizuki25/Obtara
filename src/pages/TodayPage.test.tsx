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
      screen.getByRole('heading', { name: 'Jadwal Obat Saya' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Tambah Obat/i })).toBeDisabled()
    expect(screen.getAllByText('Rizqie (Saya)')).toHaveLength(5)
    expect(screen.queryByText('Ibu Sumarni')).not.toBeInTheDocument()
    expect(screen.queryByText('Ayah Budi')).not.toBeInTheDocument()
    await user.click(
      screen.getByRole('button', {
        name: /Buka detail Amlodipine Besylate 10 mg, pukul 07/i,
      }),
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(
      within(dialog).getByRole('heading', { name: 'Amlodipine Besylate' }),
    ).toBeInTheDocument()
    expect(within(dialog).getAllByRole('img')).toHaveLength(2)
    expect(
      within(dialog).getByText(/Lokasi Penyimpanan Fisik/i),
    ).toBeInTheDocument()
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
        name: 'Dikonfirmasi (Sudah Digunakan)',
      }),
    )

    expect(
      within(row as HTMLElement).getByText(/Stok otomatis berkurang 1 unit/i),
    ).toBeInTheDocument()
    expect(
      within(row as HTMLElement).queryByRole('button', {
        name: 'Dikonfirmasi (Sudah Digunakan)',
      }),
    ).not.toBeInTheDocument()
  })

  it('menunda melalui popup tanpa memperluas medication row', async () => {
    const user = userEvent.setup()
    renderPage()
    const row = screen
      .getAllByRole('button', { name: 'Metformin HCl' })[0]
      .closest('article') as HTMLElement
    const trigger = within(row).getByRole('button', { name: 'Tunda' })

    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Ingatkan lagi' })
    expect(dialog).toBeInTheDocument()
    expect(
      within(row).queryByText('Pilih waktu pengingat'),
    ).not.toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: /30 menit/i }))

    expect(
      screen.queryByRole('dialog', { name: 'Ingatkan lagi' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Pengingat diatur lagi dalam 30 menit.'),
    ).toBeInTheDocument()
  })

  it('memerlukan alasan sebelum menyimpan dosis dilewati dalam popup', async () => {
    const user = userEvent.setup()
    renderPage()
    const row = screen
      .getByRole('button', { name: 'Salbutamol Inhaler' })
      .closest('article') as HTMLElement

    await user.click(within(row).getByRole('button', { name: 'Lewati' }))
    const dialog = screen.getByRole('dialog', { name: 'Lewati dosis' })
    const submit = within(dialog).getByRole('button', {
      name: 'Simpan dilewati',
    })
    expect(within(row).queryByLabelText('Pilih alasan')).not.toBeInTheDocument()
    expect(submit).toBeDisabled()
    await user.selectOptions(
      within(dialog).getByLabelText('Pilih alasan'),
      'Obat habis',
    )
    await user.click(submit)

    expect(
      screen.queryByRole('dialog', { name: 'Lewati dosis' }),
    ).not.toBeInTheDocument()
    expect(
      within(row).getByText(/Status tercatat: Dilewati/i),
    ).toBeInTheDocument()
  })

  it('menampilkan safety copy dalam popup dan mengembalikan fokus saat batal', async () => {
    const user = userEvent.setup()
    renderPage()
    const rows = screen.getAllByRole('button', { name: 'Metformin HCl' })
    const row = rows[0].closest('article') as HTMLElement
    const trigger = within(row).getByRole('button', { name: 'Tidak Yakin' })

    await user.click(trigger)
    const dialog = screen.getByRole('dialog', {
      name: 'Periksa sebelum tindakan berikutnya',
    })
    expect(
      within(dialog).getByText(/mengganti jadwal yang terlewat/i),
    ).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Kembali' }))

    expect(
      screen.queryByRole('dialog', {
        name: 'Periksa sebelum tindakan berikutnya',
      }),
    ).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('mencatat tidak yakin dari popup sebagai status final', async () => {
    const user = userEvent.setup()
    renderPage()
    const rows = screen.getAllByRole('button', { name: 'Metformin HCl' })
    const row = rows[0].closest('article') as HTMLElement

    await user.click(within(row).getByRole('button', { name: 'Tidak Yakin' }))
    const dialog = screen.getByRole('dialog', {
      name: 'Periksa sebelum tindakan berikutnya',
    })
    await user.click(
      within(dialog).getByRole('button', { name: 'Ya, tandai tidak yakin' }),
    )

    expect(
      within(row).getByText(/Status tercatat: Tidak yakin/i),
    ).toBeInTheDocument()
  })

  it('memfilter jadwal selesai', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Status Final' }))
    expect(
      screen.getByRole('button', { name: 'Allopurinol' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Amlodipine Besylate' }),
    ).not.toBeInTheDocument()
  })
})
