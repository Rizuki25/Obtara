import { useCallback, useEffect, useState } from 'react'
import { AddMedicationDialog } from './components/medication/AddMedicationDialog'
import { AppShell } from './components/shell/AppShell'
import { OnboardingPage } from './pages/OnboardingPage'
import { TodayPage } from './pages/TodayPage'
import { useDoses } from './state/doseContext'

const knownRoutes = new Set(['/onboarding', '/today'])

export function App() {
  const { profile, onboardingComplete, completeOnboarding, resetPrototype } =
    useDoses()
  const [path, setPath] = useState(() => window.location.pathname)
  const [addMedicationOpen, setAddMedicationOpen] = useState(
    () => window.location.pathname === '/medications/new',
  )
  const [addMedicationTrigger, setAddMedicationTrigger] =
    useState<HTMLButtonElement | null>(null)

  const navigate = useCallback((nextPath: string, replace = false) => {
    if (replace) window.history.replaceState(null, '', nextPath)
    else window.history.pushState(null, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const effectivePath = !onboardingComplete
    ? '/onboarding'
    : path === '/onboarding' || !knownRoutes.has(path)
      ? '/today'
      : path

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (window.location.pathname !== effectivePath) {
      window.history.replaceState(null, '', effectivePath)
    }
  }, [effectivePath])

  if (!onboardingComplete) {
    return (
      <OnboardingPage
        onComplete={(name, timezone) => {
          completeOnboarding(name, timezone)
          navigate('/today')
          setAddMedicationOpen(true)
        }}
      />
    )
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Hapus semua data prototype di browser ini dan ulangi onboarding?',
    )
    if (confirmed) resetPrototype()
  }

  return (
    <AppShell
      profileName={profile.name}
      activePath={effectivePath}
      onNavigate={navigate}
      onReset={handleReset}
    >
      <TodayPage
        onAddMedication={(trigger) => {
          setAddMedicationTrigger(trigger)
          setAddMedicationOpen(true)
        }}
      />
      <AddMedicationDialog
        open={addMedicationOpen}
        trigger={addMedicationTrigger}
        onClose={() => setAddMedicationOpen(false)}
        onSaved={() => setAddMedicationOpen(false)}
      />
    </AppShell>
  )
}
