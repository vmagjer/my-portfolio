import Container from "../../components/layout/Container"
import Timeline from "../../components/Timeline"
import TimelineItem from "../../components/TimelineItem"
import ferLogo from '../../assets/images/fer-logo.png'
import mediatoriumLogo from '../../assets/projects/mediatorium/mediatorium-logo.svg'
import styled from "styled-components"
import verdiLogo from '../../assets/projects/verdi/verdi-go.png'

type BackgroundSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function BackgroundSection({ ...rest }: BackgroundSectionProps) {
  return (
    <MyBackgroundSection {...rest}>
      <h2 style={{ textAlign: 'center' }}>My background</h2>
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
          <p>Honed my communication, programming and problem-solving skills.</p>
          <p>Tested the knowledge from university in real-life applications.</p>
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
          <p>Interactive aplication in marker-less mobile augmented reality</p>
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
          <p>Tested the knowledge from university in real-life applications</p>
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
          <p>Tested the knowledge from university in real-life applications</p>
        </MyTimelineItem>
        <MyTimelineItem date="2023" image={ferLogo}>
          <h3>Bachelor of Science in Computing</h3>
          <p>
            10/2020 at University of Zagreb, Faculty of Electrical Engineering
            and Computing
          </p>
          <p>Majored software engineering and information systems</p>
          <p>
            Coursework included physics, math, computer science and information
            science
          </p>
        </MyTimelineItem>
      </Timeline>
    </MyBackgroundSection>
  )
}

export default BackgroundSection


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