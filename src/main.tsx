import './styles/index.css'

import HomePage from './pages/Home'
import MainLayout from './components/layout/MainLayout'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './features/theme/ThemeContext'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  </React.StrictMode>
)
