import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import data from '../assets/data'
import profilePicture from '../assets/images/profile-picture.jpg'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const links = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
]

const navItemState = {
  hover: 'hover',
}

const navItemVariants = {
  [navItemState.hover]: { paddingLeft: '16px', transition: { ease: 'easeInOut' } },
}

export default function SideMenu() {
  const containerRef = useRef(null)

  useEffect(() => {
    const updateContainerRotation = (e) => {
      const el = containerRef.current
      if (!el) return
      const x = e.clientX - el.getBoundingClientRect().x
      const width = el.getBoundingClientRect().width
      const percent = x / width
      const maxRotation = 8
      let val = 0
      if (percent <= 0 ) {
        val = -maxRotation
      } else if (percent >= 1) {
        val = maxRotation
      } else if (percent <= 0.2) {
        val = Math.max(-maxRotation, -maxRotation * (-(percent - 0.2) / 0.2))
      } else if (percent <= 0.8) {
        val = 0
      } else {
        val = Math.min(maxRotation, maxRotation * ((percent - 0.8) / 0.2))
      }
      el.style.setProperty('--rotation', val.toFixed(2) + 'deg')
    }

    window.addEventListener('mousemove', updateContainerRotation)
    return () => window.removeEventListener('mousemove', updateContainerRotation)
  }, [containerRef])

  return (
    <Container ref={containerRef}>
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
              whileHover={navItemState.hover}
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
              whileHover={navItemState.hover}
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
  position: sticky;
  top: 8px;
  height: calc(100vh - 16px);
  width: 100%;
  border-radius: 8px;

  transform: perspective(2000px) rotateY(var(--rotation, 8deg));
  transition: transform 0.2s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #000;
  border: 1px solid #464646;
  margin: 8px 8px;
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
  gap: 40px;
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
    color: rgba(255, 255, 255, 1);
    padding-left: 16px;
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
