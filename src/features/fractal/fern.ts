export function drawFern({
  ctx,
  maxIter,
  color,
  scaleX,
  scaleY,
  translateX = 0,
  translateY = 0,
  rotate = 0,
}: {
  ctx: CanvasRenderingContext2D
  maxIter: number
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
  
  let x = 0
  let y = 0
  let t = 0
  let xn = 0
  let yn = 0

  // while t < maximum iterations:
  while (t < maxIter) {
    // r = random() between 0 and 1
    const r = Math.random()
    if (r < 0.01) {
      xn = 0
      yn = 0.16 * y
    } else if (r < 0.86) {
      xn = 0.85 * x + 0.04 * y
      yn = -0.04 * x + 0.85 * y + 1.6
    } else if (r < 0.93) {
      xn = 0.2 * x - 0.26 * y
      yn = 0.23 * x + 0.22 * y + 1.6
    } else {
      xn = -0.15 * x + 0.28 * y
      yn = 0.26 * x + 0.24 * y + 0.44
    }
    // draw pixel on screen at (xn, yn)
      ctx.fillStyle = color


    ctx.fillRect(xn * zoomedWidth, yn * zoomedHeight , 1, 1)
    
    // increment
    x = xn
    y = yn
    t++
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
