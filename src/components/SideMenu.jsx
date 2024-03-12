import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import data from '../assets/data'
import profilePicture from '../assets/images/profile-picture.jpg'
import { motion } from 'framer-motion'

const links = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
]

const sideSheetState = {
  hidden: 'hidden',
  peeking: 'peeking',
  visible: 'visible',
}

const navItemState = {
  hover: 'hover',
}

const navItemVariants = {
  [sideSheetState.hidden]: { x: -100 },
  [sideSheetState.peeking]: { x: -100 },
  [sideSheetState.visible]: { x: 0 },
  [navItemState.hover]: { x: 10 },
}

export default function SideMenu() {
  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={profilePicture} alt="profile" />
        <span>{`${data.personalInfo.fullName}`}</span>
      </ProfileSection>

      <Navigation>
        <NavList>
          {links.map((link) => (
            <StyledNavLink
              to={link.path}
              key={`nav-link-${link.id}`}
              className={linkClasses}
              variants={navItemVariants}
              transition={{ ease: 'easeInOut' }}
            >
              {link.title}
            </StyledNavLink>
          ))}
        </NavList>

        <NavList>
          <NavListHeader>Projects</NavListHeader>
          {Object.keys(data.projects).map((projectId) => (
            <StyledNavLink
              to={`/project/${projectId}`}
              key={projectId}
              variants={navItemVariants}
              transition={{ ease: 'easeInOut' }}
            >
              {data.projects[projectId].name}
            </StyledNavLink>
          ))}
        </NavList>
      </Navigation>

      <Footer>Made with ❤️ by {data.personalInfo.fullName} </Footer>
    </Container>
  )
}

function linkClasses({ isActive, isPending }) {
  if (isPending) return 'pending'
  if (isActive) return 'active'
  return ''
}

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #000;
  border-right: 1px solid #464646;
`

const ProfileSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 100%;
  margin-bottom: 10px;
  scale: -1 1;
`

const Navigation = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  justify-content: center;
`
const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const NavListHeader = styled.h3`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-bottom: 10px;
`
const StyledNavLink = styled(motion(NavLink))`
  padding: 10px;
  color: rgba(255, 255, 255, 0.7);
  flex: 1;
  text-decoration: none;
  &.active {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.8);
  }
`

const Footer = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`
