import Container from '../../components/layout/Container'
import CourseList from '../../components/CourseList'
import Hyperlink from '../../components/Hyperlink'
import Timeline from '../../components/Timeline'
import exploringLogo from '../../assets/tech-icons/javascript.png'
import ferLogo from '../../assets/images/fer-logo.svg'
import mediatoriumLogo from '../../assets/projects/mediatorium/mediatorium-logo.svg'
import styled from 'styled-components'
import verdiFarmLogo from '../../assets/projects/verdi/verdi-farm-logo.png'
import verdiGoLogo from '../../assets/projects/verdi/verdi-go.png'
import wordpressLogo from '../../assets/tech-icons/icons8-wordpress.svg'

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
  skills: string[]
}[] = [
  {
    title: 'Wordpress promo site for handyman service',
    image: wordpressLogo,
    color: '#3858e9',
    date: 'September 2024',
    content: (
      <>
        <p>
          Tried my hand at Wordpress for the first time by building a promo website
          for a handyman business.
        </p>
        <p>
          I explored the Wordpress tooling and ecosystem,
          gaining insight into how web-building platforms are used.
        </p>
      </>
    ),
    skills: ['Wordpress', 'CSS', 'UI/UX Design'],
  },
  {
    title: 'Explored frontend technologies',
    image: exploringLogo,
    color: '#000000',
    date: 'January 2024',
    content: (
      <>
        <p>
          For fun and sport, I&apos;ve built a few
          small projects that explore fun and interesting web features. These
          have been a great way to learn and try out new ideas.
        </p>
        <p>
          You can check out some of my creations on{' '}
          <Hyperlink external link="https://codepen.io/Vlatko-Magjer" onDark>
            my CodePen
          </Hyperlink>
          :
        </p>
        <ul>
          <li>
            Digital Rain (<i>The Matrix</i>)
          </li>
          <li>
            3D Card
          </li>
          <li>Interactive Broken Glass</li>
        </ul>
      </>
    ),
    skills: ['HTML', 'CSS', 'JS', 'TS'],
  },

  {
    title: 'Graduated as Master of Science in Computing',
    image: ferLogo,
    color: '#000',
    date: 'September 2023',
    content: (
      <>
        <p>
          at{' '}
          <Hyperlink external link="https://www.fer.unizg.hr/en" onDark>
            University of Zagreb, Faculty of Electrical Engineering and
            Computing (FER).
          </Hyperlink>
        </p>

        <CourseList
          items={[
            {
              title: 'Software Development',
              color: '#209215',
              courses: [
                'Object-Oriented Design',
                'Advanced Algorithms and Data Structures',
                'Information Systems Development',
              ],
            },
            {
              title: 'System Security',
              color: '#2d2dbd',
              courses: [
                'Formal Methods in System Design',
                'Protection and Security of Information Systems',
              ],
            },
            {
              title: 'Data Science',
              color: '#0d92a1',
              courses: [
                'Machine Learning',
                'Business Intelligence',
                'Analysis of Massive Datasets',
                'Social Networks',
                'Linear Algebra',
                'Heuristic Optimization Methods',
                'Operations Research',
              ],
            },
            {
              title: 'Management',
              color: '#a11ac7',
              courses: [
                'Technology Entrepreneurship',
                'Organizational Psychology',
              ],
            },
            {
              title: 'Niche Subjects',
              color: '#af530d',
              courses: [
                'Virtual Environments',
                'Human-Computer Interaction',
                'Quantum Computers',
              ],
            },
          ]}
        ></CourseList>
      </>
    ),
    skills: [],
  },
  {
    title: 'Crowdsourced delivery app',
    image: verdiGoLogo,
    color: '#0e4539',
    date: 'February 2023',
    content: (
      <>
        <p>
          Worked in a team of four to build a mobile app that enables delivery
          of parcels via gig workers.
        </p>
        <p>
          We built it with{' '}
          <Hyperlink external link="https://ionicframework.com" onDark>
            Ionic
          </Hyperlink>{' '}
          and Vue.js and written in Typescript. We user tested and finally
          published{' '}
          <Hyperlink
            external
            link="https://play.google.com/store/apps/details?id=verdi.go.development&hl=en" onDark
          >
            the app on Google Play
          </Hyperlink>
          .
        </p>
        <p>
          This experience was valuable to me because I was the sole frontend
          developer and so carried the responsibility for organization,
          communication and decision-making.
        </p>
      </>
    ),
    skills: ['Vue.js', 'Ionic', 'JS/TS', 'Tailwind', 'Jira'],
  },
  {
    title: 'E-commerce platform for fresh local produce',
    image: verdiFarmLogo,
    color: '#fff',
    date: 'October 2022',
    content: (
      <>
        <p>
          Implemented a redesign of a Vue.js web app connecting consumers with
          local farmers.
        </p>
        <p>
          While restyling, we replaced a large monolithic CSS file with Tailwind
          for better maintainability. Later we maintained and added new features
          to{' '}
          <Hyperlink external link="https://tailwindcss.com" onDark>
            the app in production
          </Hyperlink>
          .
        </p>
        <p>
          I gained experience tackling challenges in older codebases, evaluating
          refactoring versus working around the existing constraints.
        </p>
      </>
    ),
    skills: ['Vue.js', 'Tailwind', 'JS/TS', 'Jira'],
  },
  {
    title: "CMS for A1's Smart City Solutions",
    image: mediatoriumLogo,
    color: '#000',
    date: 'March 2022',
    content: (
      <>
        <p>
          Contributed to the frontend for a CMS hub serving A1&apos;s
          Smart City Solutions.
        </p>
        <p>
          The CMS was built in{' '}
          <Hyperlink
            external
            link="https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor" onDark
          >
            Blazor
          </Hyperlink>{' '}
          with{' '}
          <Hyperlink external link="https://sass-lang.com/" onDark>
            Sass
          </Hyperlink>{' '}
          aiding in styling.
        </p>
        <p>
          Here I gained practical experience building a big project requiring
          systematic and scalable design.
        </p>
      </>
    ),
    skills: ['Blazor', 'C#', 'JS', 'Sass'],
  },
  {
    title: 'Graduated as Bachelor of Science in Computing',
    image: ferLogo,
    color: '#000',
    date: 'September 2020',
    content: (
      <>
        <p>
          at{' '}
          <Hyperlink external link="https://www.fer.unizg.hr/en" onDark>
            University of Zagreb, Faculty of Electrical Engineering and
            Computing (FER).
          </Hyperlink>
        </p>

        <CourseList
          items={[
            {
              title: 'Programming',
              color: '#209215',
              courses: [
                'Digital Logic',
                'Programming and Software Logic',
                'Algorithms and Data Structures',
                'Databases',
              ],
            },
            {
              title: 'Software Development',
              color: '#2d2dbd',
              courses: [
                'Software Design',
                'Design Patterns in Software Design',
                'Object-Oriented Programming',
                'Programming Paradigms and Languages',
                'Development of Software Applications',
              ],
            },
            {
              title: 'Architecture',
              color: '#3f534f',
              courses: [
                'Communication Networks',
                'Operating Systems',
                'Computer Architecture',
              ],
            },
            {
              title: 'Data Science',
              color: '#0d92a1',
              courses: [
                'Information Theory',
                'Signals and Systems',
                'Probability and Statistics',
                'Mathematics',
              ],
            },
            {
              title: 'Management',
              color: '#a11ac7',
              courses: [
                'Management in Engineering',
                'Economics and Managerial Decision-Making',
                'Commercial Law',
                'Quality Management',
                'Skills of Communication',
              ],
            },
            {
              title: 'Niche Engineering Subjects',
              color: '#af530d',
              courses: [
                'Interactive Computer Graphics',
                'Programming Language Translation',
                'AutoCAD',
              ],
            },
          ]}
        />
      </>
    ),
    skills: [],
  },
  {
    title: 'Financial Comparison Tool',
    image: mediatoriumLogo,
    color: '#000',
    date: 'May 2020',
    content: (
      <>
        <p>
          Worked on a web app offering a financial glossary, expert consultation
          forms, and service comparison tables to guide users toward smarter
          financial choices.
        </p>
        <p>
          We built{' '}
          <Hyperlink external link="https://www.moj-bankar.hr/" onDark>
            the financing tool
          </Hyperlink>{' '}
          with React.js on which I coached a colleague during development.
        </p>
      </>
    ),
    skills: ['React', 'TS', 'JS', 'Sass', 'HTML', 'CSS'],
  },
  {
    title: 'Web portfolio for an architecture company',
    image: mediatoriumLogo,
    color: '#000',
    date: 'March 2020',
    content: (
      <>
        <p>
          Built a{' '}
          <Hyperlink external link="https://www.blok-a3.hr/" onDark>
            web portfolio
          </Hyperlink>{' '}
          featuring a gallery and map-based library of architecture projects,
          along with an image editor integrated into the contact form.
        </p>
        <p>
          Developed using React.js, this project marked my first role as a
          software developer.
        </p>
      </>
    ),
    skills: ['React', 'Javascript', 'Bootstrap', 'CSS'],
  },
]

function BackgroundSection({ ...rest }: BackgroundSectionProps) {
  return (
    <Root {...rest}>
      <SectionTitle>Background</SectionTitle>
      <Subtitle>My proffessional and personal growth.</Subtitle>
      <Timeline items={timelineItems} />
    </Root>
  )
}

export default BackgroundSection

// ###################### BACKGROUND
const Root = styled(Container)`
  z-index: 1;
  padding: 32px 16px 48px;
  background-color: var(--section-surface);
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
