import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from '@/components/ui/sonner'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton/>
  </SocketProvider>
    
  // </StrictMode>,
)
