import Particle from './Particle'
import { displaceAround, restoreInitialVelocity } from './particleManipulations'

const DEFAULT_CHARACTERS =
  '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

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
    characters = DEFAULT_CHARACTERS,
    density = 1,
    text = '',
  }) {
    this.characters = characters
    this.#init(canvas, numLayers, density, text)

    this.tick = this.tick.bind(this)
    this.draw = this.draw.bind(this)
  }

  #init(canvas, numLayers, density, text) {
    console.log('init')

    // get/set canvas dimensions
    const view_width = (canvas.width = window.innerWidth)
    const view_height = (canvas.height = window.innerHeight)

    this.ctx = canvas.getContext('2d')

    // create buffer canvas
    const buffer_scale = 1 / numLayers
    const buffer_height = Math.ceil(view_height / buffer_scale)
    const buffer_width = Math.ceil(view_width / buffer_scale)

    this.buffer_ctx = this.#initDrawingContext(buffer_width, buffer_height)

    // calculate number of rows and columns
    // const foreground_rows = Math.ceil(view_height / ROW_SIZE)
    const foreground_cols = Math.ceil(view_width / CELL_SIZE)

    const rows = Math.ceil(buffer_height / CELL_SIZE)
    const cols = Math.ceil(buffer_width / CELL_SIZE)
    this.rows = rows
    this.cols = cols

    // set text in center of screen
    this.text = text
    const text_rows = Math.ceil(text.length / foreground_cols)
    const text_start_row = Math.floor((rows - text_rows) / 2)
    const text_start_col = Math.floor((cols - text.length) / 2)

    this.text_start_row = text_start_row
    this.text_start_col = text_start_col
    this.text_end_row = text_start_row + text_rows
    this.text_end_col = text_start_col + text.length

    // spawn droplets
    this.droplets = []
    const reversed_text = text.split('').reverse().join('')
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < density; i++) {
        const initial_y_position = -randomInt(rows) * CELL_SIZE

        let text_options = null
        if (col >= this.text_start_col && col < this.text_end_col) {
          text_options = {
            position: {
              x: (col - this.text_end_col + 1) * CELL_SIZE,
              y: this.text_start_row * CELL_SIZE,
            },
            symbol: reversed_text[col - this.text_start_col],
            color: 'white',
          }
        }

        this.#spawnDroplet(col, rows, initial_y_position, text_options)
      }
    }

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

    this.cursor_position = { x: -100, y: 0 }
  }

  #initDrawingContext(width, height) {
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.font = `${CELL_SIZE}px monospace`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'
    ctx.scale(-1, 1)
    ctx.translate(-width, 0)
    // ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // ctx.shadowBlur = 4

    return ctx
  }

  #spawnDroplet(col, rows, start_y = 0, text_options = null) {
    const x = col * CELL_SIZE
    const y = start_y
    const symbols = generateRandomString(rows, this.characters).split('')

    this.droplets.push(
      new Particle({
        initial_position: { x, y },
        initial_velocity: { x: 0, y: CELL_SIZE },
        bounds: {
          x_start: 0,
          y_start: 0,
          x_end: this.buffer_ctx.canvas.width,
          y_end: this.buffer_ctx.canvas.height,
        },
        resolution: CELL_SIZE,
        symbols,
        text_options,
      })
    )
  }

  tick() {
    console.log('tick')
    this.draw()

    // update droplets
    this.droplets.forEach((droplet) => droplet.move())
  }

  draw() {
    this.buffer_ctx.clearRect(
      0,
      0,
      this.buffer_ctx.canvas.width,
      this.buffer_ctx.canvas.height
    )

    // draw droplets
    this.droplets.forEach((droplet) => droplet.draw(this.buffer_ctx))

    // draw text
    this.buffer_ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    this.buffer_ctx.scale(-1, 1)
    for (let col = 0; col < this.text.length; col++) {
      this.buffer_ctx.fillText(
        this.text[col],
        (col - this.text_end_col + 1) * CELL_SIZE,
        this.text_start_row * CELL_SIZE
      )
    }
    this.buffer_ctx.scale(-1, 1)
    this.buffer_ctx.fillStyle = 'rgba(0, 255, 70, 1)'

    // fade out previous frame
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    // draw layers of rain
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

  updateCursorPosition(x, y) {
    this.cursor_position.x = x
    this.cursor_position.y = y

    const cursor_corrected = {
      x: -x + this.buffer_ctx.canvas.width,
      y,
    }

    // affect droplets
    for (let i = 0; i < this.droplets.length; i++) {
      const {
        position: p,
        velocity: v,
        color: c,
      } = restoreInitialVelocity(this.droplets[i])

      this.droplets[i].position.x = p.x
      this.droplets[i].velocity = v
      this.droplets[i].color = c

      const { position, velocity, color } = displaceAround(
        cursor_corrected,
        this.droplets[i]
      )

      this.droplets[i].position.x = position.x
      this.droplets[i].velocity = velocity
      this.droplets[i].color = color
    }
  }
}

export default DigitalRainPerformant

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

const generateRandomString = (length, chars) => {
  let randomString = []
  for (let i = 0; i < length; i++) {
    randomString.push(chars[randomInt(chars.length)])
  }
  return randomString.join('')
}
