import './styles/index.css'

import HomePage from './pages/Home'
import MainLayout from './components/layout/MainLayout'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <MainLayout>
      <HomePage />
    </MainLayout>
  </React.StrictMode>
)
