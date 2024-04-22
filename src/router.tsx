import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/Home'
import ErrorView from './pages/ErrorView'
import ProjectView from './pages/ProjectView'

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
          { path: '/project', element: <ProjectView /> },
        ],
      },
    ],
  },
])

export default router
