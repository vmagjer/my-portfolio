import Summary, { Section as SectionType } from '../components/layout/Summary'
import Timeline, { TimelineItem } from '../components/Timeline'
import { useEffect, useRef, useState } from 'react'

import AvatarImage from '../components/AvatarImage'
import InteractiveCanvasEffect from '../components/InteractiveCanvasEffect'
import { ProjectItem } from '../components/ProjectItem'
import Section from '../components/layout/Section'
import SwipeUp from '../assets/SwipeUp'
import data from '../assets/data'
import frontendImage from '../assets/projects/digital-rain/placeholder.gif'
import profileImage from '../assets/images/profile-picture-wacky.jpg'
import styled from 'styled-components'

type Section = 'hello' | 'projects' | 'background' | 'about' | 'contact'

const sections: Record<Section, SectionType> = {
  hello: { id: 'hello', title: 'Hello' }, // hero section
  projects: { id: 'projects', title: 'Projects' }, // cool projects
  background: { id: 'background', title: 'Background' }, // education and experience
  about: { id: 'about', title: 'About' }, // personality
  contact: { id: 'contact', title: 'Contact' },
}

const InteractiveBgContainer = styled.div`
  position: fixed;
  inset: 0;
  background: #080908;
  z-index: -100000;
`

export default function HomePage() {
  const foregroundCanvasRef = useRef<HTMLDivElement>(null)

  const [shouldIndicateScrollability, setShouldIndicateScrollability] =
    useState(false)

  useEffect(() => {
    let hasScrolled = false
    const handleScroll = () => {
      hasScrolled = true
      setShouldIndicateScrollability(false)
      if (foregroundCanvasRef.current) {
        const scrollY = window.scrollY
        foregroundCanvasRef.current.style.transform = `translateY(${
          scrollY * 0.6
        }px)`
      }
    }
    const timeoutRef = setTimeout(() => {
      if (!hasScrolled) {
        setShouldIndicateScrollability(true)
      }
    }, 3000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutRef)
    }
  }, [])

  return (
    <Root>
      <Summary items={Object.values(sections)}></Summary>
      {/* hero (~very short about) */}
      {/*   contact */}
      {/* hello (~short about) */}

      {/* portfolio */}
      {/*   projects */}
      {/*   timeline (education, experience) */}

      {/* footer */}
      {/*   contact */}
      {/*   site map */}
      
      <InteractiveBgContainer></InteractiveBgContainer>
      <div ref={foregroundCanvasRef}>
        <InteractiveCanvasEffect />
      </div>

      <HeroSection id={sections.hello.id}>
        <div className="hero-content">
          <AvatarImage src={profileImage} size="large" />
          <h1>Vlatko Magjer</h1>
          <p>Data Scientist, Frontend Developer, and Software Engineer</p>
          <p>mail linkedin github</p>
        </div>
        <SwipeUpIndicator
          style={{
            opacity: shouldIndicateScrollability ? '1' : '0',
            transition: 'all 1s',
          }}
        />
      </HeroSection>

      <HelloSection>
        <SubtleTitle>Hi there!</SubtleTitle>
        <p>I{"'"}m Vlatko Magjer from Croatia.</p>
        <p>
          I love programming, playing board games, reading fantastic novels and
          learning new things!
        </p>
        <p>Feel free to get in touch with me or look at my past work below.</p>
      </HelloSection>

      <TitleSection>
        <Title>Portfolio</Title>
      </TitleSection>

      <ProjectsSection id={sections.projects.id}>
        <SubtleTitle>Top Projects</SubtleTitle>
        <Projects>
          <ProjectItem
            title="Web shop and its delivery app"
            image={data.highlightedProjects[0].image}
            reverse={false}
          >
            <p>
              Worked in a team of 4 to redesign a web shop for local produce. We refactored the stinky old code and introduced new
              features to improve the UX.
            </p>
            <p>
              We also made a mobile app to serve the shop{"'"}s delivery needs
              by crowdsourcing delivery drivers.
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
          <ProjectItem
            title="Augmented reality app"
            image={data.highlightedProjects[2].image}
            reverse={false}
          >
            <p>
              A part of my Masters thesis I fully developed an AR mobile app in
              Unity.
            </p>
            <p>
              This involved researching AR technologies and methods as well as learning
              Unity development. It was a valuable opportunity to
              learn of the various unique UX challenges present in XR
              development.
            </p>
          </ProjectItem>
        </Projects>
      </ProjectsSection>

      <MyBackgroundSection id={sections.background.id}>
        <SubtleTitle style={{ textAlign: 'center' }}>My background</SubtleTitle>
        <Timeline>
          <MyTimelineItem image={frontendImage} date="2023">
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
          <MyTimelineItem  date="2023">
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
          <MyTimelineItem image={frontendImage} date="2023">
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
          <MyTimelineItem  date="2023">
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

      <Section id={sections.about.id}>
        <SubtleTitle>More about me</SubtleTitle>
        <p>
          I{"'"}m a software engineer with a passion for creating elegant
          solutions to complex problems. I love to learn new things and I{"'"}m
          always looking for ways to improve my skills. I{"'"}m a team player
          and I{"'"}m always willing to help others.
        </p>
      </Section>

      <Section id={sections.contact.id}>
        <SubtleTitle>Contact</SubtleTitle>
        <p>
          You can contact me at <a href="mailto:ASD">ASDASD</a>
        </p>
      </Section>
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

const ProjectsSection = styled(Container)`
  z-index: 1;
  padding: 2rem 1rem 3rem;
  background-color: #e3e3e3;
  ul {
    padding-left: 1rem;
  }
`

const MyBackgroundSection = styled(Section)`
  z-index: 1;
  padding: 2rem 0;
  background-color: #b0bfbf;
`

const Projects = styled.div`
const MyBackgroundSection = styled(Container)`
`

const MyTimelineItem = styled(TimelineItem)`
  ul {
    padding-left: 1rem;
    li {
      list-style-type: square;
    }
  }
`
