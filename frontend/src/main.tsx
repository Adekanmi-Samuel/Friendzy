import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initTheme } from './lib/theme'
import { initSmoothScroll } from './lib/smooth-scroll'
import App from './App.tsx'

initTheme();

if (typeof window !== 'undefined') {
  initSmoothScroll();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
