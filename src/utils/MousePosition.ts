class MousePosition {
  static #instance: MousePosition | null = null
  x: number
  y: number

  constructor() {
    if (MousePosition.#instance !== null) {
      throw new Error('Cannot instantiate MousePosition more than once')
    }
    this.x = 0
    this.y = 0

    this.#init()
  }

  getInstance() {
    if (!MousePosition.#instance) {
      MousePosition.#instance = new MousePosition()
    }

    return MousePosition.#instance
  }

  #update = (event:MouseEvent) => {
    this.x = event.clientX
    this.y = event.clientY
  }

  #init = () => {
    window.addEventListener('mousemove', this.#update)
  }

  destroy = () => {
    window.removeEventListener('mousemove', this.#update)
  }
}

export default MousePosition
