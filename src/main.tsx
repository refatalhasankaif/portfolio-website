import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Analytics />
        <Loader />
        <App />
    </StrictMode>,
)
