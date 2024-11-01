class AnimationController {
  constructor(
    draw,
    progressController,
    element = document.querySelector("body")
  ) {
    this.draw = draw
    this.progressController = progressController
    this.update = this.update.bind(this)
    this.enabled = false
    this.element = element
    this.init()
  }

  start() {
    this.enabled = true
    requestAnimationFrame(this.update)
  }

  stop() {
    this.enabled = false
    cancelAnimationFrame(this.update)
  }

  update() {
    if (!this.enabled) {
      return
    }
    this.draw(this.progressController.getProgress())
    requestAnimationFrame(this.update)
  }

  /**
   * An interesection observer triggers the animation when the element is \visible and
   * stops it when it's not.
   */
  init() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.start()
      } else {
        this.stop()
      }
    })

    this.observer.observe(this.element)
  }

  /**
   * Destroys the intersection observer.
   */
  destroy() {
    this.observer.unobserve(this.element)
  }
}

export default AnimationController
