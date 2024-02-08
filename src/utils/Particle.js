class Particle {
  constructor({
    initial_position = { x: 0, y: 0 },
    initial_velocity = { x: 0, y: 20 },
    initial_is_visible = true,
  }) {
    this.position = { ...initial_position }
    this.velocity = { ...initial_velocity }
    this.isVisible = initial_is_visible

    this.initial_position = initial_position
    this.initial_velocity = initial_velocity
    this.initial_is_visible = initial_is_visible
  }

  reset = () => {
    this.position.x = this.initial_position.x
    this.position.y = this.initial_position.y
    this.velocity.x = this.initial_velocity.x
    this.velocity.y = this.initial_velocity.y
    this.isVisible = this.initial_is_visible
  }
}

export default Particle
