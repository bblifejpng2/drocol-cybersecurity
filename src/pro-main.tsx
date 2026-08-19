import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { DrocolProPage } from './pages/DrocolProPage'

createRoot(document.getElementById('pro-root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DrocolProPage />
    </BrowserRouter>
  </StrictMode>,
)
