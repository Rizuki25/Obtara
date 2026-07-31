import { expect, test } from '@playwright/test'

test.describe('desktop', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'Khusus viewport desktop')

  test('menampilkan sidebar dan menyelesaikan konfirmasi dosis', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('/')
    await expect(page).toHaveURL(/\/today$/)
    await expect(page.getByRole('heading', { name: /Selamat datang, Sari/i })).toBeVisible()
    await expect(page.getByLabel('Sidebar aplikasi')).toBeVisible()
    await expect(page.locator('.bottom-nav')).toBeHidden()

    await page.getByRole('button', { name: /Buka detail Metformin 500 mg, pukul 08/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('button', { name: 'Sudah digunakan' }).click()
    await expect(page.getByRole('heading', { name: /Sudah tercatat: Dikonfirmasi/i })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sudah digunakan' })).toHaveCount(0)
    await page.screenshot({ path: 'artifacts/obtara-desktop-confirmed.png', fullPage: true })

    expect(errors).toEqual([])
  })
})

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Khusus viewport mobile')

  test('menampilkan bottom navigation dan detail sebagai bottom sheet', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('/today')
    await expect(page.locator('.bottom-nav')).toBeVisible()
    await expect(page.getByLabel('Sidebar aplikasi')).toBeHidden()

    await page.getByRole('button', { name: /Buka detail Vitamin D3/i }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const box = await dialog.boundingBox()
    const viewport = page.viewportSize()
    expect(box).not.toBeNull()
    expect(viewport).not.toBeNull()
    expect(Math.round((box?.y ?? 0) + (box?.height ?? 0))).toBeGreaterThanOrEqual(
      (viewport?.height ?? 1) - 2,
    )

    await page.getByRole('button', { name: 'Saya tidak yakin' }).click()
    await expect(page.getByText(/mengganti jadwal yang terlewat/i)).toBeVisible()
    await page.screenshot({ path: 'artifacts/obtara-mobile-unsure.png', fullPage: true })

    expect(errors).toEqual([])
  })
})
