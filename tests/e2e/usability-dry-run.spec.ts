import { expect, test, type Locator, type Page } from '@playwright/test'

function doseRow(page: Page, medicationName: string, occurrence = 0): Locator {
  return page
    .getByRole('button', { name: medicationName, exact: true })
    .nth(occurrence)
    .locator('xpath=ancestor::article')
}

test.describe('rehearsal paket usability', () => {
  test.skip(
    ({ isMobile }) => Boolean(isMobile),
    'Urutan instrumen direhearsalkan di desktop',
  )

  test('T01–T12 dapat dijalankan berurutan dan di-reset dengan reload', async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('/today')

    // T01–T02: peserta dapat menemukan status yang perlu tindakan dan batas maknanya.
    await expect(page.getByText('Jatuh Tempo Sekarang')).toBeVisible()
    await expect(
      page.getByText(
        /OBTARA belum menerima catatan, bukan berarti obat pasti belum digunakan/i,
      ),
    ).toBeVisible()

    // T03–T04: detail Amlodipine, label demo, dan lokasi fisik tersedia bersama.
    await page
      .getByRole('button', { name: 'Amlodipine Besylate', exact: true })
      .click()
    const detail = page.getByRole('dialog', { name: 'Amlodipine Besylate' })
    await expect(detail).toBeVisible()
    await expect(detail.getByText('FOTO & KEMASAN OBAT (DEMO)')).toBeVisible()
    await expect(
      detail.getByText(/Kotak Obat Utama · Laci 1 \(Label Merah\)/),
    ).toBeVisible()
    await detail.getByRole('button', { name: 'Tutup detail dosis' }).click()

    // T05: status final tercatat satu kali dan semua tindakan final kedua hilang.
    const amlodipine = doseRow(page, 'Amlodipine Besylate')
    await amlodipine
      .getByRole('button', { name: 'Dikonfirmasi (Sudah Digunakan)' })
      .click()
    await expect(amlodipineFinalState(amlodipine)).toBeVisible()
    await expect(
      amlodipine.getByRole('button', {
        name: 'Dikonfirmasi (Sudah Digunakan)',
      }),
    ).toHaveCount(0)

    // T06: jadwal Metformin pukul 19.00 ditunda secara independen dari T07.
    const metforminNight = doseRow(page, 'Metformin HCl', 1)
    await metforminNight.getByRole('button', { name: 'Tunda' }).click()
    const snooze = page.getByRole('dialog', { name: 'Ingatkan lagi' })
    await snooze.getByRole('button', { name: /30 menit/i }).click()
    await expect(metforminNight.getByText('Ditunda +30m')).toBeVisible()

    // T07: Salbutamol dapat dilewati tanpa reset setelah T06.
    const salbutamol = doseRow(page, 'Salbutamol Inhaler')
    await salbutamol.getByRole('button', { name: 'Lewati' }).click()
    const skip = page.getByRole('dialog', { name: 'Lewati dosis' })
    await skip.getByLabel('Pilih alasan').selectOption({ label: 'Obat habis' })
    await skip.getByRole('button', { name: 'Simpan dilewati' }).click()
    await expect(
      salbutamol.getByText('Status tercatat: Dilewati'),
    ).toBeVisible()

    // T08: jadwal Metformin pukul 13.00 menjadi Tidak Yakin dengan safety copy.
    const metforminNoon = doseRow(page, 'Metformin HCl', 0)
    await metforminNoon.getByRole('button', { name: 'Tidak Yakin' }).click()
    const unsure = page.getByRole('dialog', {
      name: 'Periksa sebelum tindakan berikutnya',
    })
    await expect(
      unsure.getByText(
        /^Jangan mengambil dosis tambahan untuk mengganti jadwal/i,
      ),
    ).toBeVisible()
    await unsure.getByRole('button', { name: 'Ya, tandai tidak yakin' }).click()
    await expect(
      metforminNoon.getByText('Status tercatat: Tidak yakin'),
    ).toBeVisible()

    // T09–T10: kedua filter bekerja, lalu jadwal 13.00 tetap dapat diidentifikasi.
    await page.getByRole('button', { name: 'Perlu Tindakan' }).click()
    await expect(page.locator('.dose-card')).toHaveCount(1)
    await page.getByRole('button', { name: 'Status Final' }).click()
    await expect(page.locator('.dose-card')).toHaveCount(4)
    await page.getByRole('button', { name: 'Semua Jadwal (5)' }).click()
    await expect(page.locator('.dose-card')).toHaveCount(5)
    await expect(
      page
        .locator('.dose-card')
        .filter({ hasText: '13.00 WIB' })
        .getByText('Rizqie (Saya)'),
    ).toBeVisible()

    // T11–T12: tindakan dan disclosure simulasi tersedia pada baseline setelah reset.
    await page.reload()
    const baselineMetformin = doseRow(page, 'Metformin HCl', 0)
    for (const name of [
      'Dikonfirmasi (Sudah Digunakan)',
      'Tunda',
      'Lewati',
      'Tidak Yakin',
    ]) {
      await expect(
        baselineMetformin.getByRole('button', { name }),
      ).toBeVisible()
    }
    await expect(page.getByText('Mode prototype · Data simulasi')).toBeVisible()
    await expect(page.getByText('Web Push (simulasi)')).toBeVisible()
    await expect(page.getByText('Kamera (simulasi)')).toBeVisible()
    await expect(
      page.getByRole('button', { name: /Tambah Obat/i }),
    ).toBeDisabled()
    await expect(
      page.getByLabel(/Profil aktif: Rizqie, mode pribadi/i),
    ).toBeVisible()
    await expect(
      page.getByText('Belum Dikonfirmasi', { exact: true }),
    ).toBeVisible()
    await expect(
      page
        .getByLabel('Sidebar aplikasi')
        .getByRole('button', { name: 'Obat Saya' }),
    ).toBeDisabled()
    await expect(page.getByRole('button', { name: /Caregiver/i })).toHaveCount(
      0,
    )

    expect(errors).toEqual([])
  })
})

function amlodipineFinalState(row: Locator) {
  return row.getByText(/Stok otomatis berkurang 1 unit/)
}
