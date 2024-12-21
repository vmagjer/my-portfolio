import NavBar, { Section as SectionType } from '../components/layout/NavBar'

import BackgroundSection from '../features/homeSections/BackgroundSection'
import ContactSection from '../features/homeSections/ContactSection'
import Container from '../components/layout/Container'
import HeroSection from '../features/homeSections/HeroSection'
import ProjectsSection from '../features/homeSections/ProjectsSection'
import styled from 'styled-components'

type SectionID =  'about' | 'projects' | 'background' | 'contact'
// store the section ids here for navigation jumps
const sections: Record<SectionID, SectionType> = {
  // hello: { id: 'hello', title: 'Vlatko' }, // catch attention
  about: { id: 'about', title: 'About' }, // convey approachability, passion, personality
  projects: { id: 'projects', title: 'Top Projects' }, // impress with experience
  background: { id: 'background', title: 'Background' }, // prove experience, knowledge
  contact: { id: 'contact', title: 'Contact' }, // simplify work of user
}

export default function HomePage() {
  return (
    <Root>
      <NavBar items={Object.values(sections)}></NavBar>

      <HeroSection id={sections.about.id} />

      <AboutSection >
        <Title>About me</Title>
        <Subtitle>Hi, I&apos;m Vlatko Magjer from Croatia!</Subtitle>
        <p>
          I love <b>programming</b>, exploring new ideas, and feeding my <b>curiosity</b> —
          whether through video games, fantasy novels, or <b>learning</b> something
          new.
        </p>
        <p>Feel free to reach out or look at my past work below!</p>
      </AboutSection>

      <TitleSection>
        <SuperTitle className="quicksand">Portfolio</SuperTitle>
      </TitleSection>

      <ProjectsSection id={sections.projects.id} />
      <BackgroundSection id={sections.background.id} />

      <TitleSection>
        <SuperTitle className="quicksand">Contact</SuperTitle>
      </TitleSection>

      <ContactSection id={sections.contact.id} />
    </Root>
  )
}

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const AboutSection = styled(Container)`
  z-index: 1;
  background-color: var(--neutral-900);
  color: var(--color-body);
  padding: 32px 16px;
`

const TitleSection = styled(Container)`
  z-index: 1;
  height: 128px;
  display: flex;
  align-items: center;
`

const SuperTitle = styled.p`
  margin: 0;
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-dark-title);
`

const Title = styled.h2`
  color: var(--color-title);
`

const Subtitle = styled.p`
  color: var(--color-subtitle);
  font-weight: normal;
  margin-top: 0;
`
