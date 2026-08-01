import type { DoseOccurrence, Medication, Profile } from '../domain/types'
import { mockProfile } from '../data/mockData'

export const PERSONAL_STORAGE_KEY = 'obtara.personal-prototype.v1'

export interface PersonalPrototypeData {
  version: 1
  onboardingComplete: boolean
  useDemoData: boolean
  profile: Profile
  medications: Medication[]
  occurrences: DoseOccurrence[]
}

export function createDefaultPersonalData(): PersonalPrototypeData {
  return {
    version: 1,
    onboardingComplete: false,
    useDemoData: true,
    profile: { ...mockProfile },
    medications: [],
    occurrences: [],
  }
}

export function createDemoPersonalData(): PersonalPrototypeData {
  return {
    version: 1,
    onboardingComplete: true,
    useDemoData: true,
    profile: { ...mockProfile },
    medications: [],
    occurrences: [],
  }
}

export function preparePrototypeSessionFromUrl() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const mode = url.searchParams.get('mode')
  if (mode === 'fresh') {
    clearPersonalData()
    window.history.replaceState(null, '', '/onboarding')
  }
  if (mode === 'demo') {
    writePersonalData(createDemoPersonalData())
    window.history.replaceState(null, '', '/today')
  }
}

export function readPersonalData(): PersonalPrototypeData {
  if (typeof window === 'undefined') return createDefaultPersonalData()

  try {
    const raw = window.localStorage.getItem(PERSONAL_STORAGE_KEY)
    if (!raw) return createDefaultPersonalData()

    const parsed = JSON.parse(raw) as Partial<PersonalPrototypeData>
    if (parsed.version !== 1 || !parsed.profile) {
      return createDefaultPersonalData()
    }

    return {
      version: 1,
      onboardingComplete: parsed.onboardingComplete === true,
      useDemoData: parsed.useDemoData === true,
      profile: {
        ...mockProfile,
        ...parsed.profile,
        timezone: parsed.profile.timezone || mockProfile.timezone,
      },
      medications: Array.isArray(parsed.medications) ? parsed.medications : [],
      occurrences: Array.isArray(parsed.occurrences) ? parsed.occurrences : [],
    }
  } catch {
    return createDefaultPersonalData()
  }
}

export function writePersonalData(data: PersonalPrototypeData) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(PERSONAL_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Prototype tetap dapat dipakai untuk sesi berjalan jika storage diblokir.
  }
}

export function clearPersonalData() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(PERSONAL_STORAGE_KEY)
}
