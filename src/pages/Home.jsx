import styled from 'styled-components'


const HomePage = () => {
  return (
    <Home>
      <Content>Home</Content>
    </Home>
  )
}

export default HomePage

const Home = styled.div`
  min-height: 100vh;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 100vh;
`
