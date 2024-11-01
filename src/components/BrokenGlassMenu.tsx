import { BrokenGlass } from '../features/brokenGlass/BrokenGlass'
import data from '../assets/data'
import styled from 'styled-components'

const NUM_SMALL_PIECES = 7
const TRANSITION_DURATION = 0.5

// working with percentages to make it responsive to different screen sizes
const brokenGlass = new BrokenGlass(
  1,
  1,
  data.highlightedProjects.length,
  NUM_SMALL_PIECES
)

export default function BrokenGlassMenu({
  width: viewWidth,
  height: viewHeight,
}: {
  width: number
  height: number
}) {
  const radius = Math.sqrt(viewWidth ** 2 + viewHeight ** 2) / 2
  const bgWidth = radius * 1.5
  const bgHeight = +bgWidth * (viewHeight / viewWidth)

  const impactPoint = [viewWidth / 2, viewHeight / 2]
  return (
    <Container $width={viewWidth} $height={viewHeight}>
      {brokenGlass.pieces.map((shard, i) => (
        <BigPiece
          key={`shard-${i}`}
          index={i}
          perimiter={shard.getPath(viewWidth, viewHeight)}
          pieces={shard.pieces.map((smallShard) =>
            smallShard.getPath(viewWidth, viewHeight)
          )}
          center={[shard.center.x * viewWidth, shard.center.y * viewHeight]}
          impactPoint={impactPoint}
          image={data.highlightedProjects[i].image}
          imgSize={[bgWidth, bgHeight]}
          onClick={() => console.log(`clicked shard ${i}`)}
        />
      ))}
      {/* {brokenGlass.pieces.map((shard, i) => (
        <ColoredCircle
          key={`red-${i}`}
          x={shard.center.x * width}
          y={shard.center.y * height}
          color="red"
        />
      ))} */}
    </Container>
  )
}

const BigPiece = ({
  index,
  perimiter,
  center,
  pieces,
  impactPoint,
  image,
  imgSize,
  onClick,
}: {
  index: number
  perimiter: string
  center: number[]
  pieces: string[]
  impactPoint: number[]
  image: string
  imgSize: number[]
  onClick: () => void
}) => (
  <>
    <GlassShard
      $path={perimiter}
      $center={center}
      $bgFocus={[imgSize[0] / 2, imgSize[1] / 2]}
      $impactPoint={impactPoint}
      $index={index}
      onClick={onClick}
    />
    {pieces.map((smallShard, j) => {
      return (
        <SmallPiece
          key={`small-shard-${j}`}
          $path={smallShard}
          $image={`url(${image})`}
          $center={center}
          $bgWidth={imgSize[0]}
          $bgHeight={imgSize[1]}
        />
      )
    })}
  </>
)

const Container = styled.div<{
  $width: number
  $height: number
}>`
  position: relative;
  width: ${({ $width: width }) => width}px;
  height: ${({ $height: height }) => height}px;
  background-image: linear-gradient(45deg, #d341c7, #4893bb);
`

const GlassShard = styled.div<{
  $path: string
  $center: number[]
  $bgFocus: number[]
  $impactPoint: number[]
  $index: number
}>`
  pointer-events: all;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;

  clip-path: ${({ $path: path }) => path};

  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }

  ${({ $center, $bgFocus, $impactPoint, $index }) =>
    createSmallShardStylesOnHover({
      shardIndex: $index,
      shardCenter: $center,
      numSmallShards: NUM_SMALL_PIECES,
      bgFocus: $bgFocus,
      impactPoint: $impactPoint,
    })}
`

const SmallPiece = styled.div<{
  $path: string
  $image: string
  $center: number[]
  $bgWidth: number
  $bgHeight: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    ${({ $image: image }) => image};
  background-size: ${({ $bgWidth: bgWidth, $bgHeight: bgHeight }) =>
    `${bgWidth}px ${bgHeight}px`};
  background-repeat: no-repeat;
  background-position: ${({ $center, $bgWidth, $bgHeight }) =>
    `left ${$center[0] - $bgWidth / 2}px 
    top ${$center[1] - $bgHeight / 2}px`};

  z-index: 3;

  clip-path: ${({ $path: path }) => path};
  transition: all ${TRANSITION_DURATION}s ease-in-out;
  pointer-events: none;
`

function createSmallShardStylesOnHover({
  shardIndex,
  shardCenter,
  bgFocus,
  impactPoint,
  numSmallShards,
}: {
  shardIndex: number
  shardCenter: number[]
  bgFocus: number[]
  impactPoint: number[]
  numSmallShards: number
}) {
  let styles = ''
  const dx = (impactPoint[0] - shardCenter[0]) * 0.2
  const dy = (impactPoint[1] - shardCenter[1]) * 0.2
  const MAX_ROTATION = 6
  const MIN_SCALE = 0.8
  for (let i = 0; i < numSmallShards; i++) {
    const radialProgress = (i + 1) / (numSmallShards + 1)
    const squareProgress = radialProgress ** 2
    const scale = squareProgress * (1 - MIN_SCALE) + MIN_SCALE
    const rotation = Math.random() * MAX_ROTATION - MAX_ROTATION / 2

    const bgPosition = [
      shardCenter[0] - bgFocus[0] - squareProgress * dx,
      shardCenter[1] - bgFocus[1] - squareProgress * dy,
    ]

    const delay2 = squareProgress * TRANSITION_DURATION
    const delay1 = (1-squareProgress) * TRANSITION_DURATION

    // const translationX = (dx * (i + 1)) / 2
    // const translationY = (dy * (i + 1)) / 2
    // translate(${translationX}px, ${translationY}px);

    // &:hover > *:nth-child(${i + 1}) {
    // &:not(:hover) > *:nth-child(${i + 1}) {
    const childIndex = shardIndex * (numSmallShards + 1) + i + 1
    styles += `
      ~ *:nth-child(${childIndex}) {
        transition-delay: ${delay1}s;
      }
      &:not(:hover) ~ *:nth-child(${childIndex}) {
        transform: scale(${scale}) rotate(${0}deg) ;
        z-index: ${i + 2};
        background-position: left ${bgPosition[0]}px 
                            top ${bgPosition[1]}px;
        z-index: 2;
        transition-delay: ${delay2}s;
      }
    `
  }
  return styles
}

const ColoredCircle = styled.div<{ x: number; y: number; color: string }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: 20px;
  height: 20px;
  background: ${({ color }) => color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
