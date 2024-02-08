class ParticleMovementStrategy {
  constructor(bounds, forceFields) {
    this.bounds = bounds
    this.forceFields = forceFields
  }

  update = (particles) => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]

      this.#updatePositionSingle(particle)
      this.#updateVelocitySingle(particle)

      this.#afterUpdateSingle(particle)
    }
  }

  #updatePositionSingle = (particle) => {
    particle.position.x += particle.velocity.x
    particle.position.y += particle.velocity.y
  }

  #updateVelocitySingle = (particle) => {
    for (let i = 0; i < this.forceFields.length; i++) {
      this.forceFields[i].apply(particle)
    }
  }

  #afterUpdateSingle = (particle) => {
    const prevIsVisible = particle.isVisible
    const currIsVisible =
      particle.position.y >= this.bounds.y_start &&
      particle.position.y <= this.bounds.y_end &&
      particle.position.x >= this.bounds.x_start &&
      particle.position.x <= this.bounds.x_end

    if (prevIsVisible && !currIsVisible) {
      particle.reset()
    } else {
      particle.isVisible = currIsVisible
    }
  }
}

export default ParticleMovementStrategy
