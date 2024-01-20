import { useEffect, useRef } from "react"
import DigitalRainPerformant from "../utils/DigitalRainPerformant"
const TICK = 100

import PropTypes from "prop-types";

const DigitalRain = ({ className, text = "", layers = 1 }) => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const digitalRain = new DigitalRainPerformant(canvas, layers)

    const interval = setInterval(() => {
      requestAnimationFrame(digitalRain.tick)
    }, TICK)

    return () => clearInterval(interval)
  }, [layers])

  return (
    <>
      <canvas ref={canvasRef} className={className}/>
    </>
  )
}

DigitalRain.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  layers: PropTypes.number,
};

export default DigitalRain
