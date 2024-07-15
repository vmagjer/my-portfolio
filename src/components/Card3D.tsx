import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const maxTiltAngle = (20 * Math.PI) / 180
const maxDepth = 50
const perspective = 2000
const cardSize = 600

function easeInOutSine(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

function Card3D({ data }: { data: { name: string; image: string[] } }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      update(event)
    }

    const update = (mouse: MouseEvent) => {
      if (!cardRef.current) return

      const card = cardRef.current
      const cardRect = card.getBoundingClientRect()
      const cardCenter = {
        x: cardRect.left + cardRect.width / 2,
        y: cardRect.top + cardRect.height / 2,
      }
      const radius = cardRect.width / 2
      const distance = {
        x: mouse.clientX - cardCenter.x,
        y: mouse.clientY - cardCenter.y,
      }

      const d = Math.sqrt(distance.x ** 2 + distance.y ** 2) - radius

      // ease tilt intensity outside of the card
      const easingDistance = cardSize * 0.3
      let intensity = 0
      if (d < 0) {
        intensity = 1
      } else if (d < easingDistance) {
        intensity = 1 - easeInOutSine(d / easingDistance)
      }

      const maxAngle = maxTiltAngle

      const tiltX = intensity * (distance.y / cardRect.height) * 2 * maxAngle
      const tiltY = intensity * -(distance.x / cardRect.width) * 2 * maxAngle
      card.style.transform = `rotateX(${-tiltX}rad) rotateY(${-tiltY}rad)`

      // control the shine animation
      const frame = frameRef.current
      if (!frame) return

      const shineAngle = Math.PI / 2 - Math.atan2(distance.y, distance.x)
      frame.style.setProperty('--shine-angle', `${-shineAngle}rad`)
      frame.style.setProperty('--shine-intensity', `${intensity * 100}%`)
      // const shineDistance = intensity * 100
      // frame.style.setProperty('--shine-distance', `${shineDistance}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Wrapper>
      <Card ref={cardRef}>
        {data.image.map((image, index) => {
          const distance = (index / data.image.length) ** 0.5 * maxDepth
          return (
            <ImageFrame key={image} distance={distance}>
              <img src={image} alt="" />
            </ImageFrame>
          )
        })}
        <BottomSide />
        <Frame ref={frameRef}>
          <Title>{data.name}</Title>
        </Frame>
      </Card>
    </Wrapper>
  )
}

export default Card3D

const Wrapper = styled.div`
  perspective: ${perspective}px;
  pointer-events: painted;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: ${cardSize}px;
  height: ${cardSize}px;

  position: relative;

  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
`

import frogCardImage from '../assets/images/chockolate-frog-card.png'
import frameMask from '../assets/images/chockolate-frog-card-mask.png'

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  transform: translateZ(00px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;

  background: url(${frogCardImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  cursor: pointer;

  --shine-angle: 0deg;
  --shine-distance: 0%;
  --shine-intensity: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: linear-gradient(
      var(--shine-angle),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    );
    background-size: 100% 100%;
    background-position: calc(var(--shine-distance) + 50%) 0;
    opacity: var(--shine-intensity);

    mask-image: url(${frameMask}); /* Mask to constrain the shiny effect */
    mask-size: cover;
    mask-position: center;
    mask-repeat: no-repeat;
  }
`
const Title = styled.h3`
  position: absolute;
  bottom: 13.9%;
  left: 0;
  color: black;
  width: 100%;

  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
`

const ImageFrame = styled.div<{ distance: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(${(props) => props.distance + -maxDepth}px);

  img {
    position: absolute;
    left: ${25}%;
    top: ${25}%;
    width: ${50}%;
    height: ${60}%;

    object-fit: cover;
    object-position: center;
  }
`

const BottomSide = styled.div`
  --edge-height: 16px;
  width: ${cardSize * 0.572}px;
  height: var(--edge-height);
  box-sizing: border-box;
  background-color: #15121d;

  will-change: transform;
  position: absolute;
  bottom: ${cardSize * 0.055}px;
  left: 50%;
  transform: translate3d(-50%, 0, calc(var(--edge-height) * -0.5 + 1px))
    rotateX(90deg);
`
