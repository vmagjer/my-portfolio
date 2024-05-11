import MousePosition from '../MousePosition'
import Particle, { Vector2D } from '../Particle/Particle'
import PhysicalParticleMovement from './PhysicalParticleMovement'
import { GravityForceField, InertiaForceField, RepellingForceField } from '../Particle/ForceFields'
import DigitalRainRenderer from './DigitalRainRenderer'
import { randomInt } from '../random'

const CELL_SIZE = 20

export type Bounds = { start: Vector2D, end: Vector2D }
type Layer = { scale: number, alpha: number, xOffset: number, yOffset: number, width: number, height: number }
export interface ParticleRenderer {
  draw: (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, particles: Particle[]) => void
}
export interface ParticleMovementStrategy {
  update: (particles: Particle[]) => void
}

/**
 * Uses an offscreen canvas to draw the rain, then draws the offscreen canvas to the main canvas for each layer of rain.
 * Utilizes translate and scale to draw the rain in the correct position.
 * Relies on hardware acceleration to improve performance.
 * Only computes the farthest layer of rain, and copies portions of it for other layers.
 */
class DigitalRainController {
  particleMovementStrategy: ParticleMovementStrategy
  particleRenderer: ParticleRenderer

  ctx: CanvasRenderingContext2D
  bufferCtx: OffscreenCanvasRenderingContext2D
  
  droplets: Particle[]

  layers: Layer[]

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
    const viewWidth = (canvas.width = window.innerWidth)
    const viewHeight = (canvas.height = window.innerHeight)

    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2d context')
    this.ctx = ctx

    const bufferHeight = Math.ceil(viewHeight * numLayers)
    const bufferWidth = Math.ceil(viewWidth * numLayers)
    this.bufferCtx = this.#initDrawingContext(bufferWidth, bufferHeight)

    const rows = Math.ceil(bufferHeight / CELL_SIZE)
    const cols = Math.ceil(bufferWidth / CELL_SIZE)

    const terminalVelocity = CELL_SIZE
    this.droplets = this.#initRain(cols, rows, density, terminalVelocity)

    const bounds: Bounds = {
      start: { x: 0, y: 0 },
      end: { x: bufferWidth, y: bufferHeight },
    }
    this.particleMovementStrategy = this.#initRainMovement(bounds, terminalVelocity, numLayers)

    this.particleRenderer = new DigitalRainRenderer({
      bounds,
      numParticles: this.droplets.length,
      numSymbols: rows,
      resolution: CELL_SIZE,
      text,
    })

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

    return ctx
  }

  #initRain(cols: number, rows: number, density: number, velocityY: number): Particle[] {
    const droplets = []
    for (let col = 0; col < cols; col++) {
      const x = col * CELL_SIZE
      for (let i = 0; i < density; i++) {
        const y = -randomInt(rows) * CELL_SIZE
        const particle = new Particle({
          initialPosition: { x: x, y: y },
          initialVelocity: { x: 0, y: velocityY },
          initialIsVisible: false,
        })
        droplets.push(particle)
      }
    }
    return droplets
  }

  #initRainMovement(bounds: Bounds, terminalVelocity: number, scale: number): PhysicalParticleMovement {
    const inertia = 0.9
    const gravity = terminalVelocity / inertia - CELL_SIZE
    const repellingRadius = 100
    const repellingStrength = 0.1
    const forceFields = [
      new InertiaForceField(inertia),
      new GravityForceField(gravity),
      new RepellingForceField(CorrectedMousePosition(this.bufferCtx.canvas.width, this.bufferCtx.canvas.height, scale), repellingRadius, repellingStrength),
    ]
    return new PhysicalParticleMovement(bounds, forceFields)
  }

  tick = () => {
    console.log('tick')

    this.draw()
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

    this.particleRenderer.draw(this.bufferCtx, this.droplets)


    // main canvas
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    for (let layer = 0; layer < this.layers.length; layer++) {
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
}

export default DigitalRainController


function CorrectedMousePosition(width:number, height: number, scale: number): Vector2D {
  console.log('scale', scale)
  const xOffset  = width / scale / 2
  const yOffset = height / scale / 2
  return {
    get x() {
      return width - (xOffset + MousePosition.prototype.getInstance().x)
    },
    get y() {
      return MousePosition.prototype.getInstance().y + yOffset
    }  
  }
}