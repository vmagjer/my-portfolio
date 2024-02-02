class Particle {
  constructor({
    x,
    y,
    initial_velocity = { x: 0, y: 20 },
    bounds = { x_start: 0, y_start: 0, x_end: 0, y_end: 0 },
    resolution = 20,

    symbols,
    text_options = null,
    color = 'rgba(0, 255, 70, 1)',
  }) {
    this.x = x
    this.y = y
    this.velocity = initial_velocity

    this.initial_position = { x, y }
    this.initial_velocity = initial_velocity

    this.bounds = bounds
    this.isInBounds = this.#isInBounds()

    this.symbols = symbols
    this.symbol_index = 0

    this.text_options = text_options
    this.color = color

    this.draw = this.draw.bind(this)
    this.drop = this.move.bind(this)
  }

  move() {
    this.x += this.velocity.x
    this.y += this.velocity.y

    const prevIsInBounds = this.isInBounds
    this.isInBounds = this.#isInBounds()
    if (!this.isInBounds && prevIsInBounds) {
      this.#reset()
    }

    this.symbol_index++
    if (this.symbol_index >= this.symbols.length) {
      this.symbol_index = 0
    }
  }

  #isInBounds() {
    return (
      this.y >= this.bounds.y_start &&
      this.y <= this.bounds.y_end &&
      this.x >= this.bounds.x_start &&
      this.x <= this.bounds.x_end
    )
  }

  #reset() {
    this.x = this.initial_position.x
    this.y = this.initial_position.y
    this.velocity = this.initial_velocity
  }

  draw(ctx) {
    if (!this.isInBounds) return
    if (this.text_options && this.y === this.text_options.position.y) {
      const translate_x = this.x * 2

      ctx.fillStyle = this.text_options.color
      ctx.translate(translate_x, 0)
      ctx.scale(-1, 1)

      ctx.fillText(this.text_options.symbol, this.x, this.y)

      ctx.scale(-1, 1)
      ctx.translate(-translate_x, 0)
      // ctx.fillStyle = this.color
    } else {
      ctx.fillStyle = this.color
      ctx.fillText(this.symbols[this.symbol_index], this.x, this.y)
    }
  }
}

export default Particle
