export class NodeLinkDiagramRenderer<TNode> {
  isPlaying = true
  center: { x: number; y: number }
  radius: number
  nodes: NodeParticle<TNode>[]
  links: Edge[]
  updatingStrategy: UpdatingStrategy
  drawingStrategy: DrawingStrategy

  constructor(graph: Graph<TNode>, updatingStrategy: UpdatingStrategy, drawingStrategy: DrawingStrategy, ctx: CanvasRenderingContext2D) {
    this.center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 }
    this.radius = Math.min(ctx.canvas.width, ctx.canvas.height) / 4

    this.nodes = graph.nodes.map((node, i) => {
      // arrange in circle around center
      const angle = (i / graph.nodes.length) * Math.PI * 2
      return {
        node,
        x: this.center.x + Math.cos(angle) * this.radius,
        y: this.center.y + Math.sin(angle) * this.radius,
        fx: 0,
        fy: 0,
      }
    })

    this.links = graph.edges

    this.updatingStrategy = updatingStrategy
    this.drawingStrategy = drawingStrategy
  }

  update() {
    if (!this.isPlaying) return
    this.updatingStrategy.update(this.nodes, this.links)
  }

  draw(ctx : CanvasRenderingContext2D) {
    this.drawingStrategy.draw(this.links, this.nodes, ctx)
  }

  reset() {
    this.nodes.forEach((node) => {
      node.x = this.center.x + Math.random() * this.radius - this.radius / 2
      node.y = this.center.y + Math.random() * this.radius - this.radius / 2
    })
  }
}

interface UpdatingStrategy {
  update(particles: Particle[], links: Edge[]): void
}

/**
 * Represents a graph topology strategy for node network visualization.
 * https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6297585
 */
export class GraphTopologyStrategy implements UpdatingStrategy {
  L: number
  K_r: number
  R: number
  K_s: number
  delta_t: number
  max_displacement_squared: number
  centeringForce: number
  center: { x: number; y: number }
  iterations: number
  min_delta_t: number

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
  }:{
    L: number
    K_r: number
    R: number
    delta_t: number
    max_displacement_squared: number
    center: { x: number; y: number }
    centeringForce?: number  
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

  update(particles: Particle[], links: Edge[]) {
    this.updateForces(particles, links)
    this.updatePositions(particles)
    if (this.iterations > 0) {
      this.iterations--
      this.delta_t = Math.max(this.delta_t * 0.99, this.min_delta_t)
    }
  }

  updateForces(particles: Particle[], links: Edge[]) {
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

  updatePositions(particles: Particle[]) {
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

interface DrawingStrategy {
  draw(links: Edge[], particles: Particle[], ctx: CanvasRenderingContext2D): void
}

type Particle = {
  x: number
  y: number
  fx: number
  fy: number
}

type NodeParticle<TNode>  = Particle & { node: TNode }
type NodeWithIcon = { icon: string }
export class NetworkDrawingStrategy implements DrawingStrategy {
  draw(links: Edge[], particles: NodeParticle<NodeWithIcon>[], ctx: CanvasRenderingContext2D) {
    links.forEach((link) => {
      this.drawLink(link, particles, ctx)
    })
    particles.forEach((particle) => {
      this.drawNode(particle, ctx)
    })
  }

  drawNode(particle: NodeParticle<NodeWithIcon>, ctx: CanvasRenderingContext2D) {
    const { x, y, node } = particle
    // draw node
    const img = new Image()
    img.src = node.icon
    ctx.drawImage(img, x - 12, y - 12, 24, 24)
  }

  drawLink(link: Edge, particles: NodeParticle<NodeWithIcon>[], ctx: CanvasRenderingContext2D) {
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

interface Graph<TNode> {
  nodes: TNode[]
  edges: Edge[]
}

type Edge = {
  source: number
  target: number
  strength: number
}
type NodeComparator<TNode> = (a: TNode, b: TNode) => number

export class UndirectedGraph<TNode> implements Graph<TNode> {
  private _nodes: (TNode & { neighbors: number[]; position: number })[]
  private _edges: Edge[]
  private _adjacencyMatrix: number[][]
  private _orderedNodes: { index: number; average: number }[]

  constructor(nodes: TNode[], adjacencyFunction: NodeComparator<TNode>) {    
    this._adjacencyMatrix = []
    for (let i = 0; i < nodes.length; i++) {
      const row: number[] = []
      for (let j = 0 ; j < nodes.length; j++) {
        // diagonal is 0 - no self loops
        if (i===j) row.push(0)
        // upper triangle is mirrored in lower triangle        
        if (i>j) row.push(this._adjacencyMatrix[j][i])          
        row.push(adjacencyFunction(nodes[i], nodes[j]))
      }
      this._adjacencyMatrix.push(row)
    }

    this._edges = []
    const maxAdjacency = Math.max(...this._adjacencyMatrix.flat())
    // map edges and their strength, normalize strength to [0, 1]
    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (this._adjacencyMatrix[i][j] === 0) continue
        this._edges.push({ source: i, target: j, strength: this._adjacencyMatrix[i][j] / maxAdjacency })
      }
    }

    // use barycentric heuristic to order nodes
    this._nodes = nodes.map((node, i) => ({
      ...node,
      neighbors : this._edges
        .filter((edge) => edge.source === i || edge.target === i)
        .map((edge) => (edge.source === i ? edge.target : edge.source)),
      position : i
    }))

    this._orderedNodes = this._nodes.map((node, i) => ({
      index: i,
      average: 0,
    }))

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

  positionOfNode(i: number) {
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