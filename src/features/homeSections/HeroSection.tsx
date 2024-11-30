import { useEffect, useState } from 'react'

import AvatarImage from '../../components/AvatarImage'
import Container from '../../components/layout/Container'
import InteractiveCanvasEffect from '../../components/InteractiveCanvasEffect'
import SwipeUp from '../../assets/SwipeUp'
import profileImage from '../../assets/images/profile-picture-happy.jpg'
import styled from 'styled-components'

type HeroSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export default function HeroSection({ ...rest }: HeroSectionProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    let hasScrolled = false

    const showScrollIndicatorOnTimeout = setTimeout(() => {
      if (!hasScrolled) return

      setShowScrollIndicator(true)
    }, 3000)

    function handleScroll() {
      hasScrolled = true
      setShowScrollIndicator(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(showScrollIndicatorOnTimeout)
    }
  }, [])

  return (
    <Root {...rest}>
      <InteractiveCanvasEffect />
      
      <div className="hero-content">
        <AvatarImage src={profileImage} size="large" />
        <h1 className="quicksand">Vlatko Magjer</h1>
        <p>Data Scientist, Frontend Developer, and Software Engineer</p>
        <p>mail linkedin github</p>
      </div>
      <SwipeUpIndicator
        style={{
          opacity: showScrollIndicator ? '1' : '0',
          transition: 'all 1s',
        }}
      />
    </Root>
  )
}

const Root = styled(Container)`
  height: 100vh;
  color: #fff;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .hero-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
  }
`

const SwipeUpIndicator = styled(SwipeUp)`
  width: 80px;
  height: 80px;

  fill: black;
  stroke: #fff;
  stroke-width: 8;
  opacity: 0.7;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`
