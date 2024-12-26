import discordIcon from '../assets/socials/discord.svg'
import emailIcon from '../assets/socials/envelope.svg'
import githubIcon from '../assets/socials/github.svg'
import linkedInIcon from '../assets/socials/linkedin.svg'

// NO TELEPHONE NUMBER - SPAM PROTECTION
const contactInfo: { name: string, link: string, text: string, image: string }[] = [
  {
    name: 'email',
    link: "mailto:vlatko.magjer@gmail.com",
    text: "vlatko.magjer@gmail.com",
    image: emailIcon,
  },
  {
    name: 'linkedIn',
    link: "https://www.linkedin.com/in/vlatko-magjer",
    text: "linkedin.com/in/vlatko-magjer",
    image: linkedInIcon,
  },
  {
    name: 'discord',
    link: "https://www.discordapp.com/users/473558727350419458",
    text: "discordapp.com/users/vmagjer",
    image: discordIcon,
  },
  {
    name: 'github',
    link: "https://github.com/vmagjer",
    text: "github.com/vmagjer",
    image: githubIcon,
  }
]

export default {
  contactInfo,
}
