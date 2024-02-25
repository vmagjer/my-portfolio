import styled from 'styled-components'
import Summary from '../components/Summary'

// care for the order of the sections in list and jsx
const sections = [
  { id: 'hero', title: 'Hero' },
  { id: 'experience', title: 'Experience' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]

const HomePage = () => {
  return (
    <>
      <Home>
        <Summary items={sections} />

        <Content>
          <Section id="hero">hero</Section>
          <Section id="experience">experience</Section>
          <Section id="about">about</Section>
          <Section id="contact">contact</Section>
        </Content>
      </Home>
    </>
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
  // align-items: center;
  // justify-content: center;
  min-height: 100vh;
`

const Section = styled.div`
  padding: 20px;
  color: white;
  background: rgba(000 000 000 / 0.3);

  min-height: 80vh;
`
