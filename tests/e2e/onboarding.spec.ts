import { expect, test } from '@playwright/test'

test('onboarding pribadi menyimpan obat pertama dan dapat di-reset', async ({
  page,
  isMobile,
}) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page).toHaveURL(/\/onboarding$/)
  await expect(
    page.getByRole('heading', { name: 'Atur OBTARA untuk saya' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Lanjut tambah obat' }),
  ).toBeDisabled()
  await expect(page.getByText(/tidak perlu membuat keluarga/i)).toBeVisible()
  await page.screenshot({
    path: isMobile
      ? 'artifacts/obtara-onboarding-mobile.png'
      : 'artifacts/obtara-onboarding-desktop.png',
    fullPage: true,
  })

  await page.getByLabel('Nama panggilan').fill('Naya')
  await page
    .getByRole('checkbox', {
      name: /bukan pengganti instruksi tenaga kesehatan/i,
    })
    .check()
  await page.getByRole('button', { name: 'Lanjut tambah obat' }).click()

  await expect(page).toHaveURL(/\/medications\/new$/)
  await expect(
    page.getByRole('heading', { name: 'Tambah obat saya' }),
  ).toBeVisible()
  await expect(
    page.locator('.locked-profile-field').getByText('Naya (Saya)'),
  ).toBeVisible()
  await expect(page.getByText(/Gunakan data simulasi/i)).toBeVisible()

  await page.getByRole('button', { name: 'Isi data contoh' }).click()
  await expect(page.getByLabel('Nama obat *')).toHaveValue('Vitamin Contoh')
  await expect(page.getByLabel('Stok awal *')).toHaveValue('10')
  await page.screenshot({
    path: isMobile
      ? 'artifacts/obtara-add-medication-mobile.png'
      : 'artifacts/obtara-add-medication-desktop.png',
    fullPage: true,
  })

  await page
    .getByRole('button', { name: 'Simpan obat & lihat Hari Ini' })
    .click()
  await expect(page).toHaveURL(/\/today$/)
  await expect(
    page.getByRole('button', { name: 'Vitamin Contoh', exact: true }),
  ).toBeVisible()
  await expect(
    page.locator('.dose-card').getByText('Naya (Saya)'),
  ).toBeVisible()
  await expect(page.getByText('Amlodipine Besylate')).toHaveCount(0)

  await page.reload()
  await expect(page).toHaveURL(/\/today$/)
  await expect(
    page.getByRole('button', { name: 'Vitamin Contoh', exact: true }),
  ).toBeVisible()

  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Mulai ulang prototype' }).click()
  await expect(page).toHaveURL(/\/onboarding$/)
  await expect(
    page.getByRole('heading', { name: 'Atur OBTARA untuk saya' }),
  ).toBeVisible()
  expect(errors).toEqual([])
})
