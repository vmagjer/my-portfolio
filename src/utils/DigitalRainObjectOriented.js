import Particle from './Particle'
import ParticleMovementStrategy from './ParticleMovementStrategy'
import DigitalRainParticleRenderer from './ParticleRenderer'
import { GravityForceField, InertiaForceField, RepellingForceField } from './particleManipulations'
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

    const view_width = (canvas.width = window.innerWidth)
    const view_height = (canvas.height = window.innerHeight)
    this.ctx = canvas.getContext('2d')

    const buffer_height = Math.ceil(view_height * numLayers)
    const buffer_width = Math.ceil(view_width * numLayers)
    this.buffer_ctx = this.#initDrawingContext(buffer_width, buffer_height)

    this.rows = Math.ceil(buffer_height / CELL_SIZE)
    this.cols = Math.ceil(buffer_width / CELL_SIZE)    
    
    const terminal_velocity = CELL_SIZE
    this.droplets = this.#initRain(this.cols, this.rows, density, terminal_velocity)

    const bounds = {
      x_start: 0,
      y_start: 0,
      x_end: this.buffer_ctx.canvas.width,
      y_end: this.buffer_ctx.canvas.height,
    }
    this.cursor_position = { x: -100, y: 0 }
    this.particleMovementStrategy = this.#initRainMovement(bounds, this.cursor_position, terminal_velocity)

    this.text = text
    this.particleRenderer = new DigitalRainParticleRenderer({
      bounds,
      numParticles: this.droplets.length,
      numSymbols: this.rows,
      resolution: CELL_SIZE,
      text,
    })

    this.num_layers = numLayers
    this.layers = new Array(numLayers).fill(0).map((_, i) => {
      const scale = i + 1
      return {
        scale,
        alpha: scale / numLayers,
        xOffset: buffer_width / 2 - buffer_width / scale / 2,
        yOffset: buffer_height / 2 - buffer_height / scale / 2,
        width: buffer_width / scale,
        height: buffer_height / scale,
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
        const initial_y_position = -randomInt(rows) * CELL_SIZE
        const particle = new Particle({
          initial_position: { x: col * CELL_SIZE, y: initial_y_position },
          initial_velocity: { x: 0, y: velocityY },
          initial_is_visible: false,
        })
        droplets.push(particle)
      }
    }
    return droplets
  }

  #initRainMovement(bounds, cursor_position, terminal_velocity) {
    const inertia = 0.9
    const gravity = terminal_velocity / inertia - CELL_SIZE
    const repelling_radius = 100
    const repelling_force = 0.1
    const forceFields = [
      new InertiaForceField(inertia),
      new GravityForceField(gravity),
      new RepellingForceField(cursor_position, repelling_radius, repelling_force),
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
    this.buffer_ctx.clearRect(
      0,
      0,
      this.buffer_ctx.canvas.width,
      this.buffer_ctx.canvas.height
    )

    this.#drawText(this.buffer_ctx)
    this.particleRenderer.draw(this.buffer_ctx, this.droplets)
    

    // main canvas
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    for (let layer = 0; layer < this.num_layers; layer++) {
      this.ctx.globalAlpha = this.layers[layer].alpha

      this.ctx.drawImage(
        this.buffer_ctx.canvas,
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
        (col - this.text_end_col + 1) * CELL_SIZE,
        this.text_start_row * CELL_SIZE
      )
    }
    ctx.scale(-1, 1)
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'
  }

  updateCursorPosition(x, y) {
    this.cursor_position.x = this.buffer_ctx.canvas.width - x
    this.cursor_position.y = y
  }
}

export default DigitalRainPerformant
