import NavBar, { Section as SectionType } from '../components/layout/NavBar'

import BackgroundSection from '../features/homeSections/BackgroundSection'
import ContactSection from '../features/homeSections/ContactSection'
import Container from '../components/layout/Container'
import HeroSection from '../features/homeSections/HeroSection'
import ProjectsSection from '../features/homeSections/ProjectsSection'
import styled from 'styled-components'

type SectionID = 'about' | 'projects' | 'background' | 'contact'
// store the section ids here for navigation jumps
const sections: Record<SectionID, SectionType> = {
  // hello: { id: 'hello', title: 'Vlatko' }, // catch attention
  about: { id: 'about', title: 'About' }, // convey approachability, passion, personality
  projects: { id: 'projects', title: 'Projects' }, // impress with experience
  background: { id: 'background', title: 'My Work' }, // prove experience, knowledge
  contact: { id: 'contact', title: 'Contact' }, // simplify work of user
}

export default function HomePage() {
  return (
    <Root>
      <NavBar items={Object.values(sections)}></NavBar>

      <HeroSection id={sections.about.id} />

      <ProjectsSection id={sections.projects.id} />
      <BackgroundSection id={sections.background.id} />

      <ContactSection id={sections.contact.id} />
    </Root>
  )
}

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: var(--section-surface);
`

const GapContainer = styled(Container)`
  z-index: 1;
  height: 128px;
  display: flex;
  align-items: center;
`

const SuperTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-title);
`