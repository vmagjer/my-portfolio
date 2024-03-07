import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import data from '../assets/data'
import profilePicture from '../assets/images/profile-picture.jpg'

const links = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
]

const menuWidth = 300
const menuPeekSpace = 100

const SHOW_THRESHOLD = menuWidth
const PEEK_THRESHOLD = menuWidth + menuPeekSpace

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)

  useEffect(() => {
    const mousePosition = { x: 0, y: 0 }

    const handleMouseMove = (event) => {
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
      update()
    }

    const handleScroll = () => {
      update()
    }

    const update = () => {
      const isWithinThreshold = mousePosition.x < SHOW_THRESHOLD
      const isWithinPeekThreshold = mousePosition.x < PEEK_THRESHOLD
      const isTopOfPage = window.scrollY < 10

      setIsPeeking(isWithinPeekThreshold)
      setIsOpen(isWithinThreshold || isTopOfPage)
      controlButtonMovement(mousePosition)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <MenuButton id="menu-button"></MenuButton>

      <Container $isOpen={isOpen} $isPeeking={isPeeking}>
        <ProfileSection>
          <ProfileImage src={profilePicture} alt="profile" $rotate={isOpen} />
          <span>{`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}</span>
        </ProfileSection>

        <Navigation>
          <NavList>
            {links.map((link) => (
              <StyledNavLink
                to={link.path}
                key={`nav-link-${link.id}`}
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'active' : ''
                }
              >
                {link.title}
              </StyledNavLink>
            ))}
          </NavList>
          <NavList>
            <NavListHeader>Projects</NavListHeader>
            {Object.keys(data.projects).map((projectId) => (
              <StyledNavLink to={`/project/${projectId}`} key={projectId}>
                {data.projects[projectId].name}
              </StyledNavLink>
            ))}
          </NavList>
        </Navigation>
        <Footer>
          Made with ❤️ by {data.personalInfo.firstName}
        </Footer>
      </Container>
    </>
  )
}

export default SideMenu

const menuButtonOffset = 100
const menuButtonSize = 60

const controlButtonMovement = (mouse) => {
  let translationX = buttonPositionX(
    mouse.x,
    mouse.y,
    menuWidth + menuPeekSpace + 100,
    menuWidth
  )
  let translationY = 0

  const button = document.getElementById('menu-button')
  button.style.transform = `translateY(calc(-50% + ${translationY}px)) translateX(${-translationX}px)`
}

const buttonPositionX = (
  x,
  y,
  startsAt = 0.4 * window.innerWidth,
  endsAt = 0.15 * window.innerWidth
) => {
  const startThreshold = startsAt
  if (x > startThreshold) return 0

  const staticFrictionThreshold = endsAt
  const squishingDistance = startThreshold - staticFrictionThreshold
  if (x > staticFrictionThreshold) {
    const progress = 1 - (x - staticFrictionThreshold) / squishingDistance
    return progress * 80
  }

  return 160
}

const MenuButton = styled.div`
  position: fixed;
  top: 50%;
  left: ${menuButtonOffset}px;
  z-index: 1000;
  transform: translateY(-50%);
  transition: transform 0.2s;

  padding: 20px;
  color: white;
  background-color: black;
  
  width: ${menuButtonSize}px;
  height: ${menuButtonSize}px;
  border-radius: 10000px;
`

const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${menuWidth}px;
  z-index: 1000;

  transform: translateX(
    ${(props) => {
      if (props.$isOpen) return '0'
      if (props.$isPeeking) return '-94%'
      return '-100%'
    }}
  );
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #000;
  border-right: 1px solid #464646;
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
const StyledNavLink = styled(NavLink)`
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

  rotate: ${(props) => {
    if (props.$rotate) return '0deg'
    return '-180deg'
  }};
  scale: -1 1;
  transition: rotate 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`

const Footer = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`