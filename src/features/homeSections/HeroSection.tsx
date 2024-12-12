import { useEffect, useState } from 'react'

import AvatarImage from '../../components/AvatarImage'
import Container from '../../components/layout/Container'
import InteractiveCanvasEffect from '../../components/InteractiveCanvasEffect'
import SwipeUp from '../../assets/SwipeUp'
import discordIcon from '../../assets/socials/discord.svg'
import emailIcon from '../../assets/socials/envelope.svg'
import githubIcon from '../../assets/socials/github.svg'
import linkedInIcon from '../../assets/socials/linkedin.svg'
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
      <SwipeUpIndicator
        style={{
          opacity: showScrollIndicator ? '1' : '0',
        }}
      />
      <Container>
        <Content>
          <AvatarImage src={profileImage} size="large" />
          <Title className="quicksand">Vlatko Magjer</Title>
          <SubTitle>
            Data Scientist, Frontend Developer, and Software Engineer
          </SubTitle>

          <SocialList>
            <SocialItem>
              <img src={emailIcon} alt="" />
            </SocialItem>
            <SocialItem>
              <img src={linkedInIcon} alt="" />
            </SocialItem>
            <SocialItem>
              <img src={discordIcon} alt="" />
            </SocialItem>
            <SocialItem>
              <img src={githubIcon} alt="" />
            </SocialItem>
          </SocialList>
        </Content>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  height: 90vh;
  color: #fff;
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
  font-size: 2.5rem;
  line-height: 3rem;
  margin-top: 0.5rem;
`
const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 0.5rem;
  opacity: 80%;
`
const SocialList = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 2rem;
`

const SocialItem = styled.a`
  width: 40px;
  height: 40px;

  background-color: #555555;
  border-radius: 50%;
  padding: 6px;

  transition: background-color  200ms ease-in-out, transform  200ms ease;

  img {
    width:100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    background-color: #476ed1;
    transform: scale(1.1);
  }
`

const SwipeUpIndicator = styled(SwipeUp)`
  width: 80px;
  height: 80px;

  fill: #221f23;
  stroke: #fff;
  stroke-width: 8;
  opacity: 0.7;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  transition: 'all 1s';
`
