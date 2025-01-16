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
    this.maxDistance = Math.min(0.5 * this.canvas.width, 0.080 * this.canvas.height) / this.scale;
  }

  private createParticles() {
    this.particleCount = Math.floor(this.canvas.width * this.canvas.height * this.particleDensity);
    this.particles = Array.from({ length: this.particleCount }, () => new Particle(this.canvas.width, this.canvas.height));
  }

  private bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onResize() {
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
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
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
    const allParticles = [...this.particles];
    allParticles.forEach(particle => particle.isHighlighted = false);

    this.highlightCursorLinks(allParticles);
    this.drawParticleLinks(allParticles);
    this.drawHighlightedLinks(allParticles.filter(p => p.isHighlighted));
  }

  private highlightCursorLinks(particles: Particle[]) {
    particles.forEach(particle => {
      const distance = this.getDistance(this.mousePos, particle);
      if (distance <= this.maxDistance) {
        particle.isHighlighted = true;
        this.drawLink(this.mousePos, particle, 1, this.getHue(this.mousePos, particle));
      }
    });
  }

  private drawParticleLinks(particles: Particle[]) {
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = this.getDistance(particles[i], particles[j]);
        if (distance <= this.maxDistance) {
          const opacity = 1 - distance / this.maxDistance;
          this.drawLink(particles[i], particles[j], opacity, 50);
        }
      }
    }
  }

  private drawHighlightedLinks(particles: Particle[]) {
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = this.getDistance(particles[i], particles[j]);
        const opacity = 1 - distance / this.maxDistance;
        this.drawLink(particles[i], particles[j], opacity, this.getHue(this.mousePos, particles[j]));
      }
    }
  }

  private drawLink(p1: Point2D, p2: Point2D, opacity: number, hue: number) {
    this.ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  private getHue(p1: Point2D, p2: Point2D): number {
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI) % 360;
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
