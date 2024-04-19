const personalInfo = {
  firstName: 'Vlatko',
  lastName: 'Magjer',
  fullName: 'Vlatko Magjer',
  city: 'Gornji Stupnik',
  county: 'Zagreb County',
  country: 'Croatia',
}

const contactInfo = {
  tel: '+385 91 251 0022',
  email: 'vlatko.magjer@gmail.com',
  socialMedia: [
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/vlatko-magjer/',
    },
    {
      name: 'github',
      link: 'https://github.com/vmagjer',
    },
  ],
}

const education = [
  {
    degree: 'Master of Science in Computer Science',
    school:
      'University of Zagreb, Faculty of Electrical Engineering and Computing',
    link: 'https://www.fer.unizg.hr/en',
    abbreviation: 'UNIZG FER',
    from: new Date('2020-10-01'),
    to: new Date('2023-10-01'),
    thesis:
      'Application of dynamic web pages and 2D graphics in cognitive testing',
    subjects: [
      'Data Structures and Algorithms',
      'Computer Graphics',
      'Machine Learning',
      'Mathematics',
      'Probability and Statistics',
      'Object-Oriented Programming (OOP)',
      'Business Intelligence',
      'Social Networks',

      'Software Engineering',
      'Information Systems',

      'Operating Systems',
      'Databases',
      'Web Technologies',
      'Programming Languages',
    ],
    technologies: ['csharp', 'python', 'java', 'sql', 'git'],
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    school:
      'University of Zagreb, Faculty of Electrical Engineering and Computing',
    link: 'https://www.fer.unizg.hr/en',
    abbreviation: 'UNIZG FER',
    from: new Date('2016-10-01'),
    to: new Date('2020-10-01'),
    thesis: 'Web application for a real estate agency',
    subjects: [
      'Data Structures and Algorithms',
      'Mathematics',
      'Probability and Statistics',
      'Object-Oriented Programming',
      'Business Intelligence',
      'Social Networks',

      'Software Engineering',
      'Information Systems',

      'Operating Systems',
      'Databases',
      'Web Technologies',
      'Programming Languages',
    ],
    technologies: ['csharp', 'python', 'java', 'sql', 'git'],
  },
]

import blokA3Landing from './projects/blok-a3/blok-a3-landing.png'
import blokA3Portfolio from './projects/blok-a3/blok-a3-portfolio.png'
import blokA3Map from './projects/blok-a3/blok-a3-map.png'
import mojBankarLanding from './projects/moj-bankar/landing.png'
import mojBankarProduct from './projects/moj-bankar/product.png'
import mojBankarDictionary from './projects/moj-bankar/dictionary.png'

const projects = {
  // PERSONAL PROJECTS
  digitalRain: {
    name: 'Digital rain',
    description:
      'A digital rain animation inspired by the Matrix movie. The rain is implemented through a particle system and interacts with the cursor. Several settings can be adjusted to customize the experience',
    link: '/projects/digital-rain',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['react', 'javascript', 'html', 'css', 'git', 'vsCode'],
  },
  scrollBasedAnimation: {
    name: 'Scroll based animation',
    description:
      'A scroll-based animation that controls the timeline of a animated html elements based on scroll position. The animation includes the parallax effect.',
    link: '/projects/scroll-based-animation',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['react', 'javascript', 'html', 'css', 'git', 'vsCode'],
  },
  nodeLinkDiagram: {
    name: 'Node link diagram',
    description:
      'A network visualization of subjects and their relationships (in this case technologies I\'ve worked with). The graph is drawn using a force-directed layout algorithm.',
    link: '/projects/node-link-diagram',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['react', 'javascript', 'html', 'css', 'git', 'vsCode'],
  },
  card3D: {
    name: '3D Card component',
    description:
      'A 3D card component inspired by Harry Potter movies. The card is implemented using CSS 3D transforms.',
    link: '/projects/3d-card',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['react', 'javascript', 'html', 'css', 'git', 'vsCode'],
  },
  // UNIVERISTY PROJECTS
  augmentedReality: {
    name: 'Augmented reality app',
    description:
      'An augmented reality mobile app that displays information about the user’s surroundings. The app uses the device’s camera and GPS to display the information.',
    link: null,
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['unity', 'csharp', 'git', 'vsCode'],
  },
  cognitiveTesting: {
    name: 'Cognitive testing web',
    description:
      'A web app for cognitive testing. The app features several tests for cognitive abilities, such as memory, attention, and problem-solving.',
    link: null,
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: ['react', 'redux', 'csharp', 'sql', 'git', 'vsCode'],
  },
  // COMMERCIAL PROJECTS
  verdigo: {
    name: 'Crowdsourced delivery app',
    description:
      'Driver interface for a crowd-sourced delivery service. The mobile app features a map with real-time updates of the driver’s location, nearby orders, and the optimal routes to deliver them.',
    link: 'https://play.google.com/store/apps/details?id=verdi.go.development&pcampaignid=web_share',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: [
      'vue',
      'vuex',
      'ionic',
      'javascript',
      'html',
      'css',
      'git',
      'bitbucket',
      'jira',
      'vsCode',
    ],
  },
  verdifarm: {
    name: 'Web shop for local produce',
    description:
      'Ecommerce platform selling fresh local produce and products from small businesses. The app required a custom CMS for the vendors to manage their products and orders.',
    link: 'https://verdi-farm.com/',
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: [
      'vue',
      'vuex',
      'tailwind',
      'javascript',
      'html',
      'css',
      'git',
      'bitbucket',
      'jira',
      'vsCode',
    ],
  },
  a1cms: {
    name: 'City management CMS',
    description:
      'Web app for management of several A1’s CMS-s related to city management.',
    link: null,
    image: 'http://unsplash.it/400/300?random&gravity=center',
    technologies: [
      'blazor',
      'C#',
      'javascript',
      'html',
      'css',
      'sass',
      'git',
      'gitlab',
      'favro',
      'visualstudio',
    ],
  },
  mojBankar: {
    name: 'Banking and insurance consulting',
    description:
      'Banking and insurance consulting web app featuring many dynamic forms and informative tools for consultees.',
    link: 'https://www.moj-bankar.hr/',
    image: mojBankarLanding,
    technologies: [
      'react',
      'redux',
      'materialui',
      'javascript',
      'html',
      'css',
      'sass',
      'git',
      'gitlab',
      'favro',
      'vsCode',
    ],
  },
  blokA3: {
    name: 'Architecture firm portfolio',
    description:
      'A web app for an architecture firm showcasing their work in an unconventional layout and featuring an image editor for prospective clients to edit and submit their own designs.',
    link: 'https://www.blok-a3.hr/',
    image: blokA3Map,
    images: [
      '@/assets/projects/blok-a3/blok-a3-landing.png',
      '@/assets/projects/blok-a3/blok-a3-portfolio.png',
      '@/assets/projects/blok-a3/blok-a3-map.png',
    ],
    technologies: [
      'react',
      'redux',
      'bootstrap',
      'javascript',
      'html',
      'css',
      'sass',
      'git',
      'gitlab',
      'favro',
      'vsCode',
    ],
  },
}
const highlightedProjects = ['blokA3', 'mojBankar', 'verdifarm', 'verdigo']

const workExperience = [
  {
    role: 'Vue Frontend Developer',
    description:
      'Developing and maintaining web applications and a mobile app.',
    company: 'LMB 1759 Export d.o.o.',
    type: 'contract',
    from: '2022-10-01',
    to: '2023-05-1',
    projects: ['verdigo', 'verdifarm'],
    contributions: [
      'Proactively implemented new features and improvements.',
      'Responsible for the entire frontend development process.',
    ],
  },
  {
    role: '.Net Frontend Developer',
    description: 'Developing web applications for various clients.',
    contributions: ['Created reusable components'],
    company: 'Mediatorium d.o.o.',
    type: 'contract',
    from: '2022-03-01',
    to: '2022-09-01',
    projects: ['a1cms'],
  },
  {
    role: 'React Frontend Developer',
    description:
      'Developing and maintaining web applications for various clients.',
    contributions: ['Introduced React and Redux to the company’s tech stack.'],
    company: 'Mediatorium d.o.o.',
    type: 'contract',
    from: '2020-03-01',
    to: '2020-08-01',
    projects: ['mojBankar', 'blokA3'],
  },
]

const technologyCategories = {
  frontEnd: {
    name: 'Front-end',
  },
  backEnd: {
    name: 'Back-end',
  },
  fullStack: {
    name: 'Full-stack',
  },
  programmingLanguage: {
    name: 'Programming Language',
  },
  stateManagement: {
    name: 'State Management',
  },
  framework: {
    name: 'Framework',
  },
  library: {
    name: 'Library',
  },
  mobileDevelopment: {
    name: 'Mobile Development',
  },
  markupLanguage: {
    name: 'Markup Language',
  },
  stylingLanguage: {
    name: 'Styling Language',
  },
  database: {
    name: 'Database',
  },
  versionControl: {
    name: 'Version Control',
  },
  projectManagement: {
    name: 'Project Management',
  },
  documentation: {
    name: 'Documentation',
  },
  developmentEnvironment: {
    name: 'Development Environment',
  },
  tool: {
    name: 'Tool',
  },
  baseWebTechnology: {
    name: 'Base Web Technology',
  },
}

import jsIcon from './tech-icons/javascript.png'
import tsIcon from './tech-icons/typescript.png'
import reactIcon from './tech-icons/react.png'
import reduxIcon from './tech-icons/redux.png'
import vueIcon from './tech-icons/vue.png'
import vuexIcon from './tech-icons/vuex.png'
import blazorIcon from './tech-icons/blazor.png'
import ionicIcon from './tech-icons/ionic.png'
import htmlIcon from './tech-icons/html.png'
import cssIcon from './tech-icons/css.png'
import sassIcon from './tech-icons/sass.png'
import csharpIcon from './tech-icons/csharp.png'
import pythonIcon from './tech-icons/python.png'
import javaIcon from './tech-icons/java.png'
import gitIcon from './tech-icons/git.png'
import githubIcon from './tech-icons/github2.png'
import gitlabIcon from './tech-icons/gitlab.png'
import bitbucketIcon from './tech-icons/bitbucket.png'
import notionIcon from './tech-icons/notion.png'
import jiraIcon from './tech-icons/jira.png'
import favroIcon from './tech-icons/favro.png'
import vsCodeIcon from './tech-icons/vscode.png'
import visualstudioIcon from './tech-icons/visualstudio.png'

const technologies = {
  // languages
  javascript: {
    name: 'JavaScript',
    abbreviation: 'JS',
    icon: jsIcon,
    tags: ['frontEnd', 'backEnd', 'programmingLanguage', 'baseWebTechnology'],
  },
  typescript: {
    name: 'TypeScript',
    abbreviation: 'TS',
    icon: tsIcon,
    tags: ['frontEnd', 'backEnd', 'programmingLanguage', 'javascript'],
  },
  csharp: {
    name: 'C#',
    abbreviation: 'C#',
    icon: csharpIcon,
    tags: ['frontEnd', 'backEnd', 'programmingLanguage'],
  },
  python: {
    name: 'Python',
    abbreviation: 'Python',
    icon: pythonIcon,
    tags: ['backEnd', 'programmingLanguage'],
  },
  java: {
    name: 'Java',
    abbreviation: 'Java',
    icon: javaIcon,
    tags: ['backEnd', 'programmingLanguage'],
  },
  // front-end
  html: {
    name: 'HTML',
    abbreviation: 'HTML',
    icon: htmlIcon,
    tags: ['frontEnd', 'markupLanguage', 'baseWebTechnology'],
  },
  css: {
    name: 'CSS',
    abbreviation: 'CSS',
    icon: cssIcon,
    tags: ['frontEnd', 'stylingLanguage', 'baseWebTechnology'],
  },
  sass: {
    name: 'Sass',
    abbreviation: 'Sass',
    icon: sassIcon,
    tags: ['frontEnd', 'stylingLanguage'],
  },
  // frameworks and libraries
  react: {
    name: 'React',
    abbreviation: 'React',
    icon: reactIcon,
    tags: ['frontEnd', 'library', 'javascript'],
  },
  vue: {
    name: 'Vue',
    abbreviation: 'Vue',
    icon: vueIcon,
    tags: ['frontEnd', 'framework', 'javascript'],
  },
  blazor: {
    name: 'Blazor',
    abbreviation: 'Blazor',
    icon: blazorIcon,
    tags: ['backEnd', 'frontEnd', 'framework', 'csharp'],
  },
  ionic: {
    name: 'Ionic',
    abbreviation: 'Ionic',
    icon: ionicIcon,
    tags: ['frontEnd', 'mobileDevelopment', 'framework', 'javascript'],
  },
  redux: {
    name: 'Redux',
    abbreviation: 'Redux',
    icon: reduxIcon,
    tags: ['frontEnd', 'stateManagement', 'javascript', 'library', 'react'],
  },
  vuex: {
    name: 'Vuex',
    abbreviation: 'Vuex',
    icon: vuexIcon,
    tags: ['frontEnd', 'stateManagement', 'javascript', 'library', 'vue'],
  },
  // version control
  git: {
    name: 'Git',
    abbreviation: 'Git',
    icon: gitIcon,
    tags: ['versionControl', 'tool'],
  },
  github: {
    name: 'GitHub',
    abbreviation: 'GitHub',
    icon: githubIcon,
    tags: ['versionControl', 'tool'],
  },
  gitlab: {
    name: 'GitLab',
    abbreviation: 'GitLab',
    icon: gitlabIcon,
    tags: ['versionControl', 'tool'],
  },
  bitbucket: {
    name: 'Bitbucket',
    abbreviation: 'Bitbucket',
    icon: bitbucketIcon,
    tags: ['versionControl', 'tool'],
  },
  // project management
  notion: {
    name: 'Notion',
    abbreviation: 'Notion',
    icon: notionIcon,
    tags: ['projectManagement', 'documentation', 'tool'],
  },
  jira: {
    name: 'Jira',
    abbreviation: 'Jira',
    icon: jiraIcon,
    tags: ['projectManagement', 'tool'],
  },
  favro: {
    name: 'Favro',
    abbreviation: 'Favro',
    icon: favroIcon,
    tags: ['projectManagement', 'tool'],
  },
  // development environment
  vsCode: {
    name: 'VS Code',
    abbreviation: 'VS Code',
    icon: vsCodeIcon,
    tags: ['developmentEnvironment', 'tool'],
  },
  visualstudio: {
    name: 'Visual Studio',
    abbreviation: 'Visual Studio',
    icon: visualstudioIcon,
    tags: ['developmentEnvironment', 'tool'],
  },
}

Object.keys(technologies).forEach((key) => {
  technologies[key].id = key
})

export default {
  personalInfo,
  conntactInfo: contactInfo,
  education,
  projects,
  highlightedProjects,
  workExperience,
  technologies,
  technologyCategories,
}
