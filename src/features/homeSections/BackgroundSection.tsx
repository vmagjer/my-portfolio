import Container from '../../components/layout/Container'
import Hyperlink from '../../components/Hyperlink'
import Timeline from '../../components/Timeline'
import exploringLogo from '../../assets/tech-icons/javascript.png'
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
    title: 'Explored frontend technologies',
    image: exploringLogo,
    color: '#000000',
    date: 'October 2023 ',
    content: (
      <>
        <p>
          For the sake of my curiosity and fun, I sought to challenge myself by
          building small but interesting projects using web features.{' '}
        </p>
        <p>
          I&apos;ve compiled some on <Hyperlink link="">my CodePen</Hyperlink>:
        </p>
        <ul>
          <li>Digital Rain (Matrix)</li>
          <li>3D Card (Harry Potter)</li>
          <li>Interactive Broken Glass Pane</li>
          <li>Scroll-bound animation</li>
          <li>Parallax effect</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Crowdsourced delivery app',
    image: verdiGoLogo,
    color: '#0e4539',
    date: 'October 2023 ',
    content: (
      <>
        <p>
          Worked in a team of four to build a mobile app that enables delivery
          of parcels via gig workers.
        </p>
        <p>
          We built it with{' '}
          <Hyperlink link="https://ionicframework.com">Ionic</Hyperlink> and{' '}
          <Hyperlink link="https://vuejs.org/">Vue.js</Hyperlink> and written in{' '}
          <Hyperlink link="https://www.typescriptlang.org/">
            Typescript
          </Hyperlink>{' '}
          . We user tested and finally published{' '}
          <Hyperlink link="">the app on Google Play</Hyperlink>.
        </p>
        <p>
          This experience was valuable to me because I was the sole frontend
          developer and thus carried all the corresponding responsibilities.
        </p>
      </>
    ),
  },
  {
    title: 'E-commerce platform for fresh local produce',
    image: verdiFarmLogo,
    color: '#fff',
    date: 'October 2023 ',
    content: (
      <>
        <p>
          Implemented a redesign of a{' '}
          <Hyperlink link="https://vuejs.org/">Vue.js</Hyperlink> web app
          connecting consumers with local farmers, replacing a large monolithic
          CSS file with{' '}
          <Hyperlink link="https://tailwindcss.com">Tailwind</Hyperlink> for
          better maintainability.
        </p>
        <p>
          Gained experience tackling challenges in older codebases, balancing
          refactoring with existing system constraints.
        </p>
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
          at{' '}
          <Hyperlink link="https://www.fer.unizg.hr/en">
            University of Zagreb, Faculty of Electrical Engineering and
            Computing (FER)
          </Hyperlink>
        </p>
        <p>Majored software engineering and information systems.</p>

        <details>
          <summary>
            <b>Coursework</b> focused on data science and software design.
          </summary>
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
        </details>

        <p>
          <b>Thesis: </b>Interactive aplication in marker-less mobile augmented
          reality
        </p>
      </>
    ),
  },
  {
    title: "CMS for A1's Smart City Solutions",
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          Contributed common frontend components for a CMS hub serving A1&apos;s
          Smart City Solutions.
        </p>
        <p>
          The CMS was built in Blazor (C# and HTML) with SASS aiding in styling.
        </p>
        <p>
          Here I gained practical experience building a big project requiring
          structure and systematic design.
        </p>
      </>
    ),
  },
  {
    title: 'Financial Comparison Tool',
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          Worked on a web app offering a financial glossary, expert consultation
          forms, and service comparison tables to guide users toward smarter
          financial choices.
        </p>
        <p>
          We built it with React.js on which I coached a colleague during
          development.
        </p>
      </>
    ),
  },
  {
    title: 'Web portfolio for an architecture company',
    image: mediatoriumLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          Built a web portfolio featuring a gallery and map-based library of
          architecture projects, along with an image editor integrated into the
          contact form.
        </p>
        <p>
          Developed using React.js, this project marked my first role as a
          software developer.
        </p>
      </>
    ),
  },
  {
    title: 'Graduated as Bachelor of Science in Computing',
    image: ferLogo,
    color: '#000',
    date: 'October 2023',
    content: (
      <>
        <p>
          at{' '}
          <Hyperlink link="https://www.fer.unizg.hr/en">
            University of Zagreb, Faculty of Electrical Engineering and
            Computing (FER)
          </Hyperlink>
        </p>
        <p>Majored software engineering and information systems.</p>
        <details>
          <summary>
            <b>Coursework</b> revolved around software engineering and
            mathematics with electives in management in engineering.
          </summary>
          <ul>
            <li>Programming and Software Logic</li>
            <li>Algorithms and Data Structures</li>
            <li>Databases</li>
          </ul>
          <ul>
            <li>Software Design</li>
            <li>Design Patterns in Software Design</li>
            <li>Object-Oriented Programming</li>
            <li>Programming Paradigms and Languages</li>
            <li>Development of Software Applications</li>
          </ul>
          <ul>
            <li>Communication Networks</li>
            <li>Operating Systems</li>
            <li>Computer Architecture</li>
          </ul>
          <ul>
            <li>Information Theory</li>
            <li>Signals and Systems</li>
            <li>Probability and Statistics</li>
            <li>Mathematics</li>
          </ul>

          <ul>
            <li>Interactive Computer Graphics</li>
            <li>Programming Language Translation</li>
            <li>Digital Logic</li>
            <li>AutoCAD</li>
          </ul>

          <ul>
            <li>Management in Engineering</li>
            <li>Economics and Managerial Decision-Making</li>
            <li>Commercial Law</li>
            <li>Quality Management</li>
            <li>Skills of Communication</li>
          </ul>
        </details>
        <p>
          <b>Thesis:</b> Application of dynamic web pages and 2D graphics in
          cognitive testing
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
  background-color: #bfbfd5;
`

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--color-title);

  margin: 0;
`

const Subtitle = styled.p`
  text-align: center;
  color: var(--color-subtitle);
  
  margin: 0;
  margin-bottom: 16px;
`
