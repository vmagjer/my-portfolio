import { useEffect, useRef, useState } from 'react'
// import DigitalRainPerformant from "../utils/DigitalRainPerformant"
import DigitalRainPerformant from '../utils/DigitalRainObjectOriented'
import PropTypes from 'prop-types'

const TICK = 100

const DigitalRain = ({ className, text = '', layers = 1 }) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current

    // const digitalRain = new DigitalRainPerformant({canvas, numLayers: layers, density: 1, text})
    const digitalRain = new DigitalRainPerformant({
      canvas,
      numLayers: layers,
      density: 2,
      text,
    })

    const interval = setInterval(() => {
      requestAnimationFrame(digitalRain.tick)

      setMouse((m) => {
        digitalRain.updateCursorPosition(m.x, m.y)
        return m
      })
    }, TICK)

    return () => clearInterval(interval)
  }, [layers])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={className} />
    </>
  )
}

DigitalRain.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  layers: PropTypes.number,
}

export default DigitalRain
