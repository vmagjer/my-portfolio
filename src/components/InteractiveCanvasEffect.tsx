import { useLayoutEffect, useRef } from 'react'

import { InteractiveBackground } from '../features/interactiveBackground/interactiveBg'
import styled from 'styled-components'

type InteractiveCanvasEffectProps = {
  scale?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

const InteractiveCanvasEffect = ({
  scale = 1,
  ...rest
}: InteractiveCanvasEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const interactiveBg = new InteractiveBackground(canvasRef.current, scale)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            interactiveBg.start()
          } else {
            interactiveBg.stop()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvasRef.current)

    return () => {
      observer.disconnect()
      interactiveBg.stop()
    }
  }, [canvasRef, scale])

  return <CanvasElement ref={canvasRef} {...rest}></CanvasElement>
}
export default InteractiveCanvasEffect

const CanvasElement = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100lvh;
  z-index: -100;
  background-color: var(--effect-surface);
`
