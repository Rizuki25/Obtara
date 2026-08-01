import { expect, test } from '@playwright/test'
import { useDemoBaseline } from './prototype-state'

test.describe('desktop', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'Khusus viewport desktop')

  test('menampilkan popup tindakan tanpa mengubah tinggi medication row', async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await useDemoBaseline(page)
    await page.goto('/')
    await expect(page).toHaveURL(/\/today$/)
    await expect(
      page.getByRole('heading', { name: 'Jadwal Obat Saya' }),
    ).toBeVisible()
    await expect(
      page.getByLabel('Status simulasi kemampuan browser'),
    ).toBeVisible()
    await expect(page.getByText('Mode prototype · Data simulasi')).toBeVisible()
    await expect(page.getByLabel('Sidebar aplikasi')).toBeVisible()
    await expect(page.locator('.bottom-nav')).toBeHidden()
    await page.screenshot({
      path: 'artifacts/obtara-personal-desktop.png',
      fullPage: true,
    })

    const addMedicationTrigger = page.getByRole('button', {
      name: 'Tambah Obat',
    })
    await addMedicationTrigger.click()
    const addMedicationDialog = page.getByRole('dialog', {
      name: 'Tambah Obat Rutin Baru',
    })
    await expect(addMedicationDialog).toBeVisible()
    await addMedicationDialog.getByRole('button', { name: 'Batal' }).click()
    await expect(addMedicationDialog).toBeHidden()
    await expect(addMedicationTrigger).toBeFocused()

    const metforminRow = page
      .getByRole('button', { name: 'Metformin HCl' })
      .first()
      .locator('xpath=ancestor::article')
    const heightBefore = (await metforminRow.boundingBox())?.height

    await metforminRow.getByRole('button', { name: 'Tunda' }).click()
    const snoozeDialog = page.getByRole('dialog', { name: 'Ingatkan lagi' })
    await expect(snoozeDialog).toBeVisible()
    const heightWhileOpen = (await metforminRow.boundingBox())?.height
    expect(heightWhileOpen).toBe(heightBefore)
    await page.screenshot({
      path: 'artifacts/obtara-desktop-snooze-popup.png',
      fullPage: true,
    })
    await snoozeDialog.getByRole('button', { name: /30 menit/i }).click()
    await expect(snoozeDialog).toBeHidden()

    const salbutamolRow = page
      .getByRole('button', { name: 'Salbutamol Inhaler' })
      .locator('xpath=ancestor::article')
    await salbutamolRow.getByRole('button', { name: 'Lewati' }).click()
    const skipDialog = page.getByRole('dialog', { name: 'Lewati dosis' })
    await expect(skipDialog).toBeVisible()
    await expect(
      skipDialog.getByRole('button', { name: 'Simpan dilewati' }),
    ).toBeDisabled()
    await page.screenshot({
      path: 'artifacts/obtara-desktop-skip-popup.png',
      fullPage: true,
    })
    await skipDialog.getByRole('button', { name: 'Batal' }).click()

    await metforminRow.getByRole('button', { name: 'Tidak Yakin' }).click()
    const unsureDialog = page.getByRole('dialog', {
      name: 'Periksa sebelum tindakan berikutnya',
    })
    await expect(
      unsureDialog.getByText(/mengganti jadwal yang terlewat/i),
    ).toBeVisible()
    await page.screenshot({
      path: 'artifacts/obtara-desktop-unsure-popup.png',
      fullPage: true,
    })
    await page.keyboard.press('Escape')
    await expect(unsureDialog).toBeHidden()
    await expect(
      metforminRow.getByRole('button', { name: 'Tidak Yakin' }),
    ).toBeFocused()

    expect(errors).toEqual([])
  })
})

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Khusus viewport mobile')

  test('menampilkan action popup sebagai bottom sheet', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await useDemoBaseline(page)
    await page.goto('/today')
    await expect(page.locator('.bottom-nav')).toBeVisible()
    await expect(page.getByText('Mode prototype · Data simulasi')).toBeVisible()
    await page.screenshot({
      path: 'artifacts/obtara-personal-mobile.png',
      fullPage: true,
    })

    const salbutamolRow = page
      .getByRole('button', { name: 'Salbutamol Inhaler' })
      .locator('xpath=ancestor::article')
    const heightBefore = (await salbutamolRow.boundingBox())?.height
    await salbutamolRow.getByRole('button', { name: 'Lewati' }).click()

    const dialog = page.getByRole('dialog', { name: 'Lewati dosis' })
    await expect(dialog).toBeVisible()
    const box = await dialog.boundingBox()
    const viewport = page.viewportSize()
    expect(box).not.toBeNull()
    expect(viewport).not.toBeNull()
    expect(
      Math.round((box?.y ?? 0) + (box?.height ?? 0)),
    ).toBeGreaterThanOrEqual((viewport?.height ?? 1) - 2)
    expect((await salbutamolRow.boundingBox())?.height).toBe(heightBefore)
    await page.screenshot({
      path: 'artifacts/obtara-mobile-action-popup.png',
      fullPage: true,
    })

    await dialog.getByRole('button', { name: 'Batal' }).click()
    await expect(dialog).toBeHidden()
    await expect(
      salbutamolRow.getByRole('button', { name: 'Lewati' }),
    ).toBeFocused()
    expect(errors).toEqual([])
  })
})
