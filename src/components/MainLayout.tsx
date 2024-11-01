import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function MainLayout() {
  return (
    <Container>
      <LeftColumn></LeftColumn>

      <Content>
        <Outlet />
        <Footer>
          footer
          <br />
          Icons by{' '}
          <a target="_blank" href="https://icons8.com" rel="noreferrer">
            Icons8
          </a>
        </Footer>
      </Content>

      <RightColumn></RightColumn>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1600px) {
    justify-content: space-between;
  }
`

const LeftColumn = styled.div`
  min-width: 300px;
  width: 360px;
  color: white;

  @media (max-width: calc(360px + 420px)) {
    display: none;
  }
`
const Content = styled.div`
  flex-basis: 1200px;
`

const RightColumn = styled.div`
  width: 360px;
  color: white;

  @media (max-width: calc(360px * 2 + 420px)) {
    display: none;
  }
`

const Footer = styled.div`
  padding: 10px 0;
  width: 100%;
`
