import NavBar, { Section as SectionType } from '../components/layout/NavBar'

import BackgroundSection from '../features/homeSections/BackgroundSection'
import ContactSection from '../features/homeSections/ContactSection'
import HeroSection from '../features/homeSections/HeroSection'
import styled from 'styled-components'

type SectionID = 'about' | 'background' | 'contact'
// store the section ids here for navigation jumps
const sections: Record<SectionID, SectionType> = {
  about: { id: 'about', title: 'About' }, // convey approachability, passion, personality
  background: { id: 'background', title: 'My Work' }, // prove experience, knowledge
  contact: { id: 'contact', title: 'Contact' }, // simplify work of user
}

export default function HomePage() {
  return (
    <Root>
      <NavBar items={Object.values(sections)}></NavBar>

      <HeroSection id={sections.about.id} />

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
