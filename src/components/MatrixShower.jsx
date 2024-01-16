import { useEffect, useRef, useState } from "react"
import DigitalRain from "../utils/DigitalRain"
const TICK = 100

const MatrixShower = ({ className, text = "", scale = 1, layers = 1 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const digitalRain = new DigitalRain(canvas, layers)

    const interval = setInterval(() => {
      requestAnimationFrame(digitalRain.tick)
    }, TICK)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={className} />
    </>
  )
}

export default MatrixShower
