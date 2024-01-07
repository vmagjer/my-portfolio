/**
 * Represents a scroll animation utility.
 */
class ScrollAnimation {
  /**
   * @callback DoStuffWithScrollProgress
   * @param {number} scrollProgress - The scroll progress of the element. A number between 0 and 1.
   */
  /**
   * Creates a new ScrollAnimation instance.
   * @param {HTMLElement} element - The element to apply the scroll animation to.
   * @param {DoStuffWithScrollProgress} callback - The callback function to be called when the scroll progress is updated.
   */
  constructor(element, callback) {
    this.element = element
    this.callback = callback

    this.isVisible = false
    this.scrollProgress = 0
    this.prevScroll = -99999
    this.update = this.update.bind(this)
    this.elementHeight = this.element.getBoundingClientRect().height

    this.init()
  }

  /**
   * An interesection observer triggers the scroll animation when the element is visible.
   */
  init() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isVisible = true
        console.log("yes visible")
        window.requestAnimationFrame(this.update)
      } else {
        this.isVisible = false

        console.log("not visible")
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

  /**
   * Updates the scroll progress and triggers the callback function.
   */
  update() {
    const { top, height } = this.element.getBoundingClientRect()
    const scroll = window.scrollY

    // this.isVisible = scroll >= elementTop && scroll <= elementBottom

    if (this.isVisible) {
      if (this.prevScroll === scroll) {
        return
      }
      console.log("draw visible")

      this.scrollProgress = (scroll - top) / height

      this.callback(this.scrollProgress)

      window.requestAnimationFrame(this.update)
    } else if (scroll < top) {
      this.scrollProgress = 0
    } else {
      this.scrollProgress = 1
    }
  }
}

export default ScrollAnimation
