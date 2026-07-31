import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { DoseProvider } from './state/DoseProvider'
import './styles/base.css'
import './styles/components.css'

function normalizePrototypeRoute() {
  if (window.location.pathname !== '/today') {
    window.history.replaceState(null, '', '/today')
  }
}

normalizePrototypeRoute()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoseProvider>
      <App />
    </DoseProvider>
  </StrictMode>,
)
