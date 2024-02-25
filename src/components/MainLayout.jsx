import PropTypes from 'prop-types'
import './MainLayout.css'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

const Nav = styled.div`
  position: sticky;
  top: 0;

  border-bottom: 1px solid #e7e7e7;
  padding: 10px 0;
  width: 100%;
  height: 40px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: gray;
`

const Content = styled.div`
  flex: 1;
`

const Footer = styled.div`
  background-color: #f5f5f5;
  border-top: 1px solid #e7e7e7;
  padding: 10px 0;
  width: 100%;
`

export default function MainLayout({ children }) {
  return (
    <Container className="main-layout">
      <Nav className="top-nav">
        <div className="left"></div>
        <div className="right">Menu</div>
      </Nav>
      <Content className="content">{children}</Content>
      <Footer className="footer">footer</Footer>
    </Container>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
