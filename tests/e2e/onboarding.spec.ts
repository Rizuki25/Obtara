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

  await expect(page).toHaveURL(/\/today$/)
  const addDialog = page.getByRole('dialog', {
    name: 'Tambah Obat Rutin Baru',
  })
  await expect(
    addDialog.getByRole('heading', { name: 'Tambah Obat Rutin Baru' }),
  ).toBeVisible()
  await expect(
    addDialog.locator('.popup-locked-owner').getByText('Naya (Saya)'),
  ).toBeVisible()
  await expect(addDialog.getByText(/Gunakan data simulasi/i)).toBeVisible()

  await addDialog.getByRole('button', { name: 'Isi data contoh' }).click()
  await expect(
    addDialog.getByLabel('Nama Obat (Generik/Bahan Aktif) *'),
  ).toHaveValue('Vitamin Contoh')
  await expect(addDialog.getByLabel('Stok Awal Fisik Saat Ini *')).toHaveValue(
    '30',
  )
  await page.screenshot({
    path: isMobile
      ? 'artifacts/obtara-add-medication-mobile.png'
      : 'artifacts/obtara-add-medication-desktop.png',
    fullPage: false,
  })
  await addDialog.locator('.add-medication-dialog-body').evaluate((element) => {
    element.scrollTop = element.scrollHeight
  })
  await page.screenshot({
    path: isMobile
      ? 'artifacts/obtara-add-medication-mobile-bottom.png'
      : 'artifacts/obtara-add-medication-desktop-bottom.png',
    fullPage: false,
  })

  await addDialog
    .getByRole('button', { name: 'Simpan Obat ke Kabinet' })
    .click()
  await expect(page).toHaveURL(/\/today$/)
  await expect(addDialog).toBeHidden()
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
