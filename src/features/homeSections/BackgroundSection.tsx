import Container from '../../components/layout/Container'
import Timeline from '../../components/Timeline'
import ferLogo from '../../assets/images/fer-logo.svg'
import mediatoriumLogo from '../../assets/projects/mediatorium/mediatorium-logo.svg'
import styled from 'styled-components'
import verdiFarmLogo from '../../assets/projects/verdi/verdi-farm-logo.png'
import verdiGoLogo from '../../assets/projects/verdi/verdi-go.png'

type BackgroundSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

const timelineItems: {
  title: string
  image: string
  color: string
  date: string
  content: React.ReactNode
}[] = [
  {
    title: 'Mobile App for Delivery Drivers',
    image: verdiGoLogo,
    color: '#0e4539',
    date: 'October 2023 ',
    content: (
      <>
        <p>
          Learned several frameworks (Vue, React, Blazor, Ionic) and widely used
          tools (Tailwind, TypeScript, Material UI, Wordpress...).
        </p>
        <p>Honed my communication, programming and problem-solving skills.</p>
        <p>Tested the knowledge from university in real-life applications.</p>
      </>
    ),
  },
  {
    title: 'Web Shop for Fresh Local Produce',
    image: verdiFarmLogo,
    color: '#fff',
    date: 'October 2023 ',
    content: (
      <>
        <p>
          Learned several frameworks (Vue, React, Blazor, Ionic) and widely used
          tools (Tailwind, TypeScript, Material UI, Wordpress...).
        </p>
        <p>Honed my communication, programming and problem-solving skills.</p>
        <p>Tested the knowledge from university in real-life applications.</p>
      </>
    ),
  },
  {
    title: 'Graduated as Master of Science in Computing',
    image: ferLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          10/2023 at University of Zagreb, Faculty of Electrical Engineering and
          Computing
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
      </>
    ),
  },
  {
    title: "CMS for A1's Smart City Solutions",
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: <></>,
  },
  {
    title: 'Web app for Insurance and Loan Consulting',
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: <></>,
  },
  {
    title: 'Web portfolio for an architecture company',
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: <></>,
  },
  {
    title: 'Graduated as Bachelor of Science in Computing',
    image: ferLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          10/2020 at University of Zagreb, Faculty of Electrical Engineering and
          Computing
        </p>
        <p>Majored software engineering and information systems</p>
        <p>
          Coursework included physics, math, computer science and information
          science
        </p>
      </>
    ),
  },
]
function BackgroundSection({ ...rest }: BackgroundSectionProps) {
  return (
    <Root {...rest}>
      <SectionTitle>My background</SectionTitle>
      <Subtitle>Projects and accomplishments I can show off.</Subtitle>
      <Timeline items={timelineItems} />
    </Root>
  )
}

export default BackgroundSection

// ###################### BACKGROUND
const Root = styled(Container)`
  z-index: 1;
  padding: 32px 16px 48px;
  background-color: #b5b2b7;
`

const SectionTitle = styled.h2`
  text-align: center;

  margin: 0;
`

const Subtitle = styled.p`
  text-align: center;
  margin: 0;
  margin-bottom: 16px;
  opacity: 80%;
`