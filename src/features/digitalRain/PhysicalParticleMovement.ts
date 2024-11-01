import { Bounds } from "./DigitalRainController"
import Particle from "./Particle/Particle"

export interface ForceField {
  apply: (particle: Particle) => void
}

class PhysicalParticleMovement {
  bounds: Bounds
  forceFields: ForceField[]

  constructor(bounds: Bounds, forceFields: ForceField[]) {
    this.bounds = bounds
    this.forceFields = forceFields
  }

  update = (particles: Particle[]) => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]

      this.#updatePositionSingle(particle)
      this.#updateVelocitySingle(particle)

      this.#afterUpdateSingle(particle)
    }
  }

  #updatePositionSingle = (particle: Particle) => {
    particle.position.x += particle.velocity.x
    particle.position.y += particle.velocity.y
  }

  #updateVelocitySingle = (particle: Particle) => {
    for (let i = 0; i < this.forceFields.length; i++) {
      this.forceFields[i].apply(particle)
    }
  }

  #afterUpdateSingle = (particle: Particle) => {
    const prevIsVisible = particle.isVisible
    const currIsVisible =
      particle.position.y >= this.bounds.start.y &&
      particle.position.y <= this.bounds.end.y &&
      particle.position.x >= this.bounds.start.x &&
      particle.position.x <= this.bounds.end.x

    if (prevIsVisible && !currIsVisible) {
      particle.reset()
    } else {
      particle.isVisible = currIsVisible
    }
  }
}

export default PhysicalParticleMovement
