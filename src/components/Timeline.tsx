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
}
type TimelineProps = {
  // children: React.ReactNode
  items: TimelineItemInfo[]
}

function drawFerns(element: HTMLElement) {
  console.log('Drawing ferns')
  const canvases = element.querySelectorAll('canvas')

  canvases.forEach((c) => {
    const ctx = c.getContext('2d')
    if (ctx) {
      console.log('Drawing fern')
      drawFern({
        ctx: ctx,
        maxIter: 10000,
        color: '#808595',
        scaleX: 0.1,
        scaleY: 0.2,
        translateX: 0,
        translateY: ctx.canvas.height / 2,
        rotate: -90,
      })
    }
  })
  console.log('END Drawing ferns')
}

export default function Timeline({ items }: TimelineProps) {
  const rootRef = useRef(null)
  useEffect(() => {
    const element = rootRef.current

    if (element) {
      drawFerns(element)
      // window.addEventListener('resize', () => drawFerns(element))
    }
  }, [rootRef])

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
        reverse={true}
      >
        {item1.content}
      </TimelineItem>
    )
    index++
    // index++
    // index++
    result.push(<CanvasContainer key={'timeline-deco-' + index++} ><canvas/></CanvasContainer>)
    result.push(<CanvasContainer key={'timeline-deco-' + index++} $reverse><canvas/></CanvasContainer>)
    const item2 = items[itemIndex++]
    result.push(
      <TimelineItem
        key={item2.title}
        title={item2.title}
        image={item2.image}
        color={item2.color}
        date={item2.date}
        reverse={false}
      >
        {item2.content}
      </TimelineItem>
    )
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
