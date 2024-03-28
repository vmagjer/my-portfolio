const personalInfo = {
  firstName: 'Vlatko',
  lastName: 'Magjer',
  fullName: 'Vlatko Magjer',
  city: 'Gornji Stupnik',
  county: 'Zagreb County',
  country: 'Croatia',
}

const conntactInfo = {
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
    year: '2023',
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
    year: '2020',
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
const projects = {
  verdigo: {
    name: 'Verdi Go',
    description:
      'Driver interface for a crowd-sourced delivery service. The mobile app features a map with real-time updates of the driver’s location, nearby orders, and the optimal routes to deliver them.',
    link: 'https://play.google.com/store/apps/details?id=verdi.go.development&pcampaignid=web_share',
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
    name: 'Verdi Farm',
    description:
      'Ecommerce platform selling fresh local produce and products from small businesses. The app required a custom CMS for the vendors to manage their products and orders.',
    link: 'https://verdi-farm.com/',
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
    name: 'A1 City Management System',
    description:
      'Web app for management of several A1’s CMS-s related to city management.',
    link: null,
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
    name: 'Moj Bankar',
    description:
      'Banking and insurance consulting web app featuring many dynamic forms and informative tools for consultees.',
    link: 'https://www.moj-bankar.hr/',
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
    name: 'Blok A3',
    description:
      'A web app for an architecture firm showcasing their work in an unconventional layout and featuring an image editor for prospective clients to edit and submit their own designs.',
    link: 'https://www.blok-a3.hr/',
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
const workExperience = [
  {
    position: 'Frontend Developer',
    description:
      'Developing and maintaining web applications and a mobile app.',
    company: 'LMB 1759 Export d.o.o.',
    type: 'contract',
    from: '2022-10-01',
    to: '2023-05-31',
    projects: ['verdigo', 'verdifarm'],
    contributions: [
      'Proactively implemented new features and improvements.',
      'Responsible for the entire frontend development process.',
    ],
  },
  {
    position: 'Frontend Developer',
    description: 'Developing web applications for various clients.',
    contributions: ['Created reusable components'],
    company: 'Mediatorium d.o.o.',
    type: 'contract',
    from: '2022-05-01',
    to: '2022-09-01',
    projects: ['a1cms'],
  },
  {
    position: 'Frontend Developer',
    description:
      'Developing and maintaining web applications for various clients.',
    contributions: ['Introduced React and Redux to the company’s tech stack.'],
    company: 'Mediatorium d.o.o.',
    type: 'contract',
    from: '2020-3-01',
    to: '2020-31-09',
    projects: ['mojBankar', 'blokA3'],
  },
]

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
import githubIcon from './tech-icons/github.png'
import gitlabIcon from './tech-icons/gitlab.png'
import bitbucketIcon from './tech-icons/bitbucket.png'
import jiraIcon from './tech-icons/jira.png'
import favroIcon from './tech-icons/favro.png'
import vsCodeIcon from './tech-icons/vscode.png'
import visualstudioIcon from './tech-icons/visualstudio.png'

const technologies = {
  javascript: {
    name: 'JavaScript',
    abbreviation: 'JS',
    icon: jsIcon,
  },
  typescript: {
    name: 'TypeScript',
    abbreviation: 'TS',
    icon: tsIcon,
  },
  react: {
    name: 'React',
    abbreviation: 'React',
    icon: reactIcon,
  },
  redux: {
    name: 'Redux',
    abbreviation: 'Redux',
    icon: reduxIcon,
  },
  vue: {
    name: 'Vue',
    abbreviation: 'Vue',
    icon: vueIcon,
  },
  vuex: {
    name: 'Vuex',
    abbreviation: 'Vuex',
    icon: vuexIcon,
  },
  blazor: {
    name: 'Blazor',
    abbreviation: 'Blazor',
    icon: blazorIcon,
  },
  ionic: {
    name: 'Ionic',
    abbreviation: 'Ionic',
    icon: ionicIcon,
  },
  html: {
    name: 'HTML',
    abbreviation: 'HTML',
    icon: htmlIcon,
  },
  css: {
    name: 'CSS',
    abbreviation: 'CSS',
    icon: cssIcon,
  },
  sass: {
    name: 'Sass',
    abbreviation: 'Sass',
    icon: sassIcon,
  },
  csharp: {
    name: 'C#',
    abbreviation: 'C#',
    icon: csharpIcon,
  },
  python: {
    name: 'Python',
    abbreviation: 'Python',
    icon: pythonIcon,
  },
  java: {
    name: 'Java',
    abbreviation: 'Java',
    icon: javaIcon,
  },
  git: {
    name: 'Git',
    abbreviation: 'Git',
    icon: gitIcon,
  },
  github: {
    name: 'GitHub',
    abbreviation: 'GitHub',
    icon: githubIcon,
  },
  gitlab: {
    name: 'GitLab',
    abbreviation: 'GitLab',
    icon: gitlabIcon,
  },
  bitbucket: {
    name: 'Bitbucket',
    abbreviation: 'Bitbucket',
    icon: bitbucketIcon,
  },
  jira: {
    name: 'Jira',
    abbreviation: 'Jira',
    icon: jiraIcon,
  },
  favro: {
    name: 'Favro',
    abbreviation: 'Favro',
    icon: favroIcon,
  },
  vsCode: {
    name: 'Visual Studio Code',
    abbreviation: 'VS Code',
    icon: vsCodeIcon,
  },
  visualstudio: {
    name: 'Visual Studio',
    abbreviation: 'Visual Studio',
    icon: visualstudioIcon,
  },
}

export default  {
  personalInfo,
  conntactInfo,
  education,
  projects,
  workExperience,
  technologies,
}
