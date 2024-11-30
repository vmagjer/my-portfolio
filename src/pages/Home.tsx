import Summary, { Section as SectionType } from '../components/layout/Summary'
import { useEffect, useRef, useState } from 'react'

import AvatarImage from '../components/AvatarImage'
import ChatBubble from '../components/ChatBubble'
import Container from '../components/layout/Container'
import InteractiveCanvasEffect from '../components/InteractiveCanvasEffect'
import { ProjectItem } from '../components/ProjectItem'
import SwipeUp from '../assets/SwipeUp'
import Timeline from '../components/Timeline'
import TimelineItem from '../components/TimelineItem'
import data from '../assets/data'
import ferLogo from '../assets/images/fer-logo.png'
import mediatoriumLogo from '../assets/projects/mediatorium/mediatorium-logo.svg'
import profileImage from '../assets/images/profile-picture-happy.jpg'
import styled from 'styled-components'
import verdiGoShowcase from '../assets/projects/verdi/verdi-go-showcase.png'
import verdiLogo from '../assets/projects/verdi/verdi-go.png'
import webShopShowcase from '../assets/projects/verdi/web-shop-showcase.png'

type Section = 'hello' | 'about' | 'projects' | 'background' | 'contact'

// store the section ids here for navigation jumps
const sections: Record<Section, SectionType> = {
  hello: { id: 'hello', title: 'Hello' }, // catch attention
  about: { id: 'about', title: 'About' }, // convey approachability, passion, personality
  projects: { id: 'projects', title: 'Projects' }, // impress with experience
  background: { id: 'background', title: 'Background' }, // prove experience, knowledge
  contact: { id: 'contact', title: 'Contact' }, // simplify work of user
}

// provide a background for the transparent canvas effect
const InteractiveBgContainer = styled.div`
  position: fixed;
  inset: 0;
  /* background: #080908; */
  background: #000;
  height: 120lvh;
  z-index: -100000;
`

export default function HomePage() {
  const foregroundCanvasRef = useRef<HTMLDivElement>(null)

  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    let hasScrolled = false

    const showScrollIndicatorOnTimeout = setTimeout(() => {
      if (!hasScrolled) return

      setShowScrollIndicator(true)
    }, 3000)

    function handleScroll() {
      hasScrolled = true
      setShowScrollIndicator(false)
      paralaxEffectOnHeroBackground()
    }

    function paralaxEffectOnHeroBackground() {
      if (!foregroundCanvasRef.current) return

      const scrollY = window.scrollY
      foregroundCanvasRef.current.style.transform = `translateY(${
        scrollY * 0.6
      }px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(showScrollIndicatorOnTimeout)
    }
  }, [])

  return (
    <Root>
      <Summary items={Object.values(sections)}></Summary>

      <InteractiveBgContainer></InteractiveBgContainer>
      <div ref={foregroundCanvasRef}>
        <InteractiveCanvasEffect />
      </div>
      {/* ---------------------------------- HERO */}
      <HeroSection id={sections.hello.id}>
        <div className="hero-content">
          <AvatarImage src={profileImage} size="large" />
          <h1 className="quicksand">Vlatko Magjer</h1>
          <p>Data Scientist, Frontend Developer, and Software Engineer</p>
          <p>mail linkedin github</p>
        </div>
        <SwipeUpIndicator
          style={{
            opacity: showScrollIndicator ? '1' : '0',
            transition: 'all 1s',
          }}
        />
      </HeroSection>

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
      <ProjectsSection id={sections.projects.id}>
        <SubtleTitle>Top Projects</SubtleTitle>
        <Projects>
          <ProjectItem
            title="Web shop for fresh local produce"
            image={webShopShowcase}
            reverse={false}
          >
            <p>
              Worked in a team of 4 to redesign a web shop for local produce. We
              refactored the stinky old code and introduced new features to
              improve the UX.
            </p>
          </ProjectItem>
          <ProjectItem
            title="Crowdsourced delivery solution"
            image={verdiGoShowcase}
            reverse={false}
          >
            <p>
              We made a mobile app to serve the shop{"'"}s delivery needs by
              crowdsourcing delivery drivers.
            </p>
          </ProjectItem>
          <ProjectItem
            title="Exploring frontend technologies"
            image={data.highlightedProjects[1].image}
            reverse={true}
          >
            <p>
              This is me testing the capabilities of CSS and JS as well as my
              own capabilities.
            </p>
            <p>I developed visually interesting componets like:</p>
            <ul>
              <li>the Matrix digital shower</li>
              <li>a graph visualization tool</li>
              <li>scroll-bound animation</li>
              <li>a 3D card component</li>
              <li>full screen menu resembling a broken glass pane</li>
            </ul>
          </ProjectItem>
        </Projects>
      </ProjectsSection>

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

const SwipeUpIndicator = styled(SwipeUp)`
  width: 80px;
  height: 80px;

  fill: black;
  stroke: #fff;
  stroke-width: 8;
  opacity: 0.7;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`
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
// ###################### HERO
const HeroSection = styled(Container)`
  height: 100vh;
  color: #fff;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .hero-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
  }
`

const AboutSection = styled(Container)`
  z-index: 1;
  background-color: #e3e3e3;
  color: #000;
  padding: 2rem 1rem;
`

// ###################### PROJECTS
const ProjectsSection = styled(Container)`
  z-index: 1;
  padding: 2rem 1rem 3rem;
  background-color: #e3e3e3;
  container-name: projects-section;

  ul {
    padding-left: 1rem;
  }
`

const Projects = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
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
