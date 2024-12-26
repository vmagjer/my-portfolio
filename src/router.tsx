import ErrorView from './pages/ErrorView'
import HomePage from './pages/Home'
import MainLayout from './components/layout/MainLayout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        errorElement: <ErrorView />,
        children: [
          { index: true, element: <HomePage /> },
        ],
      },
    ],
  },
])

export default router

