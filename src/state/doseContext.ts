import { createContext, type Dispatch, useContext } from 'react'
import type { DoseView } from '../domain/types'
import type { DoseAction, DoseState } from './doseReducer'

export interface DoseContextValue {
  state: DoseState
  doses: DoseView[]
  dispatch: Dispatch<DoseAction>
}

export const DoseContext = createContext<DoseContextValue | null>(null)

export function useDoses() {
  const context = useContext(DoseContext)
  if (!context) {
    throw new Error('useDoses harus digunakan di dalam DoseProvider')
  }
  return context
}
