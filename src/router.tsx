import { BrokenGlassProjectView } from './pages/projects/BrokenGlassProjectView'
import { Card3DProjectView } from './pages/projects/Card3DProjectView'
import { DigitalRainProjectView } from './pages/projects/DigitalRainProjectView'
import ErrorView from './pages/ErrorView'
import HomePage from './pages/Home'
import MainLayout from './components/layout/MainLayout'
import ProjectView from './pages/ProjectView'
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
          { path: '/project', element: <ProjectView /> },
        ],
      },
    ],
  },
  {
    path: '/projects/brokenGlass',
    element: <BrokenGlassProjectView />,
  },
  {
    path: '/projects/digitalRain',
    element: <DigitalRainProjectView />,
  },
  {
    path: '/projects/card3D',
    element: <Card3DProjectView />,
  }
])

export default router

