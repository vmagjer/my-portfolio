import DiscordIcon from './socials/discord'
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
    name: 'discord',
    link: 'https://www.discordapp.com/users/473558727350419458',
    text: 'discordapp.com/users/vmagjer',
    icon: <DiscordIcon />,
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
