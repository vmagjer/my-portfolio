import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import data from '../assets/data'
import profilePicture from '../assets/images/profile-picture.jpg'

const links = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About', path: '/about'},
  { id: 'contact', title: 'Contact', path: '/contact'},
  { id: 'projects', title: 'Projects', path: '/project'},
]

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event) => {
      controlNav(event)
      controlButtonMovement(event)
    }

    const controlNav = (event) => {
      const isWithinThreshold = event.clientX / window.innerWidth < 0.15
      const isWithinPeekThreshold = event.clientX / window.innerWidth < 0.3
      setIsPeeking(isWithinPeekThreshold)
      setIsOpen(isWithinThreshold)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <Wrapper>
      <AttractiveButton id="attractive-button"></AttractiveButton>

      <Container $isOpen={isOpen} $isPeeking={isPeeking}>
        <Profile>
          <ProfileImage src={profilePicture} alt="profile" $rotate={isOpen} />
          <span>{`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}</span>
        </Profile>

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
        </Navigation>
      </Container>
    </Wrapper>
  )
}

export default SideMenu

const menuButtonOffset = 100
const menuButtonSize = 60


const controlButtonMovement = (event) => {
  const distanceFromRight = window.innerWidth - event.clientX
  const progressX = distanceFromRight / window.innerWidth

  const distanceFromTop = event.clientY
  const offsetFromMiddle = window.innerHeight / 2 - distanceFromTop

  let translationX = buttonPosition(progressX)
  let translationY = -offsetFromMiddle * 0.3 * (1 - progressX * 0.5)

  const button = document.getElementById('attractive-button')
  button.style.transform = `translateY(calc(-50% + ${translationY}px)) translateX(${-translationX}px)`
}

/**
 * Button moves towards the edge of the screen, slows significantly, then moves completely to the edge
 * 
 * @param {number} progress number between 0 and 1
 * @returns 
 */
const buttonPosition = (progress) => {
  const slackEnd = 0.6
  const tensingEnd = 0.7
  const tenseEnd = 0.7
  const highlyTenseEnd = 0.85

  const tensingDistance = 40
  const highlyTensingDistance = 40
  const giveDistance = menuButtonOffset
  // slack
  if (progress < slackEnd) {
    return 0
    // tensing
  } else if (progress < tensingEnd) {
    return (tensingDistance * (progress - slackEnd)) / (tensingEnd - slackEnd)
    // tense
  } else if (progress < tenseEnd) {
    return 10
    // highly tensing
  } else if (progress < highlyTenseEnd) {
    return (
      tensingDistance +
      (highlyTensingDistance * (progress - tenseEnd)) /
        (highlyTenseEnd - tenseEnd)
    )
    // give
  } else {
    return giveDistance
  }
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${menuButtonOffset + menuButtonSize}px;
`

const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  width: 300px;
  z-index: 1000;

  transform: translateX(
    ${(props) => {
      if (props.$isOpen) return '0'
      if (props.$isPeeking) return '-94%'
      return '-100%'
    }}
  );
  transition: transform 0.3s;

  display: flex;
  flex-direction: column;

  background: #000;
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

const Profile = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 10px;
`

const AttractiveButton = styled.div`
  position: fixed;
  top: 50%;
  left: ${menuButtonOffset}px;
  z-index: 1000;
  transform: translateY(-50%);
  transition: transform 0.15s;

  padding: 20px;
  color: white;
  background-color: black;
  cursor: pointer;

  width: 60px;
  height: 60px;
  border-radius: 10000px;
`
