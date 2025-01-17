import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { EveryProvider } from './context/index.jsx';
import { BrowserRouter } from 'react-router-dom';
import { TechProvider } from './context/techContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EveryProvider>
        <TechProvider>
          <App />
        </TechProvider>
      </EveryProvider>
    </BrowserRouter>
  </StrictMode>,
)
