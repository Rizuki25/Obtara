import { expect, test } from '@playwright/test'

test.describe('desktop', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'Khusus viewport desktop')

  test('menampilkan dashboard referensi dan modal foto obat', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('/')
    await expect(page).toHaveURL(/\/today$/)
    await expect(
      page.getByRole('heading', { name: 'Jadwal Obat & Status Dosis' }),
    ).toBeVisible()
    await expect(page.getByLabel('Status simulasi kemampuan browser')).toBeVisible()
    await expect(page.getByText('Mode prototype · Data simulasi')).toBeVisible()
    await expect(page.getByText(/Semua nama, jadwal, foto, status, dan angka/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Semua Keluarga/i })).toBeDisabled()
    await expect(page.getByRole('button', { name: /Tambah Obat Rutin/i })).toBeDisabled()
    await expect(page.getByLabel('Sidebar aplikasi')).toBeVisible()
    await expect(page.locator('.bottom-nav')).toBeHidden()

    await page.getByRole('button', {
      name: /Buka detail Amlodipine Besylate 10 mg, pukul 07/i,
    }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Amlodipine Besylate' }),
    ).toBeVisible()
    await expect(page.getByRole('dialog').locator('.gallery-item')).toHaveCount(2)
    await page.screenshot({ path: 'artifacts/obtara-desktop-modal.png', fullPage: true })

    await page.getByRole('button', { name: 'Tutup detail dosis' }).click()
    const row = page.getByRole('button', { name: 'Amlodipine Besylate' }).locator('..')
    await row.getByRole('button', { name: 'Dikonfirmasi (Sudah Minum)' }).click()
    await expect(row.getByText(/Stok otomatis berkurang 1 unit/i)).toBeVisible()
    await page.screenshot({ path: 'artifacts/obtara-desktop-dashboard.png', fullPage: true })

    expect(errors).toEqual([])
  })
})

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Khusus viewport mobile')

  test('menampilkan dashboard mobile dan modal sebagai bottom sheet', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('/today')
    await expect(page.locator('.bottom-nav')).toBeVisible()
    await expect(page.getByText('Mode prototype · Data simulasi')).toBeVisible()
    await expect(page.getByText(/Semua nama, jadwal, foto, status, dan angka/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Tambah Obat Rutin/i })).toBeDisabled()
    await expect(page.getByLabel('Sidebar aplikasi')).toBeHidden()
    await expect(
      page.getByRole('heading', { name: 'Jadwal Obat & Status Dosis' }),
    ).toBeVisible()

    await page.getByRole('button', {
      name: /Buka detail Amlodipine Besylate/i,
    }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const box = await dialog.boundingBox()
    const viewport = page.viewportSize()
    expect(box).not.toBeNull()
    expect(viewport).not.toBeNull()
    expect(Math.round((box?.y ?? 0) + (box?.height ?? 0))).toBeGreaterThanOrEqual(
      (viewport?.height ?? 1) - 2,
    )
    await page.screenshot({ path: 'artifacts/obtara-mobile-modal.png', fullPage: true })

    expect(errors).toEqual([])
  })
})
