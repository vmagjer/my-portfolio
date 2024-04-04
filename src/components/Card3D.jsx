import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCardMeasures } from '../utils/cardMeasures'

Card3D.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
}

// CARE: angle mustn't be smaller than 5 degrees or the visual breaks
const maxTiltAngle = (5 * Math.PI) / 180
const maxDepth = 60
const perspective = 2000
const cardWidth = 300
const cardHeight = 400

const { backLength: peekDistanceX, frontLength: frameWidthX } =
getCardMeasures(cardWidth, maxDepth, perspective, maxTiltAngle)
const { backLength: peekDistanceY, frontLength: frameWidthY } =
getCardMeasures(cardHeight, maxDepth, perspective, maxTiltAngle)
const imgWidth = cardWidth - peekDistanceX * 2
const aspectRatio = 4/3
const imgHeight = imgWidth / aspectRatio
const frameInnerHeight = cardWidth / aspectRatio - frameWidthY * 2

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

function Card3D({ data }) {
  const cardRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      update(event)
    }

    const update = (mouse) => {
      if (!cardRef.current) return

      const card = cardRef.current
      const cardRect = card.getBoundingClientRect()
      const cardCenter = {
        x: cardRect.left + cardRect.width / 2,
        y: cardRect.top + cardRect.height / 2,
      }
      const distance = {
        x: mouse.clientX - cardCenter.x,
        y: mouse.clientY - cardCenter.y,
      }
      const rectDistance = {
        x: Math.abs(distance.x) - cardRect.width / 2,
        y: Math.abs(distance.y) - cardRect.height / 2,
      }
      
      // ease tilt intensity outside of the card
      const maxRectDistance = Math.max(rectDistance.x, rectDistance.y)
      const easingDistance = cardWidth * 0.3
      let intensity = 0
      if (maxRectDistance < 0) {
        intensity = 1
      } else if (maxRectDistance < easingDistance) {
        intensity = 1 - easeInOutSine(maxRectDistance / easingDistance)
      }

      const maxAngle = maxTiltAngle

      const tiltX = intensity * (distance.y / cardRect.height) * 2 * maxAngle
      const tiltY = intensity * -(distance.x / cardRect.width) * 2 * maxAngle
      card.style.transform = `rotateX(${-tiltX}rad) rotateY(${-tiltY}rad)`

      if (!frameRef) return
      const frame = frameRef.current
      frame.style.background = ` #313131 radial-gradient(
        circle at ${50 + (tiltY / maxAngle) * 40}% ${
        20 + (-tiltX / maxAngle) * 40
      }%,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0) 70%
      )`
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Wrapper>
      <Card ref={cardRef}>
        <img src={data.image} alt="" />
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
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: ${cardWidth}px;
  height: ${cardHeight}px;

  border-radius: 17px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

  position: relative;

  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;

  cursor: pointer;

  img {
    position: absolute;
    left: calc(${peekDistanceX}px);
    top: calc(${peekDistanceY}px);
    width: ${imgWidth}px;
    height: ${imgHeight}px;
    transform: translateZ(${-maxDepth}px);
    border-radius: 8px;    

    object-fit: cover;
    object-position: 0 0;
  }
`
const Frame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${frameWidthY + 200 + 8}px ${frameWidthX}px ${frameWidthY}px
    ${frameWidthX}px;
  box-sizing: border-box;

  transform: translateZ(00px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;

  --frame-width-x: ${frameWidthX}px;
  --frame-width-y: ${frameWidthY}px;
  --frame-window-width: ${cardWidth - 2 * frameWidthX}px;
  --frame-window-height: ${frameInnerHeight}px;
  clip-path: polygon(
    0% 0%,
    0% 100%,
    var(--frame-width-x) 100%,
    var(--frame-width-x) var(--frame-width-y),
    calc(100% - var(--frame-width-x)) var(--frame-width-y),
    calc(100% - var(--frame-width-x))
      calc(var(--frame-width-y) + var(--frame-window-height)),
    var(--frame-width-x) calc(var(--frame-width-y) + var(--frame-window-height)),
    var(--frame-width-x) 100%,
    100% 100%,
    100% 0%
  );
  background: #313131
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0) 70%
    );
  border-radius: 16px;
`
const Title = styled.h3`
  color: white;
`
