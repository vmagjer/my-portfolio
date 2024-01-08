class ScrollProgress {
  constructor(
    element = document.querySelector("body"),
    progressStart = 0,
    progressEnd = 1
  ) {
    this.progressStart = progressStart
    this.progressEnd = progressEnd

    this.element = element

    this.getScrollProgress = this.getProgress.bind(this)
  }

  getProgress() {
    const { height, y: clientY } = this.element.getBoundingClientRect()
    const pageY = window.scrollY + clientY
    

    const a = pageY + height * this.progressStart
    const b = pageY + height * this.progressEnd

    const alpha = 1/(b - a)
    const beta = alpha * -a

    const progress = alpha * window.scrollY + beta

    return clamp(progress, 0, 1)
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default ScrollProgress
