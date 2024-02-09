import { useEffect, useRef } from 'react'
import DigitalRainController from '../utils/DigitalRainObjectOriented'
import PropTypes from 'prop-types'

const TICK = 100

const DigitalRain = ({ className, text = '', layers = 1 }) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current

    const digitalRain = new DigitalRainController({
      canvas,
      numLayers: layers,
      density: 2,
      text,
    })

    const interval = setInterval(() => {
      requestAnimationFrame(digitalRain.tick)
    }, TICK)

    return () => clearInterval(interval)
  }, [layers])

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
