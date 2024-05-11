import { useEffect, useRef } from 'react'
import DigitalRainController from '../utils/digitalRain/DigitalRainController'

const TICK = 100

type DigitalRainProps = {
  className?: string
  text?: string
  layers?: number
}
const DigitalRain = ({ className, text = '', layers = 1 }:DigitalRainProps) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

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
  }, [layers, text, canvasRef])

  return (
    <>
      <canvas ref={canvasRef} className={className} />
    </>
  )
}

export default DigitalRain
