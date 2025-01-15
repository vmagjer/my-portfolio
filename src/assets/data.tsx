import CodePenIcon from './socials/codepen'
import EnvelopeIcon from './socials/envelope'
import GithubIcon from './socials/github'
import LinkedInIcon from './socials/linkedin'

// NO TELEPHONE NUMBER - SPAM PROTECTION
const contactInfo: {
  name: string
  link: string
  text: string
  icon: React.ReactNode
}[] = [
  {
    name: 'email',
    link: 'mailto:vlatko.magjer@gmail.com',
    text: 'vlatko.magjer@gmail.com',
    icon: <EnvelopeIcon />,
  },
  {
    name: 'linkedIn',
    link: 'https://www.linkedin.com/in/vlatko-magjer',
    text: 'linkedin.com/in/vlatko-magjer',
    icon: <LinkedInIcon />,
  },
  {
    name: 'codePen',
    link: 'https://codepen.io/Vlatko-Magjer',
    text: 'codepen.io/Vlatko-Magjer',
    icon: <CodePenIcon />,
  },
  {
    name: 'github',
    link: 'https://github.com/vmagjer',
    text: 'github.com/vmagjer',
    icon: <GithubIcon />,
  },
]

export default {
  contactInfo,
}
