import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

Card3D.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
}

function Card3D({ data }) {
  const cardRef = useRef(null)

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
      let intensity = 1
      if (maxRectDistance < 20) {
        intensity = 1 - maxRectDistance / 20
      } else {
        intensity = 0
      }

      const maxAngle = 4
      const tiltX = Math.max(
        -maxAngle,
        // Math.min(maxAngle, (distance.y / cardCenter.y) * maxAngle) 
        Math.min(maxAngle, (distance.y / cardRect.width) * maxAngle) 
      )
      const tiltY = Math.max(
        -maxAngle,
        Math.min(maxAngle, -(distance.x / cardRect.height) * maxAngle)
      )
      card.style.transform = `perspective(2000px) rotateX(${-tiltX * intensity}deg) rotateY(${-tiltY * intensity}deg)`

      const shadowX = (mouse.x - cardCenter.x) / 20
      const shadowY = (mouse.y - cardCenter.y) / 20
      card.style.boxShadow = `${shadowX}px ${shadowY}px 16px rgba(0, 0, 0, 0.1)`
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Card ref={cardRef}>
      <img src={data.image} alt="" />
    </Card>
  )
}

export default Card3D

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 400px;
  background-color: #ff00c8;
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  cursor: pointer;
`
