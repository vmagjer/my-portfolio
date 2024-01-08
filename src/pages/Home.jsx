import React, { useEffect } from "react"
import "./Home.css"
import ParallaxCity from "../components/ParallaxCity"

const HomePage = () => {

  return (
    <>
      <div className="home">
        <ParallaxCity />
        

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
 * Updates city based on the progress percentage.
 *
 * @param {number} animationProgress - The progress percentage.
 */
function updateCity(animationProgress) {
  document.body.style.setProperty("--scroll", animationProgress)

  orbit({
    progressPercent: animationProgress,
    radius: radiusSun,
    offset: offsetSun,
    startAngle: Math.PI / 2,
    selector: ".sun",
  })

  orbit({
    progressPercent: animationProgress,
    radius: radiusMoon,
    offset: offsetMoon,
    startAngle: Math.PI,
    selector: ".moon",
  })
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
function orbit({ progressPercent, radius, offset, startAngle, selector }) {
  const angle = startAngle - (progressPercent * Math.PI) / 2

  const centerX = 0.5 * window.innerWidth
  const centerY = -offset

  const x = centerX + Math.cos(angle) * radius
  const y = centerY + Math.sin(angle) * radius

  const object = document.querySelector(selector)
  object.style.left = `${x}px`
  object.style.bottom = `${y}px`
}

const buildings = generateBuildings(4)

function generateBuildings(numLayers) {
  const result = []

  const max_w = 72
  const step_w = Math.floor(max_w * 0.15)
  const PADDING = 20

  const max_h = window.innerHeight * 0.6
  const min_h = max_h * 0.01
  const step_h = Math.floor((max_h - min_h) / numLayers)

  let h = max_h
  let w = max_w - numLayers * step_w
  for (let i = 0; i < numLayers; i++) {
    const layer = []

    const gap_x = Math.floor(w * 0.1)
    const step_x = w + gap_x + PADDING

    const amplitude = step_h * 0.6
    const frequency = (i * 0.064 + 0.14) * Math.PI
    const offset = 0.1 * i * Math.PI

    const numBuildings = Math.ceil(window.innerWidth / step_x) + 1

    let position = -step_x * 0.5
    for (let i = 0; i < numBuildings; i++) {
      const height = h + amplitude * Math.sin(frequency * position + offset)

      layer.push({
        height: Math.ceil(height),
        position,
        width: w,
      })

      position += step_x
    }
    result.push(layer)

    h -= step_h
    w += step_w
  }
  console.log(result)
  return result
}

export default HomePage
