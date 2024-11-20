import Summary, { Section as SectionType } from '../components/layout/Summary'

import styled from 'styled-components'

const sections: SectionType[] = [
  { id: 'hero', title: 'Hero' },
  { id: 'experience', title: 'Experience' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]

export default function ProjectView() {
  return (
    <Container>
      <Summary items={sections} />

      <Content>
        <Section id="hero">hero</Section>
        <Section id="experience">experience</Section>
        <Section id="about">about</Section>
        <Section id="contact">contact</Section>
      </Content>
    </Container>
  )
}

const Container = styled.div`
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

const Section = styled.div`
  padding: 20px;
  color: white;
  background: rgba(000 000 000 / 0.3);

  min-height: 360px;
  width: 100%;
  max-width: 800px;

  &:last-of-type {
    min-height: 100vh;
  }
`
