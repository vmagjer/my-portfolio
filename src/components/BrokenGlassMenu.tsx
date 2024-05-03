import styled from 'styled-components'
import data from '../assets/data'

// Simple rules for glass shattering:
// 1) Radial cracks propagate from the impact point like spokes on a wheel.
// 2) Other cracks propagate between radial cracks, like a spider web. (Traverse cracks)
// 3) Cracks stop when they hit each another crack
// 4) The size of the glass fragments is a power function of the distance from the impact point.

const START = [50, 50]
const RADIUS = Math.sqrt(50 ** 2 + 50 ** 2)
const NUM_TRAVERSE_CRACKS = 8

const VIEW_WIDTH = 2400
const VIEW_HEIGHT = 1206
const bgWidth = (RADIUS / 100) * VIEW_WIDTH
const bgHeight = (RADIUS / 100) * VIEW_HEIGHT

type Shard = {
  path: number[][]
  clipPath: string
  shardCenter: number[]
  smallShards: SmallShard[]
  image?: string
}
type SmallShard = {
  path: number[][]
  clipPath: string
}

const shards: Shard[] = getShards(
  data.highlightedProjects.length,
  START,
  RADIUS,
  NUM_TRAVERSE_CRACKS,
  VIEW_WIDTH,
  VIEW_HEIGHT
)
console.log(shards)

function getShards(
  numShards: number,
  start: number[],
  radius: number,
  numTraverseCracks: number,
  width: number,
  height: number
): Shard[] {
  const borderPaths = getBorderPaths(
    numShards,
    start,
    radius,
    numTraverseCracks,
    width,
    height
  )
  const shardPaths: number[][][] = getShardPaths(borderPaths, width, height)
  const shardCenters = getShardCenters(numShards)
  const smallShardPaths = shardPaths.map((path) => getSmallShards(path))

  return shardPaths.map((path, i) => ({
    path,
    shardCenter: shardCenters[i],
    smallShards: smallShardPaths[i].map((smallShardPath) => ({
      path: smallShardPath,
      clipPath: getClipPathSVG(smallShardPath),
    })),
    image: data.highlightedProjects[i].image,
    clipPath: getClipPathSVG(path),
  }))
}

function getClipPathSVG(path: number[][]): string {
  let clipPath = ''
  let prevPoint = path[0]
  clipPath += `M ${prevPoint[0]},${prevPoint[1]} `
  for (let i = 1; i < path.length; i++) {
    const currPoint = path[i]
    const controlPoint = [
      (prevPoint[0] + currPoint[0]) / 2,
      (prevPoint[1] + currPoint[1]) / 2,
    ]
    // deterministic, seemingly random, but consistent control points
    const dx =
      i >= path.length / 2
        ? -currPoint[0] + prevPoint[0]
        : currPoint[0] - prevPoint[0]
    const dy =
      i >= path.length / 2
        ? -currPoint[1] + prevPoint[1]
        : currPoint[1] - prevPoint[1]
    const above =
      (Math.floor(currPoint[0]) + Math.floor(prevPoint[0])) % 2 === 0
    controlPoint[0] += (above ? dy : -dy) * 0.1
    controlPoint[1] += (above ? dx : -dx) * 0.1

    clipPath += `Q ${controlPoint[0]},${controlPoint[1]} ${currPoint[0]},${currPoint[1]} `
    //clipPath += `L${currPoint[0]/100*width},${currPoint[1]/100*height} `

    prevPoint = currPoint
  }
  //clipPath += 'Z'
  return `path('${clipPath}')`
}

type Crack = {
  ends: number[][]
  controlPoint: number[]
}

// pure function
function getCrack(p1: number[], p2: number[]): Crack {
  const controlPoint = [
    (p1[0] + p2[0]) / 2 ,
    (p1[1] + p2[1]) / 2 ,
  ]
  const sortedPoints = [p1, p2].sort((a, b) => a[0] - b[0])
  const dx = sortedPoints[1][0] - sortedPoints[0][0]
  const dy = sortedPoints[1][1] - sortedPoints[0][1]
  const above = Math.floor(sortedPoints[0][0] + sortedPoints[1][0]) % 2 === 0
  controlPoint[0] += (above ? dy : -dy) * 0.1
  controlPoint[1] += (above ? dx : -dx) * 0.1
  
  return {
    ends: [p1, p2],
    controlPoint,
  }
}

function getBorderPaths(
  numRadialCracks: number,
  start: number[],
  radius: number,
  numTraverseCracks: number,
  width: number,
  height: number
) {
  const angleStep = 360 / numRadialCracks
  const borderPaths = []
  for (let i = 0; i < numRadialCracks; i++) {
    const angle = angleStep * i
    const path = getGlassShardLeftPath(
      angle,
      start,
      radius,
      numTraverseCracks,
      10,
      width,
      height
    )
    borderPaths.push(path)
  }
  return borderPaths
}

function getGlassShardLeftPath(
  angle: number,
  start: number[],
  radius: number,
  numExtraPoints: number,
  deviation: number,
  width: number,
  height: number
) {
  const path = []
  // path.push(start)
  for (let j = 0; j <= numExtraPoints; j++) {
    const distanceFromStart = radius * (j / numExtraPoints) ** 2
    const point = getCoordsOfPointOnCircle(angle, start, distanceFromStart)
    point[0] +=
      (Math.random() * deviation - deviation / 2) * (j / numExtraPoints)
    point[1] +=
      (Math.random() * deviation - deviation / 2) * (j / numExtraPoints)
    point[0] *= width / 100
    point[1] *= height / 100
    path.push(point)
  }
  //const end = getCoordsOfPointOnCircle(angle, start, radius)
  //path.push(end)

  return path
}

function getCoordsOfPointOnCircle(
  angle: number,
  center: number[],
  radius: number
): number[] {
  const x = center[0] + Math.cos((angle * Math.PI) / 180) * radius
  const y = center[1] + Math.sin((angle * Math.PI) / 180) * radius
  return [x, y]
}

function getShardPaths(
  borderPaths: number[][][],
  width: number,
  height: number
) {
  const numShards = borderPaths.length
  const shardPaths = []
  for (let i = 0; i < numShards; i++) {
    const path = []
    path.push(...borderPaths[i])
    const nextIndex = (i + 1) % numShards

    // push a point on the container circle between the two borders
    const borderPoint = getCoordsOfPointOnCircle(
      (360 / numShards) * (i + 0.5),
      START,
      RADIUS + 10
    )
    borderPoint[0] *= width / 100
    borderPoint[1] *= height / 100
    path.push(borderPoint)

    path.push(...borderPaths[nextIndex].toReversed())
    shardPaths.push(path)
  }
  return shardPaths
}

function getShardCenters(numShards: number): number[][] {
  const shardCenters = []
  for (let i = 0; i < numShards; i++) {
    const angle = (360 / numShards) * (i + 0.5)
    shardCenters.push(getCoordsOfPointOnCircle(angle, START, RADIUS / 2))
  }
  return shardCenters
}

function getSmallShards(path: number[][]) {
  const numTraverseCracks = (path.length - 1) / 2
  const smallShards = []
  for (let i = 0; i < numTraverseCracks; i++) {
    const shard = []
    const index1 = i
    const index2 = i + 1
    const index3 = path.length - i - 2
    const index4 = path.length - i - 1
    shard.push(path[index1])
    shard.push(path[index2])
    // account for corner case
    if (i === numTraverseCracks - 1) {
      shard.push(path[index2 + 1])
    }
    shard.push(path[index3])
    shard.push(path[index4])

    smallShards.push(shard)
  }
  return smallShards
}

export default function BrokenGlassMenu({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (
    <Container>
      {shards.map((shard, i) => (
        <GlassShard
          key={`shard-${i}`}
          path={shard.clipPath}
          shardCenter={shard.shardCenter}
        >
          {shard.smallShards.map((smallShard, j) => {
            return (
              <SmallShard
                key={`small-shard-${j}`}
                path={smallShard.clipPath}
                image={`url(${shard.image})`}
                shardCenter={shard.shardCenter}
              />
            )
          })}
        </GlassShard>
      ))}
      {shards.map((shard, i) => (
        <ColoredCircle
          key={`red-${i}`}
          x={(shard.shardCenter[0] / 100) * width}
          y={(shard.shardCenter[1] / 100) * height}
          color="red"
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: ${VIEW_WIDTH}px;
  height: ${VIEW_HEIGHT}px;
  background: #000;
`

const GlassShard = styled.div<{
  path: string
  shardCenter: number[]
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  z-index: 1;

  clip-path: ${({ path }) => path};

  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    z-index: 2;
  }
  ${({ shardCenter: center }) =>
    createSmallShardStylesOnHover(center, NUM_TRAVERSE_CRACKS + 1)}
`

const SmallShard = styled.div<{
  path: string
  image: string
  shardCenter: number[]
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    ${({ image }) => image};
  background-size: ${bgWidth}px ${bgHeight}px;
  background-repeat: no-repeat;
  background-position: ${({ shardCenter }) =>
    `left ${(shardCenter[0] / 100) * VIEW_WIDTH - bgWidth * 0.5}px top ${
      (shardCenter[1] / 100) * VIEW_HEIGHT - bgHeight * 0.5
    }px`};

  z-index: 1;
  backdrop-filter: blur(8px);

  clip-path: ${({ path }) => path};
  transition: 0.5s ease-in-out;
`
function createSmallShardStylesOnHover(
  shardCenter: number[],
  numSmallShards: number
) {
  let styles = ''
  const dx = (shardCenter[0] - START[0]) * 0.5
  const dy = (shardCenter[1] - START[1]) * 0.5
  for (let i = 0; i < numSmallShards; i++) {
    const scale = 1 + i * 0.005
    const rotation = Math.random() * 8 - 4

    // bg position
    const bgCenter = [
      (shardCenter[0] / 100) * VIEW_WIDTH - bgWidth * 0.5,
      (shardCenter[1] / 100) * VIEW_HEIGHT - bgHeight * 0.5,
    ]

    const translationX = (dx * (i + 1)) / 2
    const translationY = (dy * (i + 1)) / 2
    //&:not(:hover) > *:nth-child(${i + 1}) {
    styles += `
      &:hover > *:nth-child(${i + 1}) {
        transform: scale(${scale}) rotate(${rotation}deg) 
              translate(${translationX}px, ${translationY}px);
        z-index: ${i + 2};
        background-position: left ${bgCenter[0] + i * -dx}px top ${
      bgCenter[1] + i * -dy
    }px;
        transition-delay: ${(numSmallShards - i) * 0.02}s;
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
