import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { EveryProvider } from './context/index.jsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EveryProvider>
        <App />
      </EveryProvider>
    </BrowserRouter>
  </StrictMode>,
)
