const DEFAULT_CHARACTERS =
  '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

const COL_SIZE = 20
const ROW_SIZE = 20

class DigitalRainPerformant {
  constructor({
    canvas,
    numLayers = 1,
    characters = DEFAULT_CHARACTERS,
    density = 1,
  }) {
    this.#init(canvas, numLayers, characters, density)

    this.tick = this.tick.bind(this)
    this.draw = this.draw.bind(this)
    this.drawLayer = this.#drawLayer.bind(this)
    this.drawWave = this.#drawWave.bind(this)
    this.drawSymbol = this.#drawSymbol.bind(this)
  }

  #init(canvas, numLayers, characters, density) {
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
    // const foreground_cols = Math.ceil(view_width / COL_SIZE)

    const rows = Math.ceil(buffer_height / ROW_SIZE)
    const cols = Math.ceil(buffer_width / COL_SIZE)

    // generate waves of droplets
    const wave_length = Math.ceil(foreground_rows / density)
    const waves = new Array(Math.ceil(rows / wave_length) + 1)
      .fill(0)
      .map((x, i) => {
        return {
          offsets: new Array(cols)
            .fill(0)
            .map(() => -(randomInt(wave_length) + i * wave_length) * ROW_SIZE),
          // color: ['red', 'green', 'yellow', 'magenta'][i % 6],
          color: 'rgb(0, 255, 70)',
        }
      })

    // generate random strings for all columns
    const strings = new Array(cols)
      .fill(0)
      .map(() => generateRandomString(rows, characters).split(''))

    this.time = 0
    this.prevReset = rows
    this.d_y = 0

    this.ctx = canvas.getContext('2d')

    this.buffer_ctx = buffer_canvas.getContext('2d')
    this.buffer_ctx.font = `${ROW_SIZE}px monospace`
    this.buffer_ctx.textBaseline = 'middle'
    this.buffer_ctx.textAlign = 'center'
    this.buffer_ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    this.buffer_ctx.shadowBlur = 4

    this.num_layers = numLayers
    this.layers = new Array(numLayers).fill(0).map((_, i) => {
      const scale = i + 1
      return {
        scale,
        alpha: scale / numLayers,
        xOffset: randomInt(buffer_width - buffer_width / scale),
        // yOffset: randomInt(buffer_height - buffer_height / scale),
        yOffset: 0,
        width: buffer_width / scale,
        height: buffer_height / scale,
      }
    })

    this.rows = rows
    this.cols = cols

    this.wave_length = wave_length
    this.waves = waves

    this.strings = strings
  }

  tick() {
    console.log('tick')
    this.draw()

    this.time++
    this.d_y += ROW_SIZE

    if (this.time >= this.prevReset + this.wave_length) {
      console.log('reset')
      this.prevReset = this.time

      this.waves[0].offsets = this.waves[0].offsets.map(
        () => -this.d_y - randomInt(this.wave_length) * ROW_SIZE
      )

      this.waves.push(this.waves.shift())
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
    this.#drawLayer()
    this.buffer_ctx.translate(0, -this.d_y)

    // fade out previous frame
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
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

  #drawLayer() {
    const row = this.time % this.rows

    for (let wave_index = 0; wave_index < this.waves.length; wave_index++) {
      this.#drawWave(wave_index, row)
    }
  }

  #drawWave(wave_index, row) {
    let x = 0

    this.buffer_ctx.fillStyle = this.waves[wave_index].color
    for (let col = 0; col < this.cols; col++) {
      this.#drawSymbol({
        symbol: this.strings[col][row],
        x,
        y: this.waves[wave_index].offsets[col],
        alpha: 1,
        color: '0, 255, 70',
        flip: true,
      })

      x += COL_SIZE
    }
  }

  #drawSymbol({ symbol, x, y, alpha = 1, color = '0, 255, 70', flip = false }) {
    // this.buffer_ctx.fillStyle = `rgba(${color}, ${alpha})`

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
