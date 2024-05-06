import styled from 'styled-components'
import data from '../assets/data'
import { BrokenGlass } from '../utils/brokenGlass/BrokenGlass'

const NUM_TRAVERSE_CRACKS = 7

// working with percentages to make it responsive to different screen sizes
const brokenGlass = new BrokenGlass(
  1,
  1,
  data.highlightedProjects.length,
  NUM_TRAVERSE_CRACKS
)

export default function BrokenGlassMenu({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const radius = Math.sqrt(width ** 2 + height ** 2) / 2
  const bgWidth = radius * 1.5
  const bgHeight = +bgWidth * (height / width)
  const impactPoint = [width / 2, height / 2]
  return (
    <Container $width={width} $height={height}>
      {brokenGlass.pieces.map((shard, i) => (
        <BigPiece
          key={`shard-${i}`}
          index={i}
          perimiter={shard.getPath(width, height)}
          center={[shard.center.x * width, shard.center.y * height]}
          pieces={shard.pieces.map((smallShard) =>
            smallShard.getPath(width, height)
          )}
          impactPoint={impactPoint}
          image={data.highlightedProjects[i].image}
          bgSize={[bgWidth, bgHeight]}
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
  bgSize,
}: {
  index: number
  perimiter: string
  center: number[]
  pieces: string[]
  impactPoint: number[]
  image: string
  bgSize: number[]
}) => (
  <>
    <GlassShard
      $path={perimiter}
      $center={center}
      $bgFocus={center}
      $impactPoint={impactPoint}
      $index={index}
    />
    {pieces.map((smallShard, j) => {
      return (
        <SmallShard
          key={`small-shard-${j}`}
          $path={smallShard}
          $image={`url(${image})`}
          $center={center}
          $bgWidth={bgSize[0]}
          $bgHeight={bgSize[1]}
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
  background: #000;
`
const BigPieceContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
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
  /* background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)); */
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
      numSmallShards: NUM_TRAVERSE_CRACKS + 1,
      bgFocus: $bgFocus,
      impactPoint: $impactPoint,
    })}
`

const SmallShard = styled.div<{
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
  transition: 0.5s ease-in-out;
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
  const dx = (shardCenter[0] - impactPoint[0]) * 0.05
  const dy = (shardCenter[1] - impactPoint[1]) * 0.05
  const maxRotation = 6
  for (let i = 0; i < numSmallShards; i++) {
    const radialProgress = (i + 1) / numSmallShards
    const scale = radialProgress ** 2 * 0.2 + 0.8
    const rotation = (Math.random() * maxRotation) / 2 - maxRotation
    // const rotation = 0

    // bg position
    const bgPosition = [
      shardCenter[0] - bgFocus[0] + i * dx,
      shardCenter[1] - bgFocus[1] + i * dy,
    ]

    const delay = (numSmallShards - i) * 0.02 // seconds

    // const translationX = (dx * (i + 1)) / 2
    // const translationY = (dy * (i + 1)) / 2
    // translate(${translationX}px, ${translationY}px);

    // &:hover > *:nth-child(${i + 1}) {
    // &:not(:hover) > *:nth-child(${i + 1}) {
    // transform-origin: ${shardCenter[0]}px ${shardCenter[1]}px;
    styles += `
      &:not(:hover) ~ *:nth-child(${shardIndex * numSmallShards + i + 1}) {
        transform: scale(${scale}) rotate(${rotation}deg) ;
        z-index: ${i + 2};
        background-position: left ${bgPosition[0]}px 
                            top ${bgPosition[1]}px;
        transition-delay: ${delay}s;
        z-index: 2;
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
