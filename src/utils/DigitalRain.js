const DEFAULT_CHARACTERS =
  '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

const COL_SIZE = 20
const ROW_SIZE = 20

const MIN_LAYER_SCALE = 0.1
const MIN_LAYER_ALPHA = 0.1

class DigitalRain {
  constructor(canvas, numLayers = 1, characters = DEFAULT_CHARACTERS) {
    this.width = canvas.width = window.innerWidth
    this.height = canvas.height = window.innerHeight
    this.ctx = canvas.getContext("2d")

    const foregroundRows = Math.ceil(this.height / ROW_SIZE)

    this.dropletLength = Math.ceil(foregroundRows * 0.25)
    // this.dropletLength = 50
    this.dropletFrequency = Math.ceil(foregroundRows * 0.8)
    this.dropletVariance = foregroundRows

    this.dropletAlphaStep = 1 / this.dropletLength
    this.strings = new Array(20)
      .fill(0)
      .map(() =>
        generateRandomString(
          Math.ceil(this.height / ROW_SIZE / MIN_LAYER_SCALE),
          characters
        ).split("")
      )

    this.layers = []
    for (let i = 0; i < numLayers; i++) {
      const scale =
        MIN_LAYER_SCALE + ((i + 1) * (1 - MIN_LAYER_SCALE)) / numLayers
      const cols = Math.ceil(this.width / COL_SIZE / scale)
      const rows = Math.ceil(this.height / ROW_SIZE / scale)
      const alpha =
        MIN_LAYER_ALPHA + ((i + 1) * (1 - MIN_LAYER_ALPHA)) / numLayers

      this.layers.push({
        scale,
        cols,
        rows,
        alpha,
        counters: new Array(cols).fill(0).map(() => []), // array of all droplets in column

        characters: new Array(cols)
          .fill(0)
          .map(() => this.strings[randomInt(this.strings.length)]),
        // characters: this.strings,
      })
    }

    this.tick = this.tick.bind(this)
    this.draw = this.draw.bind(this)
    this.drawLayer = this.drawLayer.bind(this)
    this.drawSymbol = this.drawSymbol.bind(this)
  }

  tick() {
    this.draw()

    // increment all counters
    this.layers.forEach((layer) => {
      layer.counters.forEach((countersInCol, col) => {
        for (let i = 0; i < countersInCol.length; i++) {
          countersInCol[i]++
        }

        if (countersInCol.length === 0) {
          countersInCol.push(-randomInt(this.dropletVariance))
        } else {
          if (countersInCol[0] > layer.rows + this.dropletLength) {
            countersInCol.shift()
          }

          if (
            countersInCol[countersInCol.length - 1] === this.dropletFrequency
          ) {
            countersInCol.push(-randomInt(this.dropletVariance))
          }
        }
      })
    })

    // randomize some characters
    for (let i = 0; i < this.strings.length; i++) {
      const index = randomInt(this.strings[i].length)
      const newChar = DEFAULT_CHARACTERS[randomInt(DEFAULT_CHARACTERS.length)]
      this.strings[i][index] = newChar
    }
  }

  draw() {
    // this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    // this.ctx.fillRect(0, 0, this.width, this.height) // fade out previous frame (usable only if the symbols dont change - then only draw the droplet tip)
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.ctx.font = `${ROW_SIZE}px monospace`
    this.ctx.textBaseline = "top"
    this.ctx.textAlign = "center"
    this.ctx.shadowColor = "rgba(0, 255, 70, 0.5)"
    this.ctx.shadowBlur = 8

    this.layers.forEach((layer) => {
      this.drawLayer(layer)
    })
  }

  drawLayer(layer) {
    this.ctx.save()
    this.ctx.scale(layer.scale, layer.scale) // this should remove the need for any further scaling
    this.ctx.globalAlpha = layer.alpha

    let x = 0
    const xStep = COL_SIZE
    const yStep = ROW_SIZE
    const maxY = layer.rows * yStep

    for (let col = 0; col < layer.cols; col++) {
      let y = maxY

      // accounting for droplets out of bounds (assuming only one is out of bounds at a time)
      const d = layer.counters[col][0] - layer.rows
      let alpha = d > 0 ? 1 - this.dropletAlphaStep * d : 0 
      // let alpha = 0

      // drawing from bottom to top
      for (let row = layer.rows; row > -1; row--) {
        if (layer.counters[col].includes(row)) {
          alpha = 1
        }

        if (row <= layer.rows) {
          this.drawSymbol({
            symbol: layer.characters[col][row],
            x,
            y,
            alpha,
            color: "0, 255, 70",
            flip: true,
          })
        }

        alpha -= this.dropletAlphaStep
        y -= yStep
      }
      x += xStep
    }

    this.ctx.restore()
  }

  drawSymbol({ symbol, x, y, alpha = 1, color = "0, 255, 70", flip = false }) {
    this.ctx.save()
    this.ctx.fillStyle = `rgba(${color}, ${alpha})`
    this.ctx.translate(x, y)
    if (flip) this.ctx.scale(-1, 1)
    this.ctx.fillText(symbol, 0, 0)
    this.ctx.restore()
  }
}

export default DigitalRain

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

function setCharAt(str, index, chr) {
  // if (index > str.length - 1) return str
  return str.substring(0, index) + chr + str.substring(index + 1)
}

const generateRandomString = (length, chars) => {
  let randomString = ""
  for (let i = 0; i < length; i++) {
    randomString += chars[randomInt(chars.length)]
  }
  return randomString
}
