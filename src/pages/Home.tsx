import Summary, { Section as SectionType } from '../components/layout/Summary'

import ChatBubble from '../components/ChatBubble'
import Container from '../components/layout/Container'
import HeroSection from '../features/homeSections/HeroSection'
import ProjectsSection from '../features/homeSections/ProjectsSection'
import Timeline from '../components/Timeline'
import TimelineItem from '../components/TimelineItem'
import ferLogo from '../assets/images/fer-logo.png'
import mediatoriumLogo from '../assets/projects/mediatorium/mediatorium-logo.svg'
import profileImage from '../assets/images/profile-picture-happy.jpg'
import styled from 'styled-components'
import verdiLogo from '../assets/projects/verdi/verdi-go.png'

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

      {/* ---------------------------------- PROJECTS */}
      <ProjectsSection id={sections.projects.id} />

      {/* ---------------------------------- TIMELINE */}
      <MyBackgroundSection id={sections.background.id}>
        <SubtleTitle style={{ textAlign: 'center' }}>My background</SubtleTitle>
        <Timeline>
          <MyTimelineItem
            image={verdiLogo}
            color="#0e4539"
            noPadding={true}
            date="2023"
          >
            <h3>Frontend Developer</h3>
            <p>at several companies before and after graduation</p>
            <p>
              Learned several frameworks (Vue, React, Blazor, Ionic) and widely
              used tools (Tailwind, TypeScript, Material UI, Wordpress...).
            </p>
            <p>
              Honed my communication, programming and problem-solving skills.
            </p>
            <p>
              Tested the knowledge from university in real-life applications.
            </p>
          </MyTimelineItem>
          <MyTimelineItem date="2023" image={ferLogo}>
            <h3>Master of Science in Computing</h3>
            <p>
              10/2023 at University of Zagreb, Faculty of Electrical Engineering
              and Computing
            </p>
            <p>Majored software engineering and information systems</p>
            <h4>Coursework</h4>
            <ul>
              <li>Machine Learning</li>
              <li>Business Intelligence</li>
              <li>Social Networks</li>
              <li>Analysis of Massive Datasets</li>
              <li>Heuristic Optimization Methods</li>
              <li>Operations Research</li>
              <li>Linear Algebra</li>
              <li>Advanced Algorithms and Data Structures</li>
            </ul>
            <ul>
              <li>Object-Oriented Design</li>
              <li>Information Systems Development</li>
              <li>Formal Methods in System Design</li>
              <li>Protection and Security of Information Systems</li>
            </ul>
            <ul>
              <li>Technology Entrepreneurship</li>
              <li>Organizational Psychology</li>
              <li>Virtual Environments</li>
              <li>Quantum Computers</li>
            </ul>
            <h4>Thesis</h4>
            <p>
              Interactive aplication in marker-less mobile augmented reality
            </p>
          </MyTimelineItem>
          <MyTimelineItem date="2023" image={mediatoriumLogo}>
            <h3>Frontend Developer</h3>
            <p>at several companies before and after graduation</p>
            <p>
              Learned several frameworks (Vue, React, Blazor, Ionic) and widely
              used tools (Tailwind, TypeScript, Material UI, Wordpress...)
            </p>
            <p>
              Honed my skills in communication, programming and problem-solving
            </p>
            <p>
              Tested the knowledge from university in real-life applications
            </p>
          </MyTimelineItem>
          <MyTimelineItem date="2023" image={mediatoriumLogo}>
            <h3>Frontend Developer</h3>
            <p>at several companies before and after graduation</p>
            <p>
              Learned several frameworks (Vue, React, Blazor, Ionic) and widely
              used tools (Tailwind, TypeScript, Material UI, Wordpress...)
            </p>
            <p>
              Honed my skills in communication, programming and problem-solving
            </p>
            <p>
              Tested the knowledge from university in real-life applications
            </p>
          </MyTimelineItem>
          <MyTimelineItem date="2023" image={ferLogo}>
            <h3>Bachelor of Science in Computing</h3>
            <p>
              10/2020 at University of Zagreb, Faculty of Electrical Engineering
              and Computing
            </p>
            <p>Majored software engineering and information systems</p>
            <p>
              Coursework included physics, math, computer science and
              information science
            </p>
          </MyTimelineItem>
        </Timeline>
      </MyBackgroundSection>

      {/* ---------------------------------- CONTACT */}
      <Container id={sections.contact.id}>
        <ContactSection>
          <ChatBubble avatarSrc={profileImage} avatarPosition="right">
            <p>
              Hey can we get in <h2>Contact</h2> about an opportunity for you?
            </p>
          </ChatBubble>
          <ChatBubble avatarSrc={profileImage} avatarPosition="left">
            <p>Sure! I&apos;d love to hear more about it.</p>
          </ChatBubble>
          <ChatBubble avatarSrc={profileImage} avatarPosition="right">
            <p>It&apos;s cool, fresh, innovative and the team is passionate.</p>
          </ChatBubble>
          <ChatBubble avatarSrc={profileImage} avatarPosition="left">
            <p>Sounds awesome! Let&apos;s get in touch.</p>
            <p>
              Send me a message at my:
              <ul>
                <li>Email</li>
                <li>LinkedIn</li>
                <li>Discord</li>
                <li>Github</li>
              </ul>
            </p>
          </ChatBubble>
        </ContactSection>
      </Container>
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

// ###################### BACKGROUND
const MyBackgroundSection = styled(Container)`
  z-index: 1;
  padding: 2rem 1rem;
  background-color: #b7b7b7;
`

const MyTimelineItem = styled(TimelineItem)`
  ul {
    padding-left: 1rem;
    li {
      list-style-type: square;
    }
  }
`
// ###################### CONTACT

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem 1rem 2rem 0.75rem;

  h2 {
    margin: 0;
  }
`
