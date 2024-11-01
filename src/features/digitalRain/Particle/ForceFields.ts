import Particle, { Vector2D } from "./Particle"

import { ForceField } from "../PhysicalParticleMovement"

class InertiaForceField implements ForceField {
  inertia: number
  constructor(inertia = 0.9) {
    this.inertia = inertia
  }

  apply = (particle: Particle) => {
    particle.velocity.x *= this.inertia
    particle.velocity.y *= this.inertia
  }
}

class GravityForceField implements ForceField {
  gravity: number
  constructor(gravity = 0.1) {
    this.gravity = gravity
  }

  apply = (particle: Particle) => {
    particle.velocity.y += this.gravity
  }
}

class RepellingForceField implements ForceField {
  sourcePosition: Vector2D
  radius: number
  repellingForce: number

  constructor(sourcePosition: Vector2D, radius: number, repellingForce = 0.1) {
    this.sourcePosition = sourcePosition
    this.radius = radius
    this.repellingForce = repellingForce
  }

  apply = (particle: Particle) => {    
    const dx = particle.position.x - this.sourcePosition.x
    const dy = particle.position.y - this.sourcePosition.y
    if (dx > this.radius || dy > this.radius) return
    if (dx < -this.radius || dy < -this.radius) return

    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    if (distance < this.radius) {
      particle.velocity.x += dx * this.repellingForce
      particle.velocity.y += dy * this.repellingForce
    }
  }
}

export {
  InertiaForceField,
  GravityForceField,
  RepellingForceField,
}
