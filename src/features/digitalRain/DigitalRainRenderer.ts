import { Bounds, ParticleRenderer } from "./DigitalRainController"
import Particle, { Vector2D } from "./Particle/Particle"

import { generateRandomString } from "../../utils/random"

// const SYMBOLS = '012345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'
const SYMBOLS = 'ZA'

type DigitalRainRendererProps = {
  numParticles: number
  numSymbols: number
  bounds: Bounds
  resolution?: number
  text?: string
}

type CustomTextCharacter = {
  char: string
  position: Vector2D
  center: Vector2D
}

class DigitalRainRenderer implements ParticleRenderer {
  #symbols: string[]
  #symbolIndex = 0
  #resolution: number
  #text: {
    bounds: Bounds
    characters: CustomTextCharacter[]
  }

  constructor({ numParticles, numSymbols, bounds, resolution = 1, text = '' }: DigitalRainRendererProps) {
    this.#symbols = new Array(numParticles)
      .fill(0)
      .map(() => generateRandomString(numSymbols, SYMBOLS))

    this.#resolution = resolution

    // TODO: text wrapping    
    const viewWidth = Math.floor((bounds.end.x - bounds.start.x) / resolution) * resolution
    const viewHeight = Math.floor((bounds.end.y - bounds.start.y) / resolution) * resolution

    const textWidth = text.length * resolution
    const textStartX = Math.floor((bounds.start.x + (viewWidth - textWidth) / 2) / resolution) * resolution
    const textStartY = Math.floor((bounds.start.y + viewHeight / 2) / resolution) * resolution

    this.#text = {
      bounds: {
        start: { x: textStartX, y: textStartY },
        end: { x: textStartX + textWidth, y: textStartY + resolution },
      },
      characters: text.split('').map((char, i) => {
        const x = textStartX + i * resolution
        const y = textStartY
        return {
          char,
          position: { x, y: y },
          center: { x: x + resolution / 2, y: y + resolution / 2 },
        }
      }),
    }
  }

  draw = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, particles: Particle[]) => {
    ctx.font = `${this.#resolution}px monospace`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'

    this.#drawText(ctx)

    for (let i = 0; i < particles.length; i++) {
      if (!particles[i].isVisible) continue

      const { x, y } = particles[i].position

      // rotate letter so the bottom is in the direction of the movement
      const angle = Math.atan2(particles[i].velocity.y, particles[i].velocity.x) - Math.PI / 2
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.translate(-x, -y)
      
      const customCharacter = this.#nearestCharacter(x, y)
      if (customCharacter === undefined) {
        ctx.fillText(this.#symbols[i][this.#symbolIndex], x, y)
      } else {
        this.#drawMessageSymbol(ctx, x, y, customCharacter.char)
      }

      ctx.translate(x, y)
      ctx.rotate(-angle)
      ctx.translate(-x, -y)
    }

    this.#nextSymbol()
  }
  #nextSymbol() {
    this.#symbolIndex++
    if (this.#symbolIndex >= this.#symbols[0].length) {
      this.#symbolIndex = 0
    }
  }

  #nearestCharacter = (x: number, y: number): CustomTextCharacter | undefined => {
    if (this.#text.characters.length === 0) return undefined
    const radius = this.#resolution / 4
    if (
      y < this.#text.bounds.start.y - radius ||
      y > this.#text.bounds.end.y + radius
    )
      return undefined
    // if (x < this.text.bounds.start.x - radius || x > this.text.bounds.end.x + radius) return undefined

    const distanceFromTextEnd = this.#text.bounds.end.x - x

    const mirroredCharIndex = Math.round(distanceFromTextEnd / this.#resolution)+1
    if (
      mirroredCharIndex < 0 ||
      mirroredCharIndex >= this.#text.characters.length
    )
      return undefined

    if (this.#text.characters[mirroredCharIndex].char === ' ') return undefined
    return this.#text.characters[mirroredCharIndex]
  }


  #drawMessageSymbol(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, symbol: string) {
    // mirror the character
    const translateX = x * 2
    ctx.translate(translateX, 0)
    ctx.scale(-1, 1)

    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.fillText(symbol, x, y)
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'

    // mirror back
    ctx.scale(-1, 1)
    ctx.translate(-translateX, 0)
  }


  #drawText = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => {
    if (this.#text.characters.length === 0) return

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.translate(ctx.canvas.width, 0)
    ctx.scale(-1, 1)

    for (let col = 0; col < this.#text.characters.length; col++) {
      const { char, position } = this.#text.characters[col]
      ctx.fillText(char, position.x, position.y)
    }

    ctx.scale(-1, 1)
    ctx.translate(-ctx.canvas.width, 0)
    ctx.fillStyle = 'rgba(0, 255, 70, 1)'
  }
}

export default DigitalRainRenderer

