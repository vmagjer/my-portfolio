import Summary, { Section as SectionType } from '../components/Summary'
import { useLayoutEffect, useRef } from 'react'

import { InteractiveBackground } from '../features/interactiveBackground/interactiveBg'
import { ProjectItem } from '../components/ProjectItem'
import Section from '../components/Section'
import data from '../assets/data'
import styled from 'styled-components'

const sections: SectionType[] = [
  { id: 'hello', title: 'Hello' }, // hero section
  { id: 'projects', title: 'Projects' }, // cool projects
  { id: 'background', title: 'Background' }, // education and experience
  { id: 'about', title: 'About' }, // personality
  { id: 'contact', title: 'Contact' },
]

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    if (!canvasRef.current) return
    const interactiveBg = new InteractiveBackground(canvasRef.current)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            interactiveBg.start()
          } else {
            interactiveBg.stop()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvasRef.current)

    return () => {
      observer.disconnect()
      interactiveBg.stop()
    }
  }, [canvasRef])

  return (
    <Container>
      <Summary items={sections}></Summary>
      <HeroSection id="hello">
        <canvas ref={canvasRef}></canvas>
        <div>
          <p>Hello there, I{"'"}m</p>
          <h1>
            Vlatko Magjer
            <br />
            Software Engineer
          </h1>
          <p>
            A builder with a passion for creating elegant solutions to complex
            problems.
          </p>
        </div>
      </HeroSection>

      <Section id="projects">
        <h2>What are some projects Im proud of?</h2>
        <Projects>
          {data.highlightedProjects.map((proj) => (
            <ProjectItem
              key={proj.id}
              title={proj.name}
              image={proj.image}
            >
              content missing
            </ProjectItem>
          ))}
        </Projects>
      </Section>

      <Section id="background">
        <h2>Tell you about myself</h2>
        <h3>Work Experience</h3>
        <WorkExperiences>
          {data.workExperience.map((workExp) => (
            <WorkExperience key={workExp.from}>
              <h3>{workExp.role}</h3>
              <span>at {workExp.company}</span>
              <span>{workExp.type}</span>
              <span>{getDurationMonths(workExp.from, workExp.to)} months</span>
            </WorkExperience>
          ))}
        </WorkExperiences>
        <h3>Education</h3>
        <Education>
          {data.education.map((eduExp) => (
            <EducationItem key={eduExp.degree}>
              <h3>{eduExp.degree}</h3>
              <span>{eduExp.school}</span>
              <span>
                {getMMYYYY(eduExp.from)} - {getMMYYYY(eduExp.to)}
              </span>
            </EducationItem>
          ))}
        </Education>
      </Section>

      <Section id="about">
        <h2>What?</h2>
        <p>
          I{"'"}m a software engineer with a passion for creating elegant
          solutions to complex problems. I love to learn new things and I{"'"}m
          always looking for ways to improve my skills. I{"'"}m a team player
          and I{"'"}m always willing to help others.
        </p>
      </Section>

      <Section id="contact">
        <h2>Contact</h2>
        <p>
          You can contact me at <a href="mailto:ASD">ASDASD</a>
        </p>
      </Section>
    </Container>
  )
}

function getDurationMonths(from: string, to: string) {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  return (
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
    toDate.getMonth() -
    fromDate.getMonth()
  )
}

function getMMYYYY(date: Date) {
  return `${date.getMonth() + 1}/${date.getFullYear()}`
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  color: #333;
`

const HeroSection = styled(Section)`
  height: 80vh;
  background-size: cover;
  color: #000;
  padding-top: 20vh;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  > div {
    padding: 1rem;
  }
`

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const WorkExperiences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const WorkExperience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: #e6f7ff;
  border-left: 4px solid #0073e6;
`

const Education = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EducationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: #e6f7ff;
  border-left: 4px solid #0073e6;
`
