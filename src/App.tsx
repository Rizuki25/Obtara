import { useCallback, useEffect, useState } from 'react'
import { AppShell } from './components/shell/AppShell'
import { AddMedicationPage } from './pages/AddMedicationPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { TodayPage } from './pages/TodayPage'
import { useDoses } from './state/doseContext'

const knownRoutes = new Set(['/onboarding', '/medications/new', '/today'])

export function App() {
  const { profile, onboardingComplete, completeOnboarding, resetPrototype } =
    useDoses()
  const [path, setPath] = useState(() => window.location.pathname)

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
          navigate('/medications/new')
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

  const content =
    effectivePath === '/medications/new' ? (
      <AddMedicationPage
        onCancel={() => navigate('/today')}
        onSaved={() => navigate('/today')}
      />
    ) : (
      <TodayPage onAddMedication={() => navigate('/medications/new')} />
    )

  return (
    <AppShell
      profileName={profile.name}
      activePath={effectivePath}
      onNavigate={navigate}
      onReset={handleReset}
    >
      {content}
    </AppShell>
  )
}
