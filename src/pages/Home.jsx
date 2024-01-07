import React, { useEffect } from "react"
import "./Home.css"
import Sun from "../assets/Sun"
import AnimationController from "../utils/AnimationController"
import ScrollProgress from "../utils/ScrollProgress"
/**
 * Represents a building component.
 *
 * @component
 * @param {Object} style - The style object for the building component.
 * @returns {JSX.Element} The building component.
 */
const Building = ({ style }) => {
  /**
   * The number of windows in the building.
   * @constant {number}
   */
  const NUM_WINDOWS = 30

  /**
   * Generates an array of window elements.
   *
   * @returns {JSX.Element[]} An array of window elements.
   */
  const generateWindows = () => {
    return new Array(NUM_WINDOWS).fill(0, 0, NUM_WINDOWS).map((_, i) => (
      <div className="window" key={i}>
        {" "}
        .
      </div>
    ))
  }

  return (
    <div className="building" style={style}>
      {/* {generateWindows()} */}
      <div className="text">Scroll down</div>
    </div>
  )
}

/**
 * Listens to the scroll event and updates the scroll property of the body style.
 */
function scrollListener() {
  var target = document.querySelector(".parallax-view")
  var elementStart = target.offsetTop
  var elementHeight = target.offsetHeight
  var elementEnd = elementStart + elementHeight
  var scroll = window.scrollY
  if (scroll < elementStart) {
    document.body.style.setProperty("--scroll", 0)
    return
  } else if (scroll > elementEnd) {
    document.body.style.setProperty("--scroll", 1)
    return
  }
  var scrollPercent = (scroll - elementStart) / elementHeight
  document.body.style.setProperty("--scroll", scrollPercent)
}

/**
 * Represents the Moon component.
 *
 * @returns {JSX.Element} The Moon component.
 */
function Moon() {
  return (
    <svg className="moon">
      <defs>
        <mask id="crescentClip">
          <circle cx="50%" cy="50%" r="50%" fill="#fff" />
          <circle cx="80%" cy="32%" r="50%" fill="#000" />
        </mask>
      </defs>
      <circle cx="50%" cy="50%" r="50%" fill="#fff" mask="url(#crescentClip)" />
    </svg>
  )
}

/**
 * Represents the Home page component.
 *
 * @returns {JSX.Element} The Home page component.
 */
const HomePage = () => {
  useEffect(() => {
    const scrollView = document.querySelector(".parallax-view")
    const scrollProgress = new ScrollProgress(scrollView, 0, 0.4)

    const celestialAnimation = new AnimationController(
      moveCelestialObjects,
      scrollProgress,
      scrollView
    )

    return () => {
      celestialAnimation.destroy()
    }
  }, [])

  /**
   * Moves the celestial objects based on the scroll percentage.
   *
   * @param {number} scrollPercent - The scroll percentage.
   */
  function moveCelestialObjects(scrollPercent) {
    document.body.style.setProperty("--scroll", scrollPercent)

    moveCelestialObject({
      progressPercent: scrollPercent,
      radius: radiusSun,
      offset: offsetSun,
      startAngle: Math.PI / 2,
      selector: ".sun",
    })

    moveCelestialObject({
      progressPercent: scrollPercent,
      radius: radiusMoon,
      offset: offsetMoon,
      startAngle: Math.PI,
      selector: ".moon",
    })
  }

  const { radius: radiusSun, offset: offsetSun } = calculateOrbitConstants(
    window.innerWidth,
    0.5 * window.innerHeight,
    0.7 * window.innerHeight
  )

  const { radius: radiusMoon, offset: offsetMoon } = calculateOrbitConstants(
    window.innerWidth,
    0.2 * window.innerHeight,
    0.4 * window.innerHeight
  )

  /**
   * Calculate radius and offset required for an orbit
   *
   * @param {number} viewWidth - The width of the view
   * @param {number} minHeight - The minimum height of the orbit
   * @param {number} maxHeight - The maximum height of the orbit
   */
  function calculateOrbitConstants(viewWidth, minHeight, maxHeight) {
    // this is a bit of a hack to make sure the orbit is adequately sized for the view
    // doesnt respect the min height
    const radius = Math.max(maxHeight, viewWidth / 2) * 1.5
    const offset = radius - maxHeight
    return { radius, offset }
  }

  /**
   * Moves a celestial object based on the scroll percentage.
   *
   * @param {number} scrollPercent - The scroll percentage.
   * @param {number} radius - The radius of the orbit.
   * @param {number} offset - The offset of the orbit.
   * @param {number} startAngle - The starting angle of the orbit.
   * @param {number} speed - The speed of the orbit.
   * @param {string} selector - The selector for the celestial object.
   */
  function moveCelestialObject({
    progressPercent,
    radius,
    offset,
    startAngle,
    selector,
  }) {
    const angle = startAngle - (progressPercent * Math.PI) / 2

    const centerX = 0.5 * window.innerWidth
    const centerY = -offset

    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    const object = document.querySelector(selector)
    object.style.left = `${x}px`
    object.style.bottom = `${y}px`
  }

  const buildings = defineBuildings()

  /**
   * Defines the buildings for the cityscape.
   *
   * @returns {Object} The buildings object containing arrays of buildings.
   */
  function defineBuildings() {
    let buildingWidth = 72
    const viewWidth = window.innerWidth
    let gap = 6
    const MIN_VIEW_WIDTH = 200
    const HEIGHT_BASE = 500
    const PADDING = 20

    // Back buildings
    const buildingsBack = []
    let step = buildingWidth + gap + PADDING
    let numBuildings = Math.ceil(viewWidth / step) + 1
    let position = -step * 0.5
    let minHeight = HEIGHT_BASE * 0.7
    let maxHeight = HEIGHT_BASE
    for (let i = 0; i < numBuildings; i++) {
      const amplitude = maxHeight - minHeight
      const x = position / MIN_VIEW_WIDTH
      const frequency = 1 * Math.PI
      const offset = 0.1 * Math.PI
      const height = Math.ceil(
        minHeight + amplitude * Math.sin(frequency * x + offset)
      )
      buildingsBack.push({ height, position, width: buildingWidth })

      position += step
    }

    // Mid buildings
    const buildingsMid = []
    // numBuildings -= 1
    buildingWidth += 4
    gap += 4
    position = 0
    step = buildingWidth + gap + PADDING
    minHeight = HEIGHT_BASE * 0.4
    maxHeight = HEIGHT_BASE * 0.7
    for (let i = 0; i < numBuildings; i++) {
      const amplitude = maxHeight - minHeight
      const x = position / MIN_VIEW_WIDTH
      const frequency = 1 * Math.PI
      const offset = 0.0 * Math.PI
      const height = Math.ceil(
        minHeight + amplitude * Math.sin(frequency * x + offset)
      )
      buildingsMid.push({ height, position, width: buildingWidth })

      position += step
    }

    // Front buildings
    const buildingsFront = []
    buildingWidth += 4
    gap += 4
    position = 0
    step = buildingWidth + gap + PADDING
    minHeight = HEIGHT_BASE * 0.1
    maxHeight = HEIGHT_BASE * 0.3
    for (let i = 0; i < numBuildings; i++) {
      const amplitude = maxHeight - minHeight
      const x = position / MIN_VIEW_WIDTH
      const frequency = 1 * Math.PI
      const offset = 0.3 * Math.PI
      const height = Math.ceil(
        minHeight + amplitude * Math.sin(frequency * x + offset)
      )
      buildingsFront.push({ height, position, width: buildingWidth })

      position += step
    }

    return {
      buildingsFront: buildingsFront,
      buildingsMid: buildingsMid,
      buildingsBack: buildingsBack,
    }
  }

  return (
    <>
      <div className="home">
        <div className="parallax-view ">
          <div className="parallax-layer sky">
            <Sun />
            <Moon />
          </div>

          <div className="parallax-layer city">
            {buildings.buildingsBack.map((building, i) => (
              <Building
                style={{
                  left: building.position,
                  height: building.height,
                  width: building.width,
                }}
                key={`building-back-${i}`}
              />
            ))}
          </div>

          <div className="parallax-layer city">
            {buildings.buildingsMid.map((building, i) => (
              <Building
                style={{
                  left: building.position,
                  height: building.height,
                  width: building.width,
                }}
                key={`building-mid-${i}`}
              />
            ))}
          </div>

          <div className="parallax-layer city">
            {buildings.buildingsFront.map((building, i) => (
              <Building
                style={{
                  left: building.position,
                  height: building.height,
                  width: building.width,
                }}
                key={`building-front-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
            fuga, distinctio nobis officia perferendis, voluptas animi ipsa
            iusto voluptatibus recusandae tempora voluptatem accusantium nemo
            asperiores ipsum sunt similique! Voluptatibus, perspiciatis
            repellendus mollitia minima tenetur illum enim hic. Voluptas magnam
            suscipit commodi laudantium a, accusamus quos quo aliquid impedit
            modi nam soluta excepturi sunt, fugiat enim sed provident dolores
            natus incidunt? Ex ab, perferendis temporibus, neque doloremque,
            quis deserunt vero quidem maxime totam culpa assumenda fuga officia
            suscipit architecto nam reprehenderit perspiciatis iusto natus
            cumque ipsum illum necessitatibus eos! Architecto pariatur quod ab
            ea, iure dolores odit officiis rem aliquid!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
            fuga, distinctio nobis officia perferendis, voluptas animi ipsa
            iusto voluptatibus recusandae tempora voluptatem accusantium nemo
            asperiores ipsum sunt similique! Voluptatibus, perspiciatis
            repellendus mollitia minima tenetur illum enim hic. Voluptas magnam
            suscipit commodi laudantium a, accusamus quos quo aliquid impedit
            modi nam soluta excepturi sunt, fugiat enim sed provident dolores
            natus incidunt? Ex ab, perferendis temporibus, neque doloremque,
            quis deserunt vero quidem maxime totam culpa assumenda fuga officia
            suscipit architecto nam reprehenderit perspiciatis iusto natus
            cumque ipsum illum necessitatibus eos! Architecto pariatur quod ab
            ea, iure dolores odit officiis rem aliquid!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
            fuga, distinctio nobis officia perferendis, voluptas animi ipsa
            iusto voluptatibus recusandae tempora voluptatem accusantium nemo
            asperiores ipsum sunt similique! Voluptatibus, perspiciatis
            repellendus mollitia minima tenetur illum enim hic. Voluptas magnam
            suscipit commodi laudantium a, accusamus quos quo aliquid impedit
            modi nam soluta excepturi sunt, fugiat enim sed provident dolores
            natus incidunt? Ex ab, perferendis temporibus, neque doloremque,
            quis deserunt vero quidem maxime totam culpa assumenda fuga officia
            suscipit architecto nam reprehenderit perspiciatis iusto natus
            cumque ipsum illum necessitatibus eos! Architecto pariatur quod ab
            ea, iure dolores odit officiis rem aliquid!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
            fuga, distinctio nobis officia perferendis, voluptas animi ipsa
            iusto voluptatibus recusandae tempora voluptatem accusantium nemo
            asperiores ipsum sunt similique! Voluptatibus, perspiciatis
            repellendus mollitia minima tenetur illum enim hic. Voluptas magnam
            suscipit commodi laudantium a, accusamus quos quo aliquid impedit
            modi nam soluta excepturi sunt, fugiat enim sed provident dolores
            natus incidunt? Ex ab, perferendis temporibus, neque doloremque,
            quis deserunt vero quidem maxime totam culpa assumenda fuga officia
            suscipit architecto nam reprehenderit perspiciatis iusto natus
            cumque ipsum illum necessitatibus eos! Architecto pariatur quod ab
            ea, iure dolores odit officiis rem aliquid!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
            fuga, distinctio nobis officia perferendis, voluptas animi ipsa
            iusto voluptatibus recusandae tempora voluptatem accusantium nemo
            asperiores ipsum sunt similique! Voluptatibus, perspiciatis
            repellendus mollitia minima tenetur illum enim hic. Voluptas magnam
            suscipit commodi laudantium a, accusamus quos quo aliquid impedit
            modi nam soluta excepturi sunt, fugiat enim sed provident dolores
            natus incidunt? Ex ab, perferendis temporibus, neque doloremque,
            quis deserunt vero quidem maxime totam culpa assumenda fuga officia
            suscipit architecto nam reprehenderit perspiciatis iusto natus
            cumque ipsum illum necessitatibus eos! Architecto pariatur quod ab
            ea, iure dolores odit officiis rem aliquid!
          </p>
        </div>
      </div>
    </>
  )
}

export default HomePage
