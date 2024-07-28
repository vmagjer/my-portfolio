
/**
 * Represents a point in 2D space.
 */
type Point = { x: number, y: number };

/**
 * Represents an edge between two points with a control point for bezier curve.
 */
type Edge = { start: Point, controlPoint: Point, end: Point };

/**
 * Represents a shard of broken glass composed of multiple edges.
 */
type Shard = { edges: Edge[] };

/**
 * Generates a list of shards that constitute rectangles of broken glass.
 * @param width - The width of the broken glass.
 * @param height - The height of the broken glass.
 * @returns A list of shards representing the broken glass.
 */
// export function proceduralBrokenGlass(width: number, height: number): Shard[] {
// Implementation details...
// }

/**
 * Draws the broken glass on a canvas.
 * https://oaktrust.library.tamu.edu/bitstream/handle/1969.1/153651/MONROE-THESIS-2014.pdf?sequence=1
 * 
 * @param context - The rendering context of the canvas.
 * @param radials - The number of radial cracks.
 * @param scaleMultiplier - how far apart on average the points are from one another when the next point is generated
 * @param curviness - how much angle variation is added during point to point creation
 * @param jaggedness - how much jitter is added during point to point creation.
 * @param branchPercentage - the chance of a branch occurring from point to poin
 * @param branchAngle - angle between the two new branches created
 * @param concentrics - The number of circular cracks.
 */
export function drawBrokenGlass({
  context,
  radials,
  scaleMultiplier = 1,
  curviness = 0,
  jaggedness = 0,
  branchPercentage: branchChance = 0,
  branchAngle = 0,
  // concentrics = 0,
}: {
  context: CanvasRenderingContext2D,
  radials: number,
  scaleMultiplier?: number,
  curviness?: number,
  jaggedness?: number,
  branchPercentage?: number,
  branchAngle?: number,
  // concentrics?: number,
}): void {
  const width = context.canvas.width
  const height = context.canvas.height
  const center: Point = {
    x: width / 2,
    y: height / 2
  }
  // context.clearRect(0, 0, width, height)
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)
  context.strokeStyle = 'black'
  context.lineWidth = 2

  const distance = scaleMultiplier * width

  const lineStack: { start: Point, angle: number }[] = []
  for (let index = 0; index < radials; index++) {
    lineStack.push({
      start: center,
      angle: index * 2 * Math.PI / radials,
    })
  }

  let line = null
  while ((line = lineStack.pop())) {
    context.beginPath()
    context.moveTo(line.start.x, line.start.y)
    let end = line.start
    while (end.x > 0 && end.x < width && end.y > 0 && end.y < height) {
      const angle = line.angle + curviness * (Math.random() - 0.5)
      end = {
        x: end.x + distance * Math.cos(angle),
        y: end.y + distance * Math.sin(angle),
      }
      end.x += jaggedness * (Math.random() - 0.5);
      end.y += jaggedness * (Math.random() - 0.5);
      context.lineTo(end.x, end.y)

      if (Math.random() > branchChance) {
        lineStack.push({
          start: end,
          angle: angle - branchAngle / 2
        })
        lineStack.push({
          start: end,
          angle: angle + branchAngle / 2
        })
        break
      }
    }
    context.stroke()
  }

  // for (let index = 0; index < radials; index++) {
  //   let start = center
  //   let end: Point = start
  //   let angle = index * 2 * Math.PI / radials

  //   context.beginPath()
  //   context.moveTo(start.x, start.y)
  //   while (end.x > 0 && end.x < width && end.y > 0 && end.y < height) {
  //     angle += curviness * (Math.random() - 0.5)
  //     end = {
  //       x: start.x + distance * Math.cos(angle),
  //       y: start.y + distance * Math.sin(angle),
  //     }
  //     end.x += jaggedness * (Math.random() - 0.5);
  //     end.y += jaggedness * (Math.random() - 0.5);
  //     console.log(`Drawing line from ${start.x}, ${start.y}`)

  //     context.lineTo(end.x, end.y)

  //     start = end
  //   }
  //   context.stroke()
  // }
}