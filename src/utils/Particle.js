class Particle {
  constructor({
    initialPosition = { x: 0, y: 0 },
    initialVelocity = { x: 0, y: 20 },
    initialIsVisible = true,
  }) {
    this.position = { ...initialPosition }
    this.velocity = { ...initialVelocity }
    this.isVisible = initialIsVisible

    this.initialPosition = initialPosition
    this.initialVelocity = initialVelocity
    this.initialIsVisible = initialIsVisible
  }

  reset = () => {
    this.position.x = this.initialPosition.x
    this.position.y = this.initialPosition.y
    this.velocity.x = this.initialVelocity.x
    this.velocity.y = this.initialVelocity.y
    this.isVisible = this.initialIsVisible
  }
}

export default Particle
