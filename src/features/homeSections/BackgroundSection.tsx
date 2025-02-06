import Container from '../../components/layout/Container'
import CourseList from '../../components/CourseList'
import Hyperlink from '../../components/Hyperlink'
import ProjectsList from '../../components/ProjectsList'
import baccalareusImage from '../../assets/projects/education/promocija-magistara-2021.jpg'
import blokA3Image from '../../assets/projects/blok-a3/blok-a3-landing.png'
import digitalRainImage from '../../assets/projects/digital-rain/digital-rain.png'
import masterImage from '../../assets/projects/education/promocija-magistara-2023.jpg'
import mediatoriumLogo from '../../assets/projects/mediatorium/mediatorium-logo.svg'
import mojBankarImage from '../../assets/projects/moj-bankar/Screenshot 2025-01-30 at 23-25-40 Najpovoljniji Krediti i Osiguranja Moj Bankar.png'
import styled from 'styled-components'
import verdiFarmDesktop from '../../assets/projects/verdi/web-shop-showcase-1.png'
import verdiGoImage from '../../assets/projects/verdi/verdi-go-karta.png'
import wordpressLogo from '../../assets/tech-icons/icons8-wordpress.svg'

type BackgroundSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

type BackgroundItem = {
  title: string
  image: string
  color: string
  date: string
  content: React.ReactNode
  skills: string[]
}
const backgroundItems: BackgroundItem[] = [
  {
    title: 'Wordpress promo site for handyman service',
    image: wordpressLogo,
    color: '#3858e9',
    date: 'September 2024',

    content: (
      <>
        {/* <p>
          As a <b>freelance</b> I built a promo website for a handyman business.
        </p>
        <p>
          I explored the Wordpress tooling and ecosystem, gaining insight into
          what web-building platforms can solve.
        </p> */}
        <ul>
          <li>First project with UI design responsibility</li>
          <li>Gained insight into web-building tooling and ecosystem</li>
        </ul>
      </>
    ),
    skills: ['Wordpress', 'CSS', 'UI/UX Design'],
  },
  {
    title: 'Testing unconventional UI interactions',
    image: digitalRainImage,
    color: '#000000',
    date: 'January 2024',
    content: (
      <>
        <ul>
          <li>Researched web features and tested their utility</li>
          <li>
            Published some on{' '}
            <Hyperlink
              external
              link="https://codepen.io/Vlatko-Magjer"
              onDark
              text="my CodePen"
            ></Hyperlink>
          </li>
        </ul>
      </>
    ),
    skills: ['JS', 'TS', 'HTML', 'CSS'],
  },

  {
    title: 'Master of Science in Computing',
    image: masterImage,
    color: '#000',
    date: 'September 2023',
    content: (
      <>
        <ul>
          <li>
            Graduated at{' '}
            <Hyperlink
              external
              link="https://www.fer.unizg.hr/en"
              text="University of Zagreb, FER"
            >
            </Hyperlink>
          </li>
          <li>Majored data science and software engineering</li>
          <li>Took electives in information security and management</li>
          <li>Developed an AR mobile app in Unity for my thesis</li>
        </ul>

        <CourseList
          items={[
            {
              title: 'Software Development',
              color: '#209215',
              courses: [
                'Object-Oriented Design',
                'Information Systems Development',
                'Advanced Algorithms and Data Structures',
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
              title: 'Information Security',
              color: '#2d2dbd',
              courses: [
                'Protection and Security of Information Systems',
                'Formal Methods in System Design',
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
    skills: ['C', 'C#', 'Java', 'Python', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Mobile app for courier gig workers',
    image: verdiGoImage,
    color: '#0e4539',
    date: 'February 2023',
    content: (
      <>
        <ul>
          <li>
            Developed the frontend for an app enabling
            drivers to select gigs and track weekly revenue.
          </li>
          <li>
            Reduced costs of third party service by using heuristics to
            calcualte routes locally
          </li>
          <li>
            Managed{' '}
            <Hyperlink
              external
              link="https://play.google.com/store/apps/details?id=verdi.go.development&hl=en"
              onDark
              text='app releases on Google Play'
            >
            </Hyperlink>
            , including testing and final deployment
          </li>
          <li>
            Gained experience in decision-making, communication and organization
            relating to front-end development
          </li>
        </ul>
      </>
    ),
    skills: ['Vue.js', 'Ionic', 'Typescript', 'Tailwind', 'Jira'],
  },
  {
    title: 'E-commerce platform for fresh local produce',
    image: verdiFarmDesktop,
    color: '#fff',
    date: 'October 2022',
    content: (
      <>
        <p>
          Implemented a redesign of a web app connecting consumers with local
          farmers.
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
          Contributed to the frontend for a CMS hub serving A1&apos;s Smart City
          Solutions.
        </p>
        <p>
          The CMS was built in{' '}
          <Hyperlink
            external
            link="https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor"
            onDark
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
    image: baccalareusImage,
    color: '#000',
    date: 'September 2020',
    content: (
      <>
        <p>
          at{' '}
            Graduated at{' '}
            <Hyperlink external link="https://www.fer.unizg.hr/en" onDark text='University of Zagreb, FER'>
          </Hyperlink>
          .
        </p>
        <p>
          Covered basics of computing and software engineering, while exploring
          a wider range of engineering-related courses.
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
    skills: ['C', 'Java', 'C++', 'PostgreSQL', 'MatLab'],
  },
  {
    title: 'Financial Comparison Tool',
    image: mojBankarImage,
    color: '#000',
    date: 'May 2020',
    content: (
      <>
            <Hyperlink external link="https://www.moj-bankar.hr/" onDark text='a web app'>
          </Hyperlink>{' '}
          with React.js on which I coached a colleague during development.
        </p>
      </>
    ),
    skills: ['React', 'TS', 'JS', 'Sass', 'HTML', 'CSS'],
  },
  {
    title: 'Web portfolio for an architecture company',
    image: blokA3Image,
    color: '#000',
    date: 'March 2020',
    content: (
      <>
            <Hyperlink external link="https://www.blok-a3.hr/" onDark text='This project'>
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
      <SectionTitle>My work</SectionTitle>
      <Subtitle>Proffessional and personal growth</Subtitle>

      <ProjectsList items={backgroundItems} />
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
  margin-bottom: 40px;
`
