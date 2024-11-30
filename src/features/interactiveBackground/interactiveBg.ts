type Point2D = { x: number; y: number }

export class InteractiveBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mousePos: Point2D = { x: 0, y: 0 };
  private particleCount: number = 1;
  private particleDensity: number = 0.00009;
  private maxDistance: number = Infinity;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, private scale: number = 1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.init();
  }

  private init() {
    this.updateCanvasSize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private updateCanvasSize() {
    this.canvas.width = this.canvas.clientWidth * this.scale;
    this.canvas.height = this.canvas.clientHeight * this.scale;
    this.maxDistance = Math.min(0.5 * this.canvas.width, 0.080 * this.canvas.height) / this.scale; // % of the diagonal
  }

  private createParticles() {
    this.particleCount = Math.floor(this.canvas.width * this.canvas.height * this.particleDensity);
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  private bindEvents() {
    this.canvas.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  private onResize() {
    console.log('resized');
    
    this.updateCanvasSize();
    this.createParticles();
  }

  private onMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = (event.clientX - rect.left) * this.scale;
    this.mousePos.y = (event.clientY - rect.top) * this.scale;
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawParticles();
    this.drawLinks();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  public start() {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private updateParticles() {
    this.particles.forEach(particle => particle.update(this.canvas.width, this.canvas.height));
  }

  private drawParticles() {
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
    });
  }

  private drawLinks() {
    const allParticles = [...this.particles];
    allParticles.forEach(particle => particle.isHighlighted = false)

    // highlight particles linked to the cursor
    for (let j = 0; j < allParticles.length; j++) {
      const otherParticle = allParticles[j];

      const distanceBetweenParticles = this.getDistance(this.mousePos, otherParticle);
      if (distanceBetweenParticles > this.maxDistance) continue

      otherParticle.isHighlighted = true
      const opacity = 1;
      const hue = (Math.atan2(otherParticle.y - this.mousePos.y, otherParticle.x - this.mousePos.x) * 180 / Math.PI) % 360;
      this.ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`; // Color based on position around cursor

      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
      this.ctx.lineTo(otherParticle.x, otherParticle.y);
      this.ctx.stroke();
    }

    // Draw links between close particles
    for (let i = 0; i < allParticles.length - 1; i++) {
      const particle = allParticles[i];
      for (let j = i + 1; j < allParticles.length; j++) {
        const otherParticle = allParticles[j];

        const distanceBetweenParticles = this.getDistance(particle, otherParticle);
        if (distanceBetweenParticles > this.maxDistance) continue

        if (particle.isHighlighted || otherParticle.isHighlighted) {
          particle.isHighlighted = true
          otherParticle.isHighlighted = true
        }
        const hue = (Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x) * 180 / Math.PI) % 360;
        const opacity = 1 - distanceBetweenParticles / this.maxDistance;
        this.ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`; // Color based on position around cursor
        this.ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.stroke();
      }
    }

    // draw highlighted links
    const highlightedParticles = allParticles.filter(p => p.isHighlighted)

    for (let i = 0; i < highlightedParticles.length - 1; i++) {
      const particle = highlightedParticles[i];
      for (let j = i + 1; j < highlightedParticles.length; j++) {
        const otherParticle = highlightedParticles[j];

        const distanceBetweenParticles = this.getDistance(particle, otherParticle);
        const opacity = 1 - distanceBetweenParticles / this.maxDistance;
        const hue = (Math.atan2(otherParticle.y - this.mousePos.y, otherParticle.x - this.mousePos.x) * 180 / Math.PI) % 360;
        this.ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`; // Color based on position around cursor

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.stroke();
      }
    }

  }

  private isLinkedToCursor(particle: Point2D): boolean {
    return this.getDistance(particle, this.mousePos) < this.maxDistance;
  }

  private getDistance(p1: Point2D, p2: Point2D): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
}

class Particle {
  public x: number;
  public y: number;
  public isHighlighted: boolean = false;
  private vx: number;
  private vy: number;
  private size: number = 2;


  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  public update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
