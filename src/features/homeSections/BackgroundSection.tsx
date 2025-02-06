import Container from '../../components/layout/Container'
import CourseList from '../../components/CourseList'
import Hyperlink from '../../components/Hyperlink'
import ProjectsList from '../../components/ProjectsList'
import React from 'react'
import UIMockup from '../../components/UIMockup'
import blokA3CatalogImage from '../../assets/projects/blok-a3/1920x1200/gallery-mobile.png'
import blokA3MapImage from '../../assets/projects/blok-a3/1920x1200/map.png'
import digitalRainImage from '../../assets/projects/digital-rain/digital-rain.png'
import educationBachelorsImage from '../../assets/projects/education/promocija-magistara-2021.jpg'
import educationMastersImage from '../../assets/projects/education/promocija-magistara-2023.jpg'
import mediatoriumLogo from '../../assets/projects/mediatorium/mediatorium-logo.svg'
import mojBankarGlossaryImage from '../../assets/projects/moj-bankar/1920x1200/dict-mobile.png'
import mojBankarHomeImage from '../../assets/projects/moj-bankar/1920x1200/home.png'
import styled from 'styled-components'
import verdiFarmCartImage from '../../assets/projects/verdi/e-commerce/cart.png'
import verdiFarmCatalogImage from '../../assets/projects/verdi/e-commerce/catalog-mobile.png'
import verdiGoMap2Image from '../../assets/projects/verdi/map-2-design.png'
import verdiGoMapImage from '../../assets/projects/verdi/map-design.png'

type BackgroundSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

type BackgroundItem = {
  title: string
  image: React.ReactNode
  color: string
  date: string
  content: React.ReactNode
  skills: string[]
}
const backgroundItems: BackgroundItem[] = [
  // {
  //   title: 'Wordpress promo site for handyman service',
  //   image: <><img src={wordpressLogo} /></>,
  //   color: '#3858e9',
  //   date: 'Sep 2024',

  //   content: (
  //     <>
  //       <ul>
  //         <li>My first project with UI design responsibility</li>
  //         <li>Gained insight into web-building tooling and ecosystem</li>
  //       </ul>
  //     </>
  //   ),
  //   skills: ['Wordpress', 'CSS', 'UI Design'],
  // },
  {
    title: 'Testing unconventional UI interactions',
    image: (
      <>
        <img src={digitalRainImage} />
      </>
    ),
    color: '#000000',
    date: 'Occasionaly',
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
    skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },

  {
    title: 'Master of Science in Computing',
    image: (
      <>
        <img src={educationMastersImage} />
      </>
    ),
    color: '#000',
    date: 'Sep 2020 - Sep 2023',
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
          <li>Data science and Software engineering</li>
          <li>Information security and Management</li>
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
    image: (
      <>
        <UIMockup
          items={[
            {
              image: verdiGoMapImage,
              type: 'mobile',
            },
            {
              image: verdiGoMap2Image,
              type: 'mobile',
            },
          ]}
        />
      </>
    ),
    color: '#0e4539',
    date: 'Feb - May 2023',
    content: (
      <>
        <ul>
          <li>
            Features gig selection, routing, data visualization, user
            authetification, push notifications
          </li>
          <li>
            I reduced costs of third party service by using heuristics to
            calculate routes locally
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
    skills: ['Vue', 'Ionic', 'TS', 'Tailwind', 'Jira'],
  },
  {
    title: 'E-commerce platform for fresh local produce',
    image: (
      <>
        <UIMockup
          items={[
            {
              image: verdiFarmCartImage,
              type: 'desktop',
            },
            {
              image: verdiFarmCatalogImage,
              type: 'mobile',
            },
          ]}
        />
      </>
    ),
    color: '#fff',
    date: 'Oct 2022 - Feb 2023',
    content: (
      <>
        <ul>
          <li>
            Features vendor and customer accounts, inventory management,
            transaction history, product catalog, cart, different payment
            options
          </li>
          <li>
            We implemented a redesign of the original app, requiring style and
            structure changes
          </li>
          <li>Systematically migrated the project to a higher Node version</li>
          <li>
            I gained experience tackling challenges in an older codebase,
            evaluating refactoring versus working around the existing
            constraints
          </li>
        </ul>
      </>
    ),
    skills: ['Vue', 'Tailwind', 'TS', 'JS', 'Jira'],
  },
  {
    title: "CMS for A1's Smart City Solutions",
    image: (
      <>
        <img src={mediatoriumLogo} />
      </>
    ),
    color: '#000',
    date: 'Mar - May 2022',
    content: (
      <>
        <ul>
          <li>
            Contributed to the frontend for a CMS hub serving A1&apos;s Smart
            City Solutions
          </li>
          <li>
            Gained practical experience building a big project requiring
            systematic and scalable design
          </li>
        </ul>
      </>
    ),
    skills: ['Blazor', 'C#', 'JS', 'Sass'],
  },
  {
    title: 'Bachelor of Science in Computing',
    image: (
      <>
        <img src={educationBachelorsImage} />
      </>
    ),
    color: '#000',
    date: 'Sep 2015 - Sep 2020',
    content: (
      <>
        <ul>
          <li>
            Graduated at{' '}
            <Hyperlink external link="https://www.fer.unizg.hr/en" onDark text='University of Zagreb, FER'>
            </Hyperlink>
          </li>
          <li>Covered the foundations of computing and software engineering</li>
          <li>Explored a wider range of engineering-related courses</li>
        </ul>

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
    image: (
      <>
        <UIMockup
          items={[
            {
              image: mojBankarHomeImage,
              type: 'desktop',
            },
            {
              image: mojBankarGlossaryImage,
              type: 'mobile',
            },
          ]}
        />
      </>
    ),
    color: '#000',
    date: 'May - Sep 2020',
    content: (
      <>
        <ul>
          <li>
            Worked on{' '}
            <Hyperlink external link="https://www.moj-bankar.hr/" onDark text='a web app'>
            </Hyperlink>{' '}
            offering tools to compare financial products and services
          </li>
          <li>
            We included a financial glossary, expert consultation forms, and
            service comparison tables
          </li>
          <li>I took initiative to coach a colleague on React</li>
        </ul>
      </>
    ),
    skills: ['React', 'TS', 'JS', 'Sass', 'HTML', 'CSS'],
  },
  {
    title: 'Web portfolio for an architecture company',
    image: (
      <>
        <UIMockup
          items={[
            {
              image: blokA3MapImage,
              type: 'desktop',
            },
            {
              image: blokA3CatalogImage,
              type: 'mobile',
            },
          ]}
        />
      </>
    ),
    color: '#000',
    date: 'Mar - May 2020',
    content: (
      <>
        <ul>
          <li>
            Features a gallery and map-based library of architecture projects,
            along with an image editor integrated into the contact form
          </li>
          <li>
            <Hyperlink external link="https://www.blok-a3.hr/" onDark text='This project'>
            </Hyperlink>{' '}
            marked my first role as a front-end developer developer
          </li>
          <li>Valuable experience working in a proffessional team</li>
        </ul>
      </>
    ),
    skills: ['React', 'JS', 'Bootstrap', 'CSS'],
  },
]

function BackgroundSection({ ...rest }: BackgroundSectionProps) {
  return (
    <Root {...rest}>
      <SectionTitle>My work</SectionTitle>
      {/* <Subtitle>Proffessional and personal growth</Subtitle> */}
      <Subtitle>Projects and accomplishments</Subtitle>

      <ProjectsList items={backgroundItems} />
    </Root>
  )
}

export default BackgroundSection

// ###################### BACKGROUND
const Root = styled(Container)`
  z-index: 1;
  padding: 32px 16px 48px;
  /* background-color: var(--section-surface);

  background-color: var(--alt-section-surface);
  background-color: var(--neutral-300); */

  margin-top: -30px;
  border-radius: 100% / 30px 30px 0 0;
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

  @media (min-width: 1000px) {
    margin-bottom: 80px;
    
  }
`
