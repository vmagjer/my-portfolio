export interface UpdatingStrategy {
  update(particles: Particle[], links: Edge[]): void
}
export interface DrawingStrategy {
  draw(links: Edge[], particles: Particle[], ctx: CanvasRenderingContext2D): void
}

export type Particle = {
  x: number
  y: number
  fx: number
  fy: number
}

export type NodeParticle<TNode> = Particle & { node: TNode }
export type Edge = {
  source: number
  target: number
  strength: number
}
export interface Graph<TNode> {
  nodes: TNode[]
  edges: Edge[]
}

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

    const angleIncrement = (Math.PI * 2) / graph.nodes.length
    this.nodes = graph.nodes.map((node, i) => {
      // arrange in circle around center
      const angle = i * angleIncrement
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

  draw(ctx: CanvasRenderingContext2D) {
    this.drawingStrategy.draw(this.links, this.nodes, ctx)
  }

  reset() {
    this.nodes.forEach((node) => {
      node.x = this.center.x + Math.random() * this.radius - this.radius / 2
      node.y = this.center.y + Math.random() * this.radius - this.radius / 2
    })
  }
}