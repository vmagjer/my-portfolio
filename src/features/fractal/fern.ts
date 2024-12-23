
export function drawFern({
  coefficients,
  maxIter,

  ctx,
  color,

  scaleX,
  scaleY,
  translateX = 0,
  translateY = 0,
  rotate = 0,
}: {
  coefficients: number[][]
  maxIter: number

  ctx: CanvasRenderingContext2D
  color: string

  scaleX: number
  scaleY: number
  translateX: number
  translateY: number
  rotate: number
}) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const rotateRad = (rotate * Math.PI) / 180
  ctx.translate(translateX, translateY)
  ctx.rotate(rotateRad)

  const zoomedWidth = ctx.canvas.width * scaleX
  const zoomedHeight = ctx.canvas.height * scaleY

  const stem = coefficients[0]
  const successiveLeaflets = coefficients[1]
  const leftLeaflet = coefficients[2]
  const rightLeaflet = coefficients[3]

  let x = 0
  let y = 0
  let t = 0
  let xn = 0
  let yn = 0

  // while t < maximum iterations:
  while (t < maxIter) {
    // r = random() between 0 and 1
    const r = Math.random()

    let prob = stem[6]
    if (r < prob) {
      xn = stem[0] * x + stem[1] * y + stem[4]
      yn = stem[2] * x + stem[3] * y + stem[5]
    } else if (r < (prob += successiveLeaflets[6])) {
      xn = successiveLeaflets[0] * x + successiveLeaflets[1] * y + successiveLeaflets[4]
      yn = successiveLeaflets[2] * x + successiveLeaflets[3] * y + successiveLeaflets[5]
    } else if (r < (prob += leftLeaflet[6])) {
      xn = leftLeaflet[0] * x + leftLeaflet[1] * y + leftLeaflet[4]
      yn = leftLeaflet[2] * x + leftLeaflet[3] * y + leftLeaflet[5]
    } else { // assumes coef[n][6] add up to 100%
      xn = rightLeaflet[0] * x + rightLeaflet[1] * y + rightLeaflet[4]
      yn = rightLeaflet[2] * x + rightLeaflet[3] * y + leftLeaflet[5]
    }

    // draw pixel on screen at (xn, yn)
    ctx.fillStyle = color
    ctx.fillRect(xn * zoomedWidth, yn * zoomedHeight, 1, 1)

    // increment
    x = xn
    y = yn
    t++
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
