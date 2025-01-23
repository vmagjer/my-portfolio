import { useEffect, useRef } from 'react'

import TimelineItem from './TimelineItem'
import { drawFern } from '../features/fractal/fern'
import styled from 'styled-components'

export type TimelineItemInfo = {
  title: string
  image: string
  color: string
  date: string
  content: React.ReactNode
  skills: string[]
}
type TimelineProps = {
  // children: React.ReactNode
  items: TimelineItemInfo[]
}

function drawFerns(element: HTMLElement) {
  console.log('Drawing ferns')
  const canvases = element.querySelectorAll('canvas')

  const barnsleyFern = [
    [0, 0, 0, 0.16, 0, 0, 0.01], // stem
    [0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85], // successiveLeaflets
    [0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07], // leftLeaflet
    [-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07], // rightLeaflet
  ]

  // const leptosporangiateFern = [
  //   [0, 0, 0, 0.25, 0, -0.4, 0.02],
  //   [0.95, 0.005, -0.005, 0.93, -0.002, 0.5, 0.84],
  //   [0.035, -0.2, 0.16, 0.04, -0.09, 0.02, 0.07],
  //   [-0.04, 0.2, 0.16, 0.04, 0.083, 0.12, 0.07],
  // ]

  const offscreenCanvas = new OffscreenCanvas(
    canvases[0].width,
    canvases[0].height
  )
  const offscreenCanvasCtx = offscreenCanvas.getContext('2d')
  if (!offscreenCanvasCtx)
    throw new Error('offscreen canvas doesnt have 2d context')

  drawFern({
    ctx: offscreenCanvasCtx,
    coefficients: barnsleyFern,
    maxIter: 500000,
    color:
      'hsla(223.63636363636363, 5.069124423963134%, 50.54901960784314%, 0.08)',
    scaleX: 0.09,
    scaleY: 0.198,
    translateX: 0,
    translateY: offscreenCanvasCtx.canvas.height / 2,
    rotate: -90,
  })

  canvases.forEach((c) => {
    const ctx = c.getContext('2d')

    if (ctx) {
      console.log('Drawing fern')
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(offscreenCanvas, 0, 0)
    }
  })
  console.log('END Drawing ferns')
}

export default function Timeline({ items }: TimelineProps) {
  const rootRef = useRef(null)
  useEffect(() => {
    const element = rootRef.current

    if (element && window.innerWidth > 1100) {
      drawFerns(element)
    }
  }, [rootRef, items.length])

  return (
    <Root ref={rootRef}>
      {/* <FernCanvas /> */}
      <List>{drawItems(items)}</List>
    </Root>
  )
}
const drawItems = (items: TimelineItemInfo[]) => {
  const result = []
  let itemIndex = 0
  let index = 0
  while (index < items.length * 2) {
    const item1 = items[itemIndex++]
    result.push(
      <TimelineItem
        key={item1.title}
        title={item1.title}
        image={item1.image}
        color={item1.color}
        date={item1.date}
        skills={item1.skills}
        reverse={true}
      >
        {item1.content}
      </TimelineItem>
    )
    index++
    // index++
    // index++
    result.push(
      <CanvasContainer key={'timeline-deco-' + index++}>
        <canvas />
      </CanvasContainer>
    )
    if (itemIndex < items.length) {
      result.push(
        <CanvasContainer key={'timeline-deco-' + index++} $reverse>
          <canvas />
        </CanvasContainer>
      )
      const item2 = items[itemIndex++]
      result.push(
        <TimelineItem
          key={item2.title}
          title={item2.title}
          image={item2.image}
          color={item2.color}
          date={item2.date}
          skills={item2.skills}
          reverse={false}
        >
          {item2.content}
        </TimelineItem>
      )
    }
    index++
  }
  return result
}

const Root = styled.div`
  display: flex;
  align-content: stretch;
  gap: 0.75rem;
`
const List = styled.div<{ isLeft?: boolean }>`
  padding-top: 25px;
  padding-left: 16px;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1100px) {
    padding-left: 0px;
    grid-template-columns: 1fr 1fr;
  }
`

const CanvasContainer = styled.div<{ $reverse?: boolean }>`
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;

  canvas {
    width: 100%;
    height: 200px;

    ${({ $reverse }) => ($reverse ? 'transform: scaleX(-1);' : '')}
  }

  @media (min-width: 1100px) {
    display: flex;
  }
`
