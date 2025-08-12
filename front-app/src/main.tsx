import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <App />
    </HashRouter>
)
