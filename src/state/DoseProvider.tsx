import {
  type ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { initialOccurrences, medications } from '../data/mockData'
import type { Medication, NewMedicationInput, Profile } from '../domain/types'
import { DoseContext } from './doseContext'
import { createDoseState, doseReducer } from './doseReducer'
import {
  clearPersonalData,
  readPersonalData,
  writePersonalData,
} from './personalStorage'
import { selectDoseViews } from './selectors'

function makeId(prefix: string) {
  const unique =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefix}-${unique}`
}

function makeVisualLabel(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
}

function scheduleToday(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  const scheduledAt = new Date()
  scheduledAt.setHours(hour, minute, 0, 0)
  return scheduledAt
}

function inferStrength(amountPerDose: string) {
  const parenthetical = amountPerDose.match(/\(([^)]+)\)/)?.[1]
  return parenthetical?.trim() || amountPerDose.trim()
}

export function DoseProvider({ children }: { children: ReactNode }) {
  const [personalData, setPersonalData] = useState(readPersonalData)
  const startingOccurrences = personalData.useDemoData
    ? [...initialOccurrences, ...personalData.occurrences]
    : personalData.occurrences
  const [state, dispatch] = useReducer(
    doseReducer,
    startingOccurrences,
    createDoseState,
  )
  const availableMedications = useMemo(
    () => [
      ...(personalData.useDemoData ? medications : []),
      ...personalData.medications,
    ],
    [personalData.medications, personalData.useDemoData],
  )
  const doses = useMemo(
    () => selectDoseViews(state.occurrences, availableMedications),
    [availableMedications, state.occurrences],
  )

  const completeOnboarding = useCallback(
    (name: string, timezone: string) => {
      const shortName = name.trim()
      const profile: Profile = {
        id: personalData.profile.id || makeId('profile'),
        name: `${shortName} (Saya)`,
        shortName,
        timezone,
      }
      const next = {
        ...personalData,
        onboardingComplete: true,
        useDemoData: false,
        profile,
      }

      setPersonalData(next)
      writePersonalData(next)
      dispatch({
        type: 'replaceOccurrences',
        occurrences: next.occurrences,
      })
    },
    [personalData],
  )

  const addMedication = useCallback(
    (input: NewMedicationInput) => {
      const medicationId = makeId('med-local')
      const occurrenceId = makeId('dose-local')
      const scheduledAt = scheduleToday(input.scheduleTime)
      const medication: Medication = {
        id: medicationId,
        name: input.name.trim(),
        brand: input.brand.trim() || 'Tidak dicantumkan',
        strength: input.strength.trim() || inferStrength(input.amountPerDose),
        form: input.form,
        amountPerDose: input.amountPerDose.trim(),
        instructions: input.instructions,
        location: input.location.trim(),
        note: input.note.trim() || 'Tidak ada catatan tambahan.',
        visualLabel: makeVisualLabel(input.name),
        tint: 'teal',
        stock: input.stock,
        stockUnit: input.stockUnit.trim(),
        refillThreshold: input.refillThreshold,
        images: input.image ? [input.image] : [],
      }
      const occurrence = {
        id: occurrenceId,
        medicationId,
        profileName: personalData.profile.name,
        profileTint: 'teal' as const,
        scheduledAt: scheduledAt.toISOString(),
        status:
          scheduledAt.getTime() <= Date.now()
            ? ('unconfirmed' as const)
            : ('scheduled' as const),
      }
      const next = {
        ...personalData,
        medications: [...personalData.medications, medication],
        occurrences: [...personalData.occurrences, occurrence],
      }

      setPersonalData(next)
      writePersonalData(next)
      dispatch({ type: 'addOccurrence', occurrence })
    },
    [personalData],
  )

  const resetPrototype = useCallback(() => {
    clearPersonalData()
    window.location.assign('/onboarding')
  }, [])

  return (
    <DoseContext.Provider
      value={{
        state,
        doses,
        profile: personalData.profile,
        onboardingComplete: personalData.onboardingComplete,
        dispatch,
        completeOnboarding,
        addMedication,
        resetPrototype,
      }}
    >
      {children}
    </DoseContext.Provider>
  )
}
