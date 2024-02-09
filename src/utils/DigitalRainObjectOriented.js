import Particle from './Particle/Particle'
import ParticleMovementStrategy from './Particle/ParticleMovementStrategy'
import DigitalRainParticleRenderer from './Particle/ParticleRenderer'
import { GravityForceField, InertiaForceField, RepellingForceField } from './Particle/particleManipulations'
import { randomInt } from './random'

const CELL_SIZE = 20

/**
 * Uses an offscreen canvas to draw the rain, then draws the offscreen canvas to the main canvas for each layer of rain.
 * Utilizes translate and scale to draw the rain in the correct position.
 * Relies on hardware acceleration to improve performance.
 */
class DigitalRainPerformant {
  constructor({
    canvas,
    numLayers = 1,
    density = 1,
    text = '',
  }) {
    this.#init(canvas, numLayers, density, text)
  }

  #init(canvas, numLayers, density, text) {
    console.log('init')

    const viewWidth = (canvas.width = window.innerWidth)
    const viewHeight = (canvas.height = window.innerHeight)
    this.ctx = canvas.getContext('2d')

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

  #initDrawingContext(width, height) {
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.scale(-1, 1)
    ctx.translate(-width, 0)
    // ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // ctx.shadowBlur = 4

    return ctx
  }

  #initRain(cols, rows, density, velocityY) {
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

  #initRainMovement(bounds, cursorPosition, terminalVelocity) {
    const inertia = 0.9
    const gravity = terminalVelocity / inertia - CELL_SIZE
    const repellingRadius = 100
    const repellingForce = 0.1
    const forceFields = [
      new InertiaForceField(inertia),
      new GravityForceField(gravity),
      new RepellingForceField(cursorPosition, repellingRadius, repellingForce),
    ]
    return new ParticleMovementStrategy(bounds, forceFields)
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

  #drawText = (ctx) => {
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

  updateCursorPosition(x, y) {
    this.cursorPosition.x = this.bufferCtx.canvas.width - x
    this.cursorPosition.y = y
  }
}

export default DigitalRainPerformant
