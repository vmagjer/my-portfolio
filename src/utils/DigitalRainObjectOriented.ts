import MousePosition from './MousePosition'
import Particle, { Vector2D } from './Particle/Particle'
import ParticleMovementStrategy from './Particle/ParticleMovementStrategy'
import DigitalRainParticleRenderer from './Particle/ParticleRenderer'
import { GravityForceField, InertiaForceField, RepellingForceField } from './Particle/particleManipulations'
import { randomInt } from './random'

const CELL_SIZE = 20

export type Bounds = { xStart: number, yStart: number, xEnd: number, yEnd: number }
type Layer = { scale: number, alpha: number, xOffset: number, yOffset: number, width: number, height: number }

/**
 * Uses an offscreen canvas to draw the rain, then draws the offscreen canvas to the main canvas for each layer of rain.
 * Utilizes translate and scale to draw the rain in the correct position.
 * Relies on hardware acceleration to improve performance.
 */
class DigitalRainPerformant {
  ctx: CanvasRenderingContext2D
  bufferCtx: OffscreenCanvasRenderingContext2D
  rows: number
  cols: number
  droplets: Particle[]
  cursorPosition: Vector2D
  particleMovementStrategy: ParticleMovementStrategy
  text: string
  particleRenderer: DigitalRainParticleRenderer
  numLayers: number
  layers: Layer[]
  textStartRow = 0
  textEndCol = 0

  constructor({
    canvas,
    numLayers = 1,
    density = 1,
    text = '',
  }: {
    canvas: HTMLCanvasElement
    numLayers?: number
    density?: number
    text?: string
  }
  ) {
    console.log('init')

    const viewWidth = (canvas.width = window.innerWidth)
    const viewHeight = (canvas.height = window.innerHeight)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2d context')
    this.ctx = ctx

    const bufferHeight = Math.ceil(viewHeight * numLayers)
    const bufferWidth = Math.ceil(viewWidth * numLayers)
    this.bufferCtx = this.#initDrawingContext(bufferWidth, bufferHeight)

    this.rows = Math.ceil(bufferHeight / CELL_SIZE)
    this.cols = Math.ceil(bufferWidth / CELL_SIZE)

    const terminalVelocity = CELL_SIZE
    this.droplets = this.#initRain(this.cols, this.rows, density, terminalVelocity)

    const bounds = {
      xStart: 0,
      yStart: 0,
      xEnd: this.bufferCtx.canvas.width,
      yEnd: this.bufferCtx.canvas.height,
    }
    this.cursorPosition = { x: -100, y: 0 }
    this.particleMovementStrategy = this.#initRainMovement(bounds, this.cursorPosition, terminalVelocity)

    this.text = text
    this.particleRenderer = new DigitalRainParticleRenderer({
      bounds,
      numParticles: this.droplets.length,
      numSymbols: this.rows,
      resolution: CELL_SIZE,
      text,
    })

    this.numLayers = numLayers
    this.layers = new Array(numLayers).fill(0).map((_, i) => {
      const scale = i + 1
      return {
        scale,
        alpha: scale / numLayers,
        xOffset: bufferWidth / 2 - bufferWidth / scale / 2,
        yOffset: bufferHeight / 2 - bufferHeight / scale / 2,
        width: bufferWidth / scale,
        height: bufferHeight / scale,
      }
    })
  }

  #initDrawingContext(width: number, height: number): OffscreenCanvasRenderingContext2D {
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2d context')
    ctx.scale(-1, 1)
    ctx.translate(-width, 0)
    // ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // ctx.shadowBlur = 4

    return ctx
  }

  #initRain(cols: number, rows: number, density: number, velocityY: number): Particle[] {
    const droplets = []
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < density; i++) {
        const initialYPosition = -randomInt(rows) * CELL_SIZE
        const particle = new Particle({
          initialPosition: { x: col * CELL_SIZE, y: initialYPosition },
          initialVelocity: { x: 0, y: velocityY },
          initialIsVisible: false,
        })
        droplets.push(particle)
      }
    }
    return droplets
  }

  #initRainMovement(bounds: Bounds, cursorPosition: Vector2D, terminalVelocity: number): ParticleMovementStrategy {
    const inertia = 0.9
    const gravity = terminalVelocity / inertia - CELL_SIZE
    const repellingRadius = 100
    const repellingStrength = 0.1
    const forceFields = [
      new InertiaForceField(inertia),
      new GravityForceField(gravity),
      new RepellingForceField(cursorPosition, repellingRadius, repellingStrength),
    ]
    return new ParticleMovementStrategy(bounds, forceFields)
  }

  tick = () => {
    console.log('tick')

    this.draw()
    const mouse = MousePosition.prototype.getInstance()
    this.updateCursorPosition(mouse.x, mouse.y)
    this.particleMovementStrategy.update(this.droplets)
  }

  draw = () => {
    // buffer canvas
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCtx.canvas.width,
      this.bufferCtx.canvas.height
    )

    this.#drawText(this.bufferCtx)
    this.particleRenderer.draw(this.bufferCtx, this.droplets)


    // main canvas
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    for (let layer = 0; layer < this.numLayers; layer++) {
      this.ctx.globalAlpha = this.layers[layer].alpha

      this.ctx.drawImage(
        this.bufferCtx.canvas,
        this.layers[layer].xOffset,
        this.layers[layer].yOffset,
        this.layers[layer].width,
        this.layers[layer].height,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      )
    }
  }

  #drawText = (ctx: OffscreenCanvasRenderingContext2D) => {
    if (!this.text) return
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.scale(-1, 1)
    for (let col = 0; col < this.text.length; col++) {
      ctx.fillText(
        this.text[col],
        (col - this.textEndCol + 1) * CELL_SIZE,
        this.textStartRow * CELL_SIZE
      )
    }
    ctx.scale(-1, 1)
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'
  }

  updateCursorPosition(x: number, y: number) {
    this.cursorPosition.x = this.bufferCtx.canvas.width - x
    this.cursorPosition.y = y
  }
}

export default DigitalRainPerformant
