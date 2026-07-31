import { type ReactNode, useMemo, useReducer } from 'react'
import { initialOccurrences, medications } from '../data/mockData'
import { DoseContext } from './doseContext'
import { createDoseState, doseReducer } from './doseReducer'
import { selectDoseViews } from './selectors'

export function DoseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    doseReducer,
    initialOccurrences,
    createDoseState,
  )
  const doses = useMemo(
    () => selectDoseViews(state.occurrences, medications),
    [state.occurrences],
  )

  return (
    <DoseContext.Provider value={{ state, doses, dispatch }}>
      {children}
    </DoseContext.Provider>
  )
}
