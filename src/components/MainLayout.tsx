import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function MainLayout() {
  return (
    <Container>
      <Outlet />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  gap: 20px;
`
