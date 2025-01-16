import { useEffect, useState } from 'react'

import AvatarImage from '../../components/AvatarImage'
import Container from '../../components/layout/Container'
import InteractiveCanvasEffect from '../../components/InteractiveCanvasEffect'
import SwipeUp from '../../assets/SwipeUp'
import data from '../../assets/data'
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
      <SwipeUpIndicator show={showScrollIndicator} />
      <Container>
        <Content>
          <AvatarImage src={profileImage} size="large" />
          <Title>Vlatko Magjer</Title>
          <SubTitle>
            Frontend Developer, Software Engineer and Explorer
          </SubTitle>
          <SocialList>
            {data.contactInfo.map((ci) => (
              <SocialItem
                key={'hero-social-' + ci.name}
                href={ci.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ci.icon}
              </SocialItem>
            ))}
          </SocialList>
        </Content>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  height: 85vh;
  position: relative;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h1`
  margin-top: 0.5rem;
  font-size: 2.5rem;
  line-height: 3rem;
  color: var(--color-title);
`

const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 0.5rem;
  color: var(--color-body);
`

const SocialList = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 2rem;
`

const SocialItem = styled.a`
  width: 40px;
  height: 40px;
  background: var(--color-link-hover);
  border-radius: 50%;
  padding: 6px;
  transition: background-color 200ms ease-in-out, transform 200ms ease;

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: white;
  }

  &:hover {
    background-color: var(--color-link);
    transform: scale(1.1);
  }
`

const SwipeUpIndicator = styled(SwipeUp)<{ show: boolean }>`
  width: 80px;
  height: 80px;
  fill: #221f23;
  stroke: #fff;
  stroke-width: 8;
  opacity: ${({ show }) => (show ? 0.7 : 0)};
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 1s;
`
