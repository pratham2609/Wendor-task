import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalProvider from './components/Provider/GlobalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
)
