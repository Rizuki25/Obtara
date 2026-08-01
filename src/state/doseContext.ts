import { createContext, type Dispatch, useContext } from 'react'
import type { DoseView, NewMedicationInput, Profile } from '../domain/types'
import type { DoseAction, DoseState } from './doseReducer'

export interface DoseContextValue {
  state: DoseState
  doses: DoseView[]
  profile: Profile
  onboardingComplete: boolean
  dispatch: Dispatch<DoseAction>
  completeOnboarding: (name: string, timezone: string) => void
  addMedication: (input: NewMedicationInput) => void
  resetPrototype: () => void
}

export const DoseContext = createContext<DoseContextValue | null>(null)

export function useDoses() {
  const context = useContext(DoseContext)
  if (!context) {
    throw new Error('useDoses harus digunakan di dalam DoseProvider')
  }
  return context
}
