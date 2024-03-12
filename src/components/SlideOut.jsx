import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'


const menuWidth = 300
const menuPeekSpace = 100

const SHOW_THRESHOLD = menuWidth
const PEEK_THRESHOLD = menuWidth + menuPeekSpace

const sideSheetState = {
  hidden: 'hidden',
  peeking: 'peeking',
  visible: 'visible',
}

const navVariants = {
  [sideSheetState.hidden]: { x: '-100%' },
  [sideSheetState.peeking]: { x: '-96%' },
  [sideSheetState.visible]: {
    x: 0,
    transition: {
      staggerChildren: 0.05,
      ease: 'easeIn',
    },
  },
}

SideMenu.propTypes = {
  children: PropTypes.node,
}

export default function SideMenu({children}) {
  const [menuState, setMenuState] = useState(sideSheetState.hidden)

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
      const isTopOfPage = window.scrollY < 10
      const isWithinPeekThreshold = mousePosition.x < PEEK_THRESHOLD

      setMenuState(() => {
        if (isWithinThreshold || isTopOfPage) return sideSheetState.visible
        if (isWithinPeekThreshold) return sideSheetState.peeking
        return sideSheetState.hidden
      })
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

      <Container
        animate={menuState}
        variants={navVariants}
        transition={{ ease: 'easeInOut' }}
        initial={false}
      >
        {children}
      </Container>
    </>
  )
}

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
    return progress * 40
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

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${menuWidth}px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #000;
  border-right: 1px solid #464646;
`