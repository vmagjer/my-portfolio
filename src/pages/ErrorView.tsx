import styled from 'styled-components'

function ErrorView() {
  return (
    <Container>
      <h1>404</h1>
      <p>Page not found</p>
    </Container>
  )
}

export default ErrorView

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;  
`

