export class NetworkRenderer {
  isPlaying = true
  constructor(nodes, adjacencyMatrix, updatingStrategy, drawingStrategy, ctx) {
    this.center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 }
    this.radius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2

    this.particles = nodes.map((node) => ({
      node,
      x: this.center.x + Math.random() * this.radius - this.radius / 2,
      y: this.center.y + Math.random() * this.radius - this.radius / 2,
      fx: 0,
      fy: 0,
    }))

    this.links = []
    const maxAdjacency = Math.max(...adjacencyMatrix.flat())
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = i + 1; j < adjacencyMatrix[i].length; j++) {
        if (adjacencyMatrix[i][j] === 0) continue
        this.links.push({
          source: i,
          target: j,
          strength: adjacencyMatrix[i][j] / maxAdjacency,
        })
      }
    }

    this.updatingStrategy = updatingStrategy
    this.drawingStrategy = drawingStrategy
  }

  update() {
    if (!this.isPlaying) return
    this.updatingStrategy.updateForces(this.particles, this.links)
    this.updatingStrategy.updatePositions(this.particles)
 
  }

  draw(ctx) {
    this.links.forEach((link) => {
      this.drawingStrategy.drawLink(link, this.particles, ctx)
    })
    this.particles.forEach((particle) => {
      this.drawingStrategy.drawNode(particle, ctx)
    })
  }

  reset() {
    this.particles.forEach((particle) => {
      particle.x = this.center.x + Math.random() * this.radius - this.radius / 2
      particle.y = this.center.y + Math.random() * this.radius - this.radius / 2
    })
  }
}

// https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6297585
export class NetworkUpdatingStrategy {
  timeBudget = 300
  timeSpent = 0
  constructor({
    L,
    K_r,
    R,
    delta_t,
    max_displacement_squared,
    center,
    centeringForce = 0.0001,
  }) {
    this.L = L // spring rest length
    this.K_r = K_r // repulsion constant
    this.R = R
    this.K_s = K_r / (R * L ** 3) // spring constant
    this.delta_t_init = delta_t
    this.delta_t = delta_t * 1000
    this.max_displacement_squared = max_displacement_squared
    this.centeringForce = centeringForce
    this.center = center
  }

  updateForces(particles, links) {
    // reset velocities
    particles.forEach((particle) => {
      particle.fx = 0
      particle.fy = 0
    })
    // attraction between adjacent pairs
    links.forEach(({ source, target, strength }) => {
      const { x: x1, y: y1 } = particles[source]
      const { x: x2, y: y2 } = particles[target]

      const dx = x2 - x1
      const dy = y2 - y1
      if (dx === 0 && dy === 0) {
        return
      }
      const distanceSquared = dx ** 2 + dy ** 2
      const distance = Math.sqrt(distanceSquared)
      const force = (this.K_s / (distance - this.L)) * (0.6 + strength)
      const fx = (dx * force) / distance
      const fy = (dy * force) / distance

      particles[source].fx += fx
      particles[source].fy += fy
      particles[target].fx -= fx
      particles[target].fy -= fy
    })

    // repulsion between all pairs
    for (let i = 0; i < particles.length - 1; i++) {
      const { x: x1, y: y1 } = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        const { x: x2, y: y2 } = particles[j]

        const dx = x2 - x1
        const dy = y2 - y1
        if (dx === 0 && dy === 0) {
          particles[j].fx += Math.random() * 0.1
          particles[j].fy += Math.random() * 0.1
          continue
        }
        const distanceSquared = dx ** 2 + dy ** 2
        const distance = Math.sqrt(distanceSquared)
        const force = this.K_r / distanceSquared
        const fx = (dx * force) / distance
        const fy = (dy * force) / distance

        particles[i].fx -= fx
        particles[i].fy -= fy
        particles[j].fx += fx
        particles[j].fy += fy
      }
    }

    // centering force
    particles.forEach((particle) => {
      const { x, y } = particle
      const dx = x - this.center.x
      const dy = y - this.center.y

      const distanceSquared = dx ** 2 + dy ** 2
      const distance = Math.sqrt(distanceSquared)
      const force = this.centeringForce
      const fx = dx * force * distance
      const fy = dy * force * distance

      particle.fx -= fx
      particle.fy -= fy
    })
  }

  updatePositions(particles) {
    particles.forEach((particle) => {
      let dx = this.delta_t * particle.fx
      let dy = this.delta_t * particle.fy
      const displacementSquared = dx ** 2 + dy ** 2
      if (displacementSquared > this.max_displacement_squared) {
        const scale = Math.sqrt(
          this.max_displacement_squared / displacementSquared
        )
        dx *= scale
        dy *= scale
      }
      particle.x += dx
      particle.y += dy
    })

    this.timeSpent += 1
    this.delta_t = Math.max(
      (1 - this.timeSpent / this.timeBudget) * this.delta_t_init * 1000,
      this.delta_t_init
    )
  }
}

export class NetworkDrawingStrategy {
  drawNode(particle, ctx) {
    const { x, y, node } = particle
    // draw node
    const img = new Image()
    img.src = node.icon
    ctx.drawImage(img, x - 12, y - 12, 24, 24)
  }

  drawLink(link, particles, ctx) {
    const { source, target, strength } = link

    const { x: x1, y: y1 } = particles[source]
    const { x: x2, y: y2 } = particles[target]

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = `rgba(255, 255, 255, ${strength * 0.5})`
    ctx.lineWidth = strength * 4
    ctx.stroke()
    ctx.closePath()
  }
}
