import type { Page } from '@playwright/test'

export async function useDemoBaseline(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'obtara.personal-prototype.v1',
      JSON.stringify({
        version: 1,
        onboardingComplete: true,
        useDemoData: true,
        profile: {
          id: 'profile-rizqie',
          name: 'Rizqie (Saya)',
          shortName: 'Rizqie',
          timezone: 'Asia/Jakarta',
        },
        medications: [],
        occurrences: [],
      }),
    )
  })
}
