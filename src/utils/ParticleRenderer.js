import { generateRandomString } from "./random"

const SYMBOLS = '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

class DigitalRainParticleRenderer {
  #symbols
  #num_symbols
  #symbol_index = 0
  #resolution
  #text
  #text_y
  #text_x_start
  #text_x_end

  constructor({numParticles, numSymbols, bounds, resolution = 1, text = null}) {
    this.#num_symbols = numSymbols
    this.#symbols = new Array(numParticles)
      .fill(0)
      .map(() => generateRandomString(numSymbols, SYMBOLS))

    this.#resolution = resolution

    this.#text = text
    // TODO: text wrapping
    const text_width = text ? text.length * resolution : 0
    this.#text_y = bounds.y_start + (bounds.y_end - bounds.y_start) / 2
    this.#text_x_start =
      bounds.x_start + (bounds.x_end - bounds.x_start - text_width) / 2
    this.#text_x_end = this.#text_x_start + text_width
  }

  draw = (ctx, particles) => {
    ctx.font = `${this.#resolution}px monospace`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'
    // ctx.shadowColor = 'rgba(0, 255, 70, 0.5)'
    // ctx.shadowBlur = 4

    for (let i = 0; i < particles.length; i++) {
      if (!particles[i].isVisible) continue

      const { x, y } = particles[i].position
      let symbol = this.#symbols[i][this.#symbol_index]

      const textIndex = this.#nearestTextIndex(x, y)
      if (textIndex < 0) {
        ctx.fillText(symbol, x, y)
      } else {
        symbol = this.#text[textIndex]

        // flip the text
        const translate_x = x * 2
        ctx.translate(translate_x, 0)
        ctx.scale(-1, 1)

        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fillText(symbol, x, y)
        ctx.fillStyle = 'rgba(0, 255, 70, 1)'

        // flip back
        ctx.scale(-1, 1)
        ctx.translate(-translate_x, 0)
      }
    }

    this.#nextSymbol()
  }

  #nearestTextIndex = (x, y) => {
    if (!this.#text) return -1

    const dy = y - this.#text_y
    const range = 2
    if (dy < range || dy > range) return -1

    const leftBound = this.#text_x_start - range
    const rightBound = this.#text_x_end + range
    if (x < leftBound || x > rightBound) return -1

    return Math.round((x - this.#text_x_start) / this.#resolution)
  }

  #nextSymbol() {
    this.#symbol_index++
    if (this.#symbol_index >= this.#num_symbols) {
      this.#symbol_index = 0
    }
  }
}

export default DigitalRainParticleRenderer

