import { useEffect, useRef } from 'react'

import BrokenGlassMenu from '../../components/BrokenGlassMenu'
import { drawBrokenGlass } from '../../features/brokenGlass/proceduralBrokenGlass'
import styled from 'styled-components'
import useWindowSize from '../../utils/useWindowResize'

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
    <Root>
      {/* <BrokenGlassMenu width={windowSize.width} height={windowSize.height} /> */}
      <canvas ref={canvasRef} width={1600} height={900} />
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
`
