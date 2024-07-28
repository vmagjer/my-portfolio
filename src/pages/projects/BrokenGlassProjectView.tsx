import styled from 'styled-components'
import BrokenGlassMenu from '../../components/BrokenGlassMenu'
import useWindowSize from '../../utils/useWindowResize'
import { useEffect, useRef } from 'react'
import { drawBrokenGlass } from '../../utils/brokenGlass/proceduralBrokenGlass'

export const BrokenGlassProjectView = () => {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('canvas null')
      return
    }
    const context = canvas.getContext('2d')
    if (!context) return
    drawBrokenGlass({
      context,
      radials: 9,
      scaleMultiplier: 0.07,
      jaggedness: 20,
      curviness: (Math.PI / 90) * 8,
      branchPercentage: 0.7,
      branchAngle: (Math.PI / 90) * 10,
    })
  }, [canvasRef])

  return (
    <Container>
      {/* <BrokenGlassMenu width={windowSize.width} height={windowSize.height} /> */}
      <canvas ref={canvasRef} width={1600} height={900} />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
`
