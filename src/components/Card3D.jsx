import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

Card3D.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
}

const maxTiltAngle = toRad(8)
const maxDepth = 60
const perspective = 2000
const cardWidth = 300
const cardHeight = 400

const { peekDistance: peekDistanceX, frameWidth: frameWidthX } =
  getPeekDistanceAndFrameWidth(maxTiltAngle, maxDepth, perspective, cardWidth)
const { peekDistance: peekDistanceY, frameWidth: frameWidthY } =
  getPeekDistanceAndFrameWidth(maxTiltAngle, maxDepth, perspective, cardHeight)

function toRad(deg) {
  return (deg * Math.PI) / 180
}
function getPeekDistanceAndFrameWidth(angle, depth, perspective, width) {
  const beta = Math.PI / 2 - angle
  const wHalf = width / 2
  const c = Math.sqrt(
    wHalf ** 2 + perspective ** 2 - 2 * wHalf * perspective * Math.cos(beta)
  )
  const phi = Math.asin((wHalf * Math.sin(beta)) / c)
  const x = Math.tan(beta + phi) / depth

  const shorterSide = c + Math.sqrt(x ** 2 + depth ** 2)
  const bgWidth = width - x * 2
  const longerSide = Math.sqrt(
    bgWidth ** 2 +
      shorterSide ** 2 -
      2 * bgWidth * shorterSide * Math.cos(Math.PI - beta - phi)
  )
  const gamma =
    Math.asin((bgWidth * Math.sin(Math.PI - beta - phi)) / longerSide) - phi
  const f = perspective * Math.tan(gamma)
  const delta = Math.PI - (Math.PI / 2 - gamma)
  const zetta = Math.PI - angle - delta
  const frameWidth = wHalf - (f / Math.sin(zetta)) * Math.sin(delta)

  return { peekDistance: x + 6, frameWidth: frameWidth + 10 }
}
function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

function Card3D({ data }) {
  const cardRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    // const mousePosition = { x: 0, y: 0 }

    const handleMouseMove = (event) => {
      // mousePosition.x = event.clientX
      // mousePosition.y = event.clientY
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
      const maxRectDistance = Math.max(rectDistance.x, rectDistance.y)

      const easingDistance = cardWidth * 0.3
      let intensity = 0
      if (maxRectDistance < 0) {
        intensity = 1
      } else if (maxRectDistance < easingDistance) {
        intensity = 1 - easeInOutSine(maxRectDistance / easingDistance)
      }
      console.log(intensity)

      const maxAngle = maxTiltAngle

      const tiltX = intensity * (distance.y / cardRect.width) * 2 * maxAngle
      const tiltY = intensity * -(distance.x / cardRect.height) * 2 * maxAngle
      card.style.transform = `rotateX(${-tiltX}rad) rotateY(${-tiltY}rad)`

      const shadowX = (mouse.x - cardCenter.x) / 20
      const shadowY = (mouse.y - cardCenter.y) / 20
      card.style.boxShadow = `${shadowX}px ${shadowY}px 16px rgba(0, 0, 0, 0.1)`

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
  perspective: 2000px;
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
    width: calc(100% - ${peekDistanceX * 2}px);
    height: calc(300px);
    transform: translateZ(${-maxDepth}px);
    border-radius: 8px;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.1) inset;
      border-radius: 8px;
    }
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
  --frame-window-width: calc(100% - var(--frame-width-x) * 2);
  --frame-window-height: 200px;
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
