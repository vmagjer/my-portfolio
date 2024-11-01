export function getCardMeasures(
  cardWidth: number,
  imageDepth: number,
  perspective: number,
  maxRotationAngle: number
): { backLength: number; frontLength: number } {
  const EYE = {
    x: 0,
    y: 0,
  }
  const pivot = {
    x: perspective,
    y: 0,
  }
  let A = {
    x: perspective,
    y: -cardWidth / 2,
  }
  let B = {
    x: perspective,
    y: cardWidth / 2,
  }
  let C = {
    x: perspective + imageDepth,
    y: cardWidth / 2,
  }
  let D = {
    x: perspective + imageDepth,
    y: -cardWidth / 2,
  }

  // rotate ABCD around pivot
  A = rotatePointAroundPivot(A, pivot, maxRotationAngle)
  B = rotatePointAroundPivot(B, pivot, maxRotationAngle)
  C = rotatePointAroundPivot(C, pivot, maxRotationAngle)
  D = rotatePointAroundPivot(D, pivot, maxRotationAngle)

  // AB is the front of the card
  // CD is the back of the card

  const imageEnd1 = intersect(C.x, C.y, D.x, D.y, EYE.x, EYE.y, B.x, B.y)
  if (!imageEnd1) {
    throw new Error('No intersection found')
  }
  const imageEndOffset = subtract(imageEnd1, C)

  const imageEnd2 = subtract(D, imageEndOffset)
  const frameInnerEnd = intersect(
    A.x,
    A.y,
    B.x,
    B.y,
    EYE.x,
    EYE.y,
    imageEnd2.x,
    imageEnd2.y
  )
  if (!frameInnerEnd) {
    throw new Error('No intersection found')
  }
  const frameInnerEndOffset = subtract(frameInnerEnd, A)

  return {
    backLength: length(imageEndOffset) + 2,
    frontLength: length(frameInnerEndOffset) + 4,
  }
}

type Point = { x: number; y: number }

function rotatePointAroundPivot(point: Point, pivot: Point, angle: number): Point {
  const translateToOrigin = translate(point, inverse(pivot))
  const rotateAroundOrigin = rotate(translateToOrigin, angle)
  const translateToPivot = translate(rotateAroundOrigin, pivot)
  return translateToPivot
}

function rotate(point: Point, angle: number): Point {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  }
}

function translate(point: Point, vector: Point): Point {
  return {
    x: point.x + vector.x,
    y: point.y + vector.y,
  }
}

function subtract(v1: Point, v2: Point): Point {
  return translate(v1, inverse(v2))
}

function inverse(v: Point): Point {
  return {
    x: -v.x,
    y: -v.y,
  }
}

function length(v: Point): number {
  return Math.sqrt(v.x ** 2 + v.y ** 2)
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)

  // Lines are parallel
  if (denominator === 0) {
    return false
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    console.log('Intersection not along segments')
    // return false
  }

  // Return a object with the x and y coordinates of the intersection
  const x = x1 + ua * (x2 - x1)
  const y = y1 + ua * (y2 - y1)

  return { x, y }
}
