import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'

import Container from '../../components/layout/Container'
import SwipeUp from '../../assets/SwipeUp'
import { bloomIn } from '../../assets/animations'
import data from '../../assets/data'

const playIntroAnimations = () => {
  const delay = 500
  const buttons = document.querySelectorAll('.social-button')
  const delays = [0, 125 / 2, 250 / 2, 375 / 2]
  buttons.forEach((btn, i) => {
    btn.animate(bloomIn, {
      duration: 250,
      delay: delay + delays[i],
      fill: 'both',
      easing: 'ease-out',
    })
  })
}

type HeroSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export default function HeroSection({ ...rest }: HeroSectionProps) {
  // play the intro animations on component mount
  useEffect(() => {
    playIntroAnimations()
  }, [])

  // show/hide scroll indicator
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
      <SwipeUpIndicator $show={showScrollIndicator} />
      <Container>
        <Content>
          <PreTitle className="greeting">
            <span>Hello, </span> <span>I&apos;m</span>
          </PreTitle>
          <Title className="title">Vlatko Magjer</Title>

          <Text className="text">
            a software developer interested in building robust information
            systems and delightful user experiences.
          </Text>
          {/* <Text className="text">
            a <b>software developer</b> based near Zagreb, RH. I hold a Masters degree
            in Computer Science and have a worked on a wide range of frontend
            projects you can browse below.
          </Text> */}
          {/* <Text className="text">
            I&apos;m interested in building robust information systems and
            delightful user experiences.
          </Text> */}
          <SocialList>
            {data.contactInfo.map((ci) => (
              <SocialItem
                key={'hero-social-' + ci.name}
                href={ci.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="social-button bloom-in-animation">
                  {ci.icon}
                </div>
              </SocialItem>
            ))}
          </SocialList>
        </Content>
      </Container>
      {/* <button onClick={playIntroAnimations}> Replay intro</button> */}
    </Root>
  )
}

const Root = styled.div`
  height: 80vh;
  position: relative;

  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: var(--section-surface);
  background: radial-gradient(
    circle closest-side at 30% 50%,
    var(--primary-100) 20%,
    transparent 100%
  );
`

const Content = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`

const PreTitle = styled.p`
  margin-bottom: 0.25rem;

  color: var(--color-subtitle);
  font-size: 0.75rem;
  line-height: 0.75rem;
  text-transform: uppercase;
`
const Title = styled.h1`
  margin-top: 0rem;

  font-size: 2.5rem;
  line-height: 2.5rem;
  color: var(--color-title);

  display: inline-block;
`
const Text = styled.p`
  color: var(--color-body);
  max-width: 80ch;
`

const SocialList = styled.div`
  display: flex;
  /* justify-content: center; */
  gap: 16px;
  margin-top: 2rem;
`

const bounceHeight = 6
const bouncyAnimation = keyframes`
  0% {
    top: 10%;
    scale: 1 0.9;    
    rotate: 0deg;
  }
  /* jump up */
  12.5% {
    top: -${bounceHeight * 0.7}px;
    scale: 1 1;    
  }
  /* tilt to one side */
  25% {
    top: -${bounceHeight}px;
    rotate: 10deg;
  }
  /* drop */
  37.5% {
    top: -${bounceHeight * 0.7}px;
    scale: 1 1;   
  }
  50% {
    top: 10%;
    scale: 1 0.9;    
    rotate: 0deg;
  }
  /* jump up */
  62.5% {
    top: -${bounceHeight * 0.7}px;
    scale: 1 1;      
  }
  /* tilt to the other side */
  75% {
    top: -${bounceHeight}px;
    rotate: -10deg;
  }
  /* drop */
  87.5% {
    top: -${bounceHeight * 0.7}px;
    scale: 1 1;    
  }
  100% {
    top: 10%;
    scale: 1 0.9;    
    rotate: 0deg;
  }
`

const SocialItem = styled.a`
  .social-button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;

    background: var(--primary-500);
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.12),
      inset 0 1px 1px rgba(255, 255, 255, 0.12);
    border-radius: 50%;

    padding: 6px;

    transition: background-color 200ms ease-in-out;

    position: relative;

    svg {
      width: 28px;
      height: 28px;
      object-fit: contain;
      fill: white;
    }
  }

  &:hover .social-button {
    background: var(--primary-600);
    animation: ${bouncyAnimation} 1s infinite;
    animation-composition: replace;
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.5);
  }
`

const SwipeUpIndicator = styled(SwipeUp)<{ $show: boolean }>`
  width: 80px;
  height: 80px;
  fill: #221f23;
  stroke: #fff;
  stroke-width: 8;
  opacity: ${({ $show: show }) => (show ? 0.7 : 0)};
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 1s;
`
