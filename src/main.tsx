import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { DoseProvider } from './state/DoseProvider'
import './styles/base.css'
import './styles/components.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoseProvider>
      <App />
    </DoseProvider>
  </StrictMode>,
)
