import { bounceOff, restoreInitialVelocity } from "./particleManipulations"

const DEFAULT_CHARACTERS =
  '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

const CELL_SIZE = 20
class Particle {
  constructor({
    x,
    y,
    symbols,
    y_max,
    text_options = null,
    color = 'rgba(0, 255, 70, 1)',
    start_velocity = { x: 0, y: 20 },
    bounds = { x: 0, y: 0, width: 0, height: 0 },
  }) {
    this.symbols = symbols
    this.symbol_index = 0
    this.text_position = Math.floor(symbols.length / 2) * CELL_SIZE
    this.text_options = text_options
    this.color = color

    this.x = x
    this.y = y
    this.initial_position = { x, y }

    this.velocity = start_velocity
    this.initial_velocity = start_velocity

    this._y_max = y_max
    this.bounds = bounds

    this.draw = this.draw.bind(this)
    this.drop = this.move.bind(this)
  }

  set y_max(max) {
    this._y_max = max
  }

  move() {
    this.x += this.velocity.x
    this.y += this.velocity.y

    this.symbol_index++
    if (this.symbol_index >= this.symbols.length) {
      this.symbol_index = 0
    }

    if (this.#isOutOfBounds()) {
      this.#reset()
    }
  }

  #reset() {
    this.x = this.initial_position.x
    this.y = this.initial_position.y
    this.velocity = this.initial_velocity
  }

  #isOutOfBounds() {
    return (
      this.x < this.bounds.x ||
      this.x > this.bounds.x + this.bounds.width ||
      this.y < this.bounds.y ||
      this.y > this.bounds.y + this.bounds.height
    )
  }

  draw(ctx) {
    if (this.y < 0) return
    if (this.text_options && this.y === this.text_position) {
      ctx.fillStyle = this.text_options.color
      ctx.translate(2 * this.x, 0)
      ctx.scale(-1, 1)
      ctx.fillText(this.text_options.symbol, this.x, this.y)
      ctx.scale(-1, 1)
      ctx.translate(-2 * this.x, 0)
      ctx.fillStyle = this.color
    } else {
      ctx.fillStyle = this.color
      ctx.fillText(this.symbols[this.symbol_index], this.x, this.y)
    }
  }
}

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
    this.#init(canvas, numLayers, characters, density, text)

    this.tick = this.tick.bind(this)
    this.draw = this.draw.bind(this)
  }

  #init(canvas, numLayers, characters, density, text) {
    console.log('init')
    // get canvas dimensions
    const view_width = (canvas.width = window.innerWidth)
    const view_height = (canvas.height = window.innerHeight)
    this.ctx = canvas.getContext('2d')

    // create buffer canvas
    const buffer_scale = 1 / numLayers
    const buffer_height = Math.ceil(view_height / buffer_scale)
    const buffer_width = Math.ceil(view_width / buffer_scale)

    const buffer_canvas = new OffscreenCanvas(buffer_width, buffer_height)
    this.buffer_ctx = buffer_canvas.getContext('2d')

    this.buffer_ctx.font = `${CELL_SIZE}px monospace`
    this.buffer_ctx.textBaseline = 'middle'
    this.buffer_ctx.textAlign = 'center'
    this.buffer_ctx.fillStyle = 'rgba(0, 255, 70, 1)'
    this.buffer_ctx.scale(-1, 1)
    this.buffer_ctx.translate(-buffer_width, 0)
    // this.buffer_ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // this.buffer_ctx.shadowBlur = 4

    // calculate number of rows and columns
    // const foreground_rows = Math.ceil(view_height / ROW_SIZE)
    const foreground_cols = Math.ceil(view_width / CELL_SIZE)

    const rows = Math.ceil(buffer_height / CELL_SIZE)
    const cols = Math.ceil(buffer_width / CELL_SIZE)
    this.rows = rows
    this.cols = cols

    // generate random strings for all columns
    const strings = new Array(cols)
      .fill(0)
      .map(() => generateRandomString(rows, characters).split(''))
    this.strings = strings

    // set text in center of screen
    this.text = text
    const text_rows = Math.ceil(text.length / foreground_cols)
    const text_start_row = Math.floor((rows - text_rows) / 2)
    const text_start_col = Math.floor((cols - text.length) / 2)

    // for (let row = 0; row < text_rows; row++) {
    //   for (let col = 0; col < text.length; col++) {
    //     strings[text_start_col + col][text_start_row + row] =
    //       text[row * text.length + col]
    //   }
    // }
    this.text_start_row = text_start_row
    this.text_start_col = text_start_col
    this.text_end_row = text_start_row + text_rows
    this.text_end_col = text_start_col + text.length

    this.droplets = []
    const reversed_text = text.split('').reverse().join('')
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < density; i++) {
        if (col >= this.text_start_col && col < this.text_end_col) {
          this.#spawnDroplet(col, -randomInt(this.rows) * CELL_SIZE, {
            symbol: reversed_text[col - this.text_start_col],
            color: 'white',
          })
        } else {
          this.#spawnDroplet(col, -randomInt(this.rows) * CELL_SIZE)
        }
      }
    }

    this.num_layers = numLayers
    this.layers = new Array(numLayers).fill(0).map((_, i) => {
      const scale = i + 1
      return {
        scale,
        alpha: scale / numLayers,
        // xOffset: randomInt(buffer_width - buffer_width / scale),
        xOffset: buffer_width / 2 - buffer_width / scale / 2,
        yOffset: buffer_height / 2 - buffer_height / scale / 2,
        width: buffer_width / scale,
        height: buffer_height / scale,
      }
    })

    this.time = 0

    this.wave_time = 0

    this.cursor_position = { x: -100, y: 0 }
  }

  #spawnDroplet(col, start_y = 0, text_options = null) {
    const x = col * CELL_SIZE
    const y = start_y
    const symbols = this.strings[col]

    this.droplets.push(
      new Particle({
        x,
        y,
        symbols,
        start_velocity: { x: 0, y: CELL_SIZE },
        y_max: this.rows * CELL_SIZE,
        text_options,
        bounds: {
          x: 0,
          y: -this.buffer_ctx.canvas.height,
          width: this.buffer_ctx.canvas.width,
          height: this.buffer_ctx.canvas.height * 2,
        },
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

    for (let i = 0; i < this.droplets.length; i++) {      
      const {
        position: p,
        velocity: v,
        color: c,
      } = restoreInitialVelocity(this.droplets[i])

      this.droplets[i].x = p.x
      this.droplets[i].velocity = v
      this.droplets[i].color = c

      const { position, velocity, color } = bounceOff(
        cursor_corrected,
        this.droplets[i]
      )

      this.droplets[i].x = position.x
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
