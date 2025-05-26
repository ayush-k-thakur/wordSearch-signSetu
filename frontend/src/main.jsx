import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WordProvider } from './context/WordContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WordProvider>
      <App />
    </WordProvider>
  </StrictMode>,
)
