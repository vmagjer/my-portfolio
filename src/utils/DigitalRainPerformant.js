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
    const viewWidth = (canvas.width = window.innerWidth)
    const viewHeight = (canvas.height = window.innerHeight)

    // create buffer canvas
    const bufferScale = 1 / numLayers
    const bufferHeight = Math.ceil(viewHeight / bufferScale)
    const bufferWidth = Math.ceil(viewWidth / bufferScale)

    const bufferCanvas = new OffscreenCanvas(bufferWidth, bufferHeight)
    // bufferCanvas.width = bufferWidth
    // bufferCanvas.height = bufferHeight

    // calculate number of rows and columns
    const foregroundRows = Math.ceil(viewHeight / ROW_SIZE)
    const foregroundCols = Math.ceil(viewWidth / COL_SIZE)

    const rows = Math.ceil(bufferHeight / ROW_SIZE)
    const cols = Math.ceil(bufferWidth / COL_SIZE)

    // generate waves of droplets
    const waveLength = Math.ceil(foregroundRows / density)
    const waves = new Array(Math.ceil(rows / waveLength) + 1)
      .fill(0)
      .map((x, i) => {
        const offsets = new Array(cols)
          .fill(0)
          .map(() => randomInt(waveLength))

        return {
          offsets: offsets,
          offsetsY: offsets.map(
            (offset) => -(offset + i * waveLength) * ROW_SIZE
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
    const textRows = Math.ceil(text.length / foregroundCols)
    const textStartRow = Math.floor((rows - textRows) / 2)
    const textStartCol = Math.floor((cols - text.length) / 2)

    for (let row = 0; row < textRows; row++) {
      for (let col = 0; col < text.length; col++) {
        strings[textStartCol + col][textStartRow + row] =
          text[row * text.length + col]
      }
    }

    this.time = 0
    this.prevReset = rows
    this.dY = 0

    this.timeCyclical = 0

    this.ctx = canvas.getContext('2d')

    this.bufferCtx = bufferCanvas.getContext('2d')
    this.bufferCtx.font = `${ROW_SIZE}px monospace`
    this.bufferCtx.textBaseline = 'middle'
    this.bufferCtx.textAlign = 'center'
    // this.bufferCtx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // this.bufferCtx.shadowBlur = 4

    this.numLayers = numLayers
    this.layers = new Array(numLayers).fill(0).map((_, i) => {
      const scale = i + 1
      return {
        scale,
        alpha: scale / numLayers,
        // xOffset: randomInt(bufferWidth - bufferWidth / scale),
        xOffset: bufferWidth / 2 - bufferWidth / scale / 2,
        yOffset: bufferHeight / 2 - bufferHeight / scale / 2,
        width: bufferWidth / scale,
        height: bufferHeight / scale,
      }
    })

    this.rows = rows
    this.cols = cols

    this.waveLength = waveLength
    this.waves = waves

    this.strings = strings
    this.textStartRow = textStartRow
    this.textStartCol = textStartCol
    this.textEndRow = textStartRow + textRows
    this.textEndCol = textStartCol + text.length
  }

  tick() {
    console.log('tick')
    this.draw()

    this.time++
    this.dY += ROW_SIZE
    this.timeCyclical++

    if (this.time >= this.prevReset + this.waveLength) {
      console.log('reset')
      this.prevReset = this.time

      this.waves[0].offsets = this.waves[0].offsets.map(() =>
        randomInt(this.waveLength)
      )
      this.waves[0].offsetsY = this.waves[0].offsets.map(
        (offset) => -this.dY - offset * ROW_SIZE
      )

      this.waves.push(this.waves.shift())
    }

    if (this.timeCyclical >= this.rows) {
      console.log('reset cyclical')
      this.timeCyclical = 0
    }
  }

  draw() {
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCtx.canvas.width,
      this.bufferCtx.canvas.height
    )

    this.bufferCtx.translate(0, this.dY)
    this.#drawRain()
    this.bufferCtx.translate(0, -this.dY) // required to clearRect
    this.#drawText()

    // fade out previous frame
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    // draw layers of rain
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

  #drawText(){
    for (let row = this.textStartRow; row < this.textEndRow; row++) {
      for (let col = this.textStartCol; col < this.textEndCol; col++) {
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
    let waveStart = this.timeCyclical
    for (let waveIndex = 0; waveIndex < this.waves.length; waveIndex++) {
      this.#drawWave(waveIndex, waveStart)
      waveStart -= this.waveLength
    }
  }

  #drawWave(waveIndex, waveRow) {
    let x = 0

    for (let col = 0; col < this.cols; col++) {
      
      let row = waveRow - this.waves[waveIndex].offsets[col]
      if (row < 0) row += this.rows
      
      const isText = this.#isInText(row, col)
      
      this.#drawSymbol({
        symbol: this.strings[col][row],
        x,
        y: this.waves[waveIndex].offsetsY[col],
        alpha: 1,
        // color: '0, 255, 70',
        color: isText ? 'rgb(200, 255, 200)' : this.waves[waveIndex].color,
        flip: !isText,
      })

      x += COL_SIZE
    }
  }

  #isInText(row, col) {
    return (
      row >= this.textStartRow &&
      row < this.textEndRow &&
      col >= this.textStartCol &&
      col < this.textEndCol
    )
  }

  #drawSymbol({ symbol, x, y, alpha = 1, color = 'white', flip = false }) {
    this.bufferCtx.fillStyle = color

    this.bufferCtx.translate(x, y)
    if (flip) this.bufferCtx.scale(-1, 1)

    this.bufferCtx.fillText(symbol, 0, 0)

    // Reset transformations
    if (flip) this.bufferCtx.scale(-1, 1)
    this.bufferCtx.translate(-x, -y)
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
