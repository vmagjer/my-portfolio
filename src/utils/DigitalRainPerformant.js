const DEFAULT_CHARACTERS =
  '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

const COL_SIZE = 20
const ROW_SIZE = 20


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
    this.drawLayer = this.#drawRain.bind(this)
    this.drawWave = this.#drawWave.bind(this)
    this.drawSymbol = this.#drawSymbol.bind(this)
  }

  #init(canvas, numLayers, characters, density, text) {
    console.log('init')
    // get canvas dimensions
    const view_width = (canvas.width = window.innerWidth)
    const view_height = (canvas.height = window.innerHeight)

    // create buffer canvas
    const buffer_scale = 1 / numLayers
    const buffer_height = Math.ceil(view_height / buffer_scale)
    const buffer_width = Math.ceil(view_width / buffer_scale)

    const buffer_canvas = new OffscreenCanvas(buffer_width, buffer_height)
    // buffer_canvas.width = buffer_width
    // buffer_canvas.height = buffer_height

    // calculate number of rows and columns
    const foreground_rows = Math.ceil(view_height / ROW_SIZE)
    const foreground_cols = Math.ceil(view_width / COL_SIZE)

    const rows = Math.ceil(buffer_height / ROW_SIZE)
    const cols = Math.ceil(buffer_width / COL_SIZE)

    // generate waves of droplets
    const wave_length = Math.ceil(foreground_rows / density)
    const waves = new Array(Math.ceil(rows / wave_length) + 1)
      .fill(0)
      .map((x, i) => {
        const offsets = new Array(cols)
          .fill(0)
          .map(() => randomInt(wave_length))

        return {
          offsets: offsets,
          offsets_y: offsets.map(
            (offset) => -(offset + i * wave_length) * ROW_SIZE
          ),
          color: ['red', 'green', 'yellow', 'magenta'][i % 6],
          // color: 'rgb(0, 255, 70)',
        }
      })

    // generate random strings for all columns
    const strings = new Array(cols)
      .fill(0)
      .map(() => generateRandomString(rows, characters).split(''))

    // set text in center of screen
    const text_rows = Math.ceil(text.length / foreground_cols)
    const text_start_row = Math.floor((rows - text_rows) / 2)
    const text_start_col = Math.floor((cols - text.length) / 2)

    for (let row = 0; row < text_rows; row++) {
      for (let col = 0; col < text.length; col++) {
        strings[text_start_col + col][text_start_row + row] =
          text[row * text.length + col]
      }
    }

    this.time = 0
    this.prevReset = rows
    this.d_y = 0

    this.time_cyclical = 0

    this.ctx = canvas.getContext('2d')

    this.buffer_ctx = buffer_canvas.getContext('2d')
    this.buffer_ctx.font = `${ROW_SIZE}px monospace`
    this.buffer_ctx.textBaseline = 'middle'
    this.buffer_ctx.textAlign = 'center'
    // this.buffer_ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // this.buffer_ctx.shadowBlur = 4

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

    this.rows = rows
    this.cols = cols

    this.wave_length = wave_length
    this.waves = waves

    this.strings = strings
    this.text_start_row = text_start_row
    this.text_start_col = text_start_col
    this.text_end_row = text_start_row + text_rows
    this.text_end_col = text_start_col + text.length
  }

  tick() {
    console.log('tick')
    this.draw()

    this.time++
    this.d_y += ROW_SIZE
    this.time_cyclical++

    if (this.time >= this.prevReset + this.wave_length) {
      console.log('reset')
      this.prevReset = this.time

      this.waves[0].offsets = this.waves[0].offsets.map(() =>
        randomInt(this.wave_length)
      )
      this.waves[0].offsets_y = this.waves[0].offsets.map(
        (offset) => -this.d_y - offset * ROW_SIZE
      )

      this.waves.push(this.waves.shift())
    }

    if (this.time_cyclical >= this.rows) {
      console.log('reset cyclical')
      this.time_cyclical = 0
    }
  }

  draw() {
    this.buffer_ctx.clearRect(
      0,
      0,
      this.buffer_ctx.canvas.width,
      this.buffer_ctx.canvas.height
    )

    this.buffer_ctx.translate(0, this.d_y)
    this.#drawRain()
    this.buffer_ctx.translate(0, -this.d_y) // required to clearRect
    this.#drawText()

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

  #drawText(){
    for (let row = this.text_start_row; row < this.text_end_row; row++) {
      for (let col = this.text_start_col; col < this.text_end_col; col++) {
        this.#drawSymbol({
          symbol: this.strings[col][row],
          x: col * COL_SIZE,
          y: row * ROW_SIZE,
          alpha: 1,
          color: 'rgba(200, 255, 200, 0.05)',
        })
      }
    }
  }

  #drawRain() {
    let wave_start = this.time_cyclical
    for (let wave_index = 0; wave_index < this.waves.length; wave_index++) {
      this.#drawWave(wave_index, wave_start)
      wave_start -= this.wave_length
    }
  }

  #drawWave(wave_index, wave_row) {
    let x = 0

    for (let col = 0; col < this.cols; col++) {
      
      let row = wave_row - this.waves[wave_index].offsets[col]
      if (row < 0) row += this.rows
      
      const isText = this.#isInText(row, col)
      
      this.#drawSymbol({
        symbol: this.strings[col][row],
        x,
        y: this.waves[wave_index].offsets_y[col],
        alpha: 1,
        // color: '0, 255, 70',
        color: isText ? 'rgb(200, 255, 200)' : this.waves[wave_index].color,
        flip: !isText,
      })

      x += COL_SIZE
    }
  }

  #isInText(row, col) {
    return (
      row >= this.text_start_row &&
      row < this.text_end_row &&
      col >= this.text_start_col &&
      col < this.text_end_col
    )
  }

  #drawSymbol({ symbol, x, y, alpha = 1, color = 'white', flip = false }) {
    this.buffer_ctx.fillStyle = color

    this.buffer_ctx.translate(x, y)
    if (flip) this.buffer_ctx.scale(-1, 1)

    this.buffer_ctx.fillText(symbol, 0, 0)

    // Reset transformations
    if (flip) this.buffer_ctx.scale(-1, 1)
    this.buffer_ctx.translate(-x, -y)
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
