import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/common/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Uncomment the line below to render the App component
      <App />
    */}
    <BrowserRouter>
      <Router />
    </BrowserRouter>

  </StrictMode>,
)
