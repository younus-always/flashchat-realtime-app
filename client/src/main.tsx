import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from 'sonner'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <App />
        <Toaster position='bottom-right' richColors />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
