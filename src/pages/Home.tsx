import Summary, { Section as SectionType } from '../components/layout/Summary'

import BackgroundSection from '../features/homeSections/BackgroundSection'
import ContactSection from '../features/homeSections/ContactSection'
import Container from '../components/layout/Container'
import HeroSection from '../features/homeSections/HeroSection'
import ProjectsSection from '../features/homeSections/ProjectsSection'
import styled from 'styled-components'

type Section = 'hello' | 'about' | 'projects' | 'background' | 'contact'

// store the section ids here for navigation jumps
const sections: Record<Section, SectionType> = {
  hello: { id: 'hello', title: 'Hello' }, // catch attention
  about: { id: 'about', title: 'About' }, // convey approachability, passion, personality
  projects: { id: 'projects', title: 'Projects' }, // impress with experience
  background: { id: 'background', title: 'Background' }, // prove experience, knowledge
  contact: { id: 'contact', title: 'Contact' }, // simplify work of user
}

export default function HomePage() {
  return (
    <Root>
      <Summary items={Object.values(sections)}></Summary>

      <HeroSection />

      {/* ---------------------------------- ABOUT */}
      <AboutSection>
        <SubtleTitle className="hug">Hi there!</SubtleTitle>
        <p className="hug">I{"'"}m Vlatko Magjer from Croatia.</p>
        <p>
          I love programming, playing board games, reading fantastic novels and
          learning new things!
        </p>
        <p>Feel free to get in touch with me or look at my past work below.</p>
      </AboutSection>

      {/* ---------------------------------- PORTFOLIO */}
      <TitleSection>
        <Title className="quicksand">Portfolio</Title>
      </TitleSection>

      <ProjectsSection id={sections.projects.id} />
      <BackgroundSection id={sections.background.id} />

      {/* ---------------------------------- CONTACT */}
      <ContactSection />
    </Root>
  )
}

const TitleSection = styled(Container)`
  z-index: 1;
`

const Title = styled.h2`
  margin: 0;
  padding: 3rem 0;
  color: #fff;
  text-align: center;
`

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
`

// ###################### COMMON
const SubtleTitle = styled.h2`
  color: #666;
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const AboutSection = styled(Container)`
  z-index: 1;
  background-color: #e3e3e3;
  color: #000;
  padding: 2rem 1rem;
`
