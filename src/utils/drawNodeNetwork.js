export class NodeLinkDiagramRenderer {
  isPlaying = true
  constructor(graph, updatingStrategy, drawingStrategy, ctx) {
    this.center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 }
    this.radius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2 

    this.nodes = graph.nodes.map((node, i) => {
      // arrange in circle around center
      const angle = (i / graph.nodes.length) * Math.PI * 2
      return ({
        node,
        x: this.center.x + Math.cos(angle) * this.radius,
        y: this.center.y + Math.sin(angle) * this.radius,
        fx: 0,
        fy: 0,
      })
  })

    this.links = graph.edges

    this.updatingStrategy = updatingStrategy
    this.drawingStrategy = drawingStrategy
  }

  update() {
    if (!this.isPlaying) return
    this.updatingStrategy.update(this.nodes, this.links)
  }

  draw(ctx) {
    this.links.forEach((link) => {
      this.drawingStrategy.drawLink(link, this.nodes, ctx)
    })
    this.nodes.forEach((node) => {
      this.drawingStrategy.drawNode(node, ctx)
    })
  }

  reset() {
    this.nodes.forEach((node) => {
      node.x = this.center.x + Math.random() * this.radius - this.radius / 2
      node.y = this.center.y + Math.random() * this.radius - this.radius / 2
    })
  }
}

/**
 * Represents a graph topology strategy for node network visualization.
 * https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6297585
 */
export class GraphTopologyStrategy {

  /**
   * Constructs a new GraphTopologyStrategy.
   * @param {Object} options - The options for the graph topology strategy.
   * @param {number} options.L - The spring rest length.
   * @param {number} options.K_r - The repulsion constant.
   * @param {number} options.R -  Dimensionless parameter to control the final shape of the layout.
   * @param {number} options.delta_t - The time step size per iteration.
   * @param {number} options.max_displacement_squared - The maximum displacement squared.
   * @param {Object} options.center - The center coordinates of the network.
   * @param {number} [options.centeringForce=0.0001] - The centering force.
   */
  constructor({
    L,
    K_r,
    R,
    delta_t,
    max_displacement_squared,
    center,
    centeringForce = 0.0001,
  }) {
    this.L = L
    this.K_r = K_r
    this.R = R
    this.K_s = K_r / (R * L ** 3) // spring constant
    this.delta_t = delta_t * 1000
    this.max_displacement_squared = max_displacement_squared
    this.centeringForce = centeringForce
    this.center = center
    
    this.iterations = 1000
    this.min_delta_t = delta_t
  }

  update(particles, links) {
    this.updateForces(particles, links)
    this.updatePositions(particles)
    if (this.iterations > 0) {
      this.iteration--
      this.delta_t = Math.max(this.delta_t * 0.99, this.min_delta_t)
    } 
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

export class UndirectedGraph {
  constructor(nodes, adjacencyFunction) {
    this._nodes = nodes
    this.adjacencyMatrix = this._nodes.map((node1) =>
      this._nodes.map((node2) => adjacencyFunction(node1, node2))
    )

    this._edges = []
    const maxAdjacency = Math.max(...this.adjacencyMatrix.flat())
    this.adjacencyMatrix.forEach((row, i) =>
      this._edges.push(
        ...row.map((adjacency, j) => {
          if (i >= j) return null
          if (adjacency === 0) return null
          return { source: i, target: j, strength: adjacency / maxAdjacency }
        })
      )
    )
    this._edges = this._edges.filter((edge) => edge !== null)

    // use barycentric heuristic to order nodes
    this._nodes.forEach((node, i) => {
      node.neighbors = this._edges
        .filter((edge) => edge.source === i || edge.target === i)
        .map((edge) => (edge.source === i ? edge.target : edge.source))
      node.position = i
    })

    this._orderedNodes = this._nodes.map((node, i) => ({ index: i, average: 0 }))

    this._nodes.forEach((node1, i) => {
      const p1 = this.positionOfNode(i)
      let sum = p1
      node1.neighbors.forEach((j) => {
        const p2 = this.positionOfNode(j)
        sum += p2
      })

      this._orderedNodes[p1].average = sum / (node1.neighbors.length + 1)
    })

    this._orderedNodes.sort((a, b) => a.average - b.average)
  }

  get nodes() {
    return this._orderedNodes.map((node) => this._nodes[node.index])
  }

  get edges() {
    return this._edges.map(({ source, target, strength }) => ({
      source: this.positionOfNode(source),
      target: this.positionOfNode(target),
      strength,
    }))
  }

  positionOfNode(i) {
    if (this._orderedNodes[this._nodes[i].position].index != i) {
      // invalid position
      // update ALL cached positions
      for (let p = 0; p < this._orderedNodes.length; p++) {
        this._nodes[this._orderedNodes[p].index].position = p
      }
    }
    return this._nodes[i].position
  }
}
