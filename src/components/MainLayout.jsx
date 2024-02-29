import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SideMenu from './SideMenu'


const menuButtonOffset = 16
export default function MainLayout({ children }) {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event) => {
      controlNav(event)
      controlButtonAttraction(event)
    }
    const controlNav = (event) => {
      const isWithinThreshold = event.clientX / window.innerWidth < 0.1
      setShowNav(isWithinThreshold)
    }

    const controlButtonAttraction = (event) => {
      const targetX = menuButtonOffset
      const targetY = window.innerHeight / 2
      const distanceX = event.clientX - targetX
      const distanceY = event.clientY - targetY
      
      const radius = 800
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      const progress = 1 - distance / radius

      let translationX = 0
      let translationY = 0
      if (progress > 0) {
        translationX = distanceX * progress
        translationY = distanceY * progress
      }

      const button = document.getElementById('attractive-button')
      button.style.transform = `translateY(calc(-50% + ${translationY}px)) translateX(${translationX}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Container>
      <AttractiveButton id="attractive-button">MENU</AttractiveButton>
      <SideMenu isOpen={showNav} />

      <Content>
        {children}
        <Footer>footer</Footer>
      </Content>
    </Container>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
`
const AttractiveButton = styled.div`
  position: fixed;
  top: 50%;
  left: ${menuButtonOffset}px;
  z-index: 1000;
  transform: translateY(-50%);
  transition: transform 0.01s;

  padding: 20px;
  color: white;
  background-color: black;
  cursor: pointer;

  width: 60px;
  height: 60px;
  border-radius: 10000px;
`


const Content = styled.div``

const Footer = styled.div`
  background-color: #f5f5f5;
  border-top: 1px solid #e7e7e7;
  padding: 10px 0;
  width: 100%;
`
