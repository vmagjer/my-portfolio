import styled from 'styled-components'
import SideMenu from './SideMenu'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {

  return (
    <Container>
      <SideMenu  />

      <Content>
        <Outlet />
        <Footer>footer</Footer>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
`

const Content = styled.div``

const Footer = styled.div`
  background-color: #f5f5f5;
  border-top: 1px solid #e7e7e7;
  padding: 10px 0;
  width: 100%;
`
