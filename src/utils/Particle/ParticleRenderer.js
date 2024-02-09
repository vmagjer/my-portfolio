import { generateRandomString } from "../random"

const SYMBOLS = '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

class DigitalRainParticleRenderer {
  #symbols
  #numSymbols
  #symbolIndex = 0
  #resolution
  #text
  #textY
  #textXStart
  #textXEnd

  constructor({numParticles, numSymbols, bounds, resolution = 1, text = null}) {
    this.#numSymbols = numSymbols
    this.#symbols = new Array(numParticles)
      .fill(0)
      .map(() => generateRandomString(numSymbols, SYMBOLS))

    this.#resolution = resolution

    this.#text = text
    // TODO: text wrapping
    const textWidth = text ? text.length * resolution : 0
    this.#textY = bounds.yStart + (bounds.yEnd - bounds.yStart) / 2
    this.#textXStart =
      bounds.xStart + (bounds.xEnd - bounds.xStart - textWidth) / 2
    this.#textXEnd = this.#textXStart + textWidth
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
      let symbol = this.#symbols[i][this.#symbolIndex]

      const textIndex = this.#nearestTextIndex(x, y)
      if (textIndex < 0) {
        ctx.fillText(symbol, x, y)
      } else {
        symbol = this.#text[textIndex]

        // flip the text
        const translateX = x * 2
        ctx.translate(translateX, 0)
        ctx.scale(-1, 1)

        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fillText(symbol, x, y)
        ctx.fillStyle = 'rgba(0, 255, 70, 1)'

        // flip back
        ctx.scale(-1, 1)
        ctx.translate(-translateX, 0)
      }
    }

    this.#nextSymbol()
  }

  #nearestTextIndex = (x, y) => {
    if (!this.#text) return -1

    const dy = y - this.#textY
    const range = 2
    if (dy < range || dy > range) return -1

    const leftBound = this.#textXStart - range
    const rightBound = this.#textXEnd + range
    if (x < leftBound || x > rightBound) return -1

    return Math.round((x - this.#textXStart) / this.#resolution)
  }

  #nextSymbol() {
    this.#symbolIndex++
    if (this.#symbolIndex >= this.#numSymbols) {
      this.#symbolIndex = 0
    }
  }
}

export default DigitalRainParticleRenderer

