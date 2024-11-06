export class InteractiveBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private particleCount: number = 100;
  private particleDensity: number = 0.0001; // particles per pixel
  private maxDistance: number;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.maxDistance = Math.min(canvas.width, canvas.height) * 0.2; // 20% of the smaller dimension
    this.init();
  }

  private init() {
    this.updateCanvasSize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private updateCanvasSize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.maxDistance = Math.min(this.canvas.width, this.canvas.height) * 0.2; // 20% of the smaller dimension
    this.particleCount = Math.floor(this.canvas.width * this.canvas.height * this.particleDensity);
    this.particles = [];
    this.createParticles();
  }

  private createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  private onResize() {
    this.updateCanvasSize();
  }

  private onMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = event.clientX - rect.left;
    this.mousePos.y = event.clientY - rect.top;

    console.table(this.mousePos);
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
    this.particles.forEach(particle => particle.draw(this.ctx));
  }

  private drawLinks() {
    const allParticles = [...this.particles, this.mousePos];

    allParticles.forEach(particle => {
      allParticles.forEach(otherParticle => {
        const dist = this.getDistance(particle, otherParticle);
        if (dist < this.maxDistance) {
          const opacity = 1 - dist / this.maxDistance;
          this.ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });
  }

  private getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
}

class Particle {
  public x: number;
  public y: number;
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
