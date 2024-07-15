import { useEffect, useRef } from "react"
import "./ParallaxCity.css"
import Sun from "../assets/Sun"
import Moon from "../assets/Moon"
import AnimationController from "../utils/AnimationController"
import ScrollProgress from "../utils/ScrollProgress"
import Building from "../components/Building"

const ParallaxCity = () => {
  const scrollView = useRef(null)

  useEffect(() => {
    const scrollProgress = new ScrollProgress(scrollView.current, 0, 0.4)

    const cityAnimation = new AnimationController(
      updateCity,
      scrollProgress,
      scrollView.current
    )

    return () => {
      cityAnimation.destroy()
    }
  }, [scrollView])

  return (
    <>
      <div className="parallax-view " ref={scrollView}>
        <div className="parallax-layer sky">
          <Sun />
          <Moon />
        </div>

        {buildings.map((layer, i) => (
          <div className="parallax-layer city" key={`layer-${i}`}>
            {layer.map((building, j) => (
              <Building
                style={{
                  left: building.position,
                  height: building.height,
                  width: building.width,
                }}
                layer={i}
                key={`building-${i}-${j}`}
              />
            ))}
          </div>
        ))}
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

function generateBuildings(numBuildingRows) {
  const buildings = []

  const maxBuildingWidth = 72
  const rowBuildingWidthChange = Math.floor(maxBuildingWidth * 0.15)

  const maxBuildingHeight = window.innerHeight * 0.6
  const minBuildingHeight = maxBuildingHeight * 0.01
  const rowBuildingHeightChange = Math.floor(
    (maxBuildingHeight - minBuildingHeight) / numBuildingRows
  )

  let buildingHeight = maxBuildingHeight
  let buildingWidth =
    maxBuildingWidth - numBuildingRows * rowBuildingWidthChange

  for (let i = 0; i < numBuildingRows; i++) {
    const buildingRow = []

    const gapBetweenBuildings = Math.floor(buildingWidth * 0.1)
    const xPositionStep = buildingWidth + gapBetweenBuildings

    const amplitude = rowBuildingHeightChange * 0.6
    const frequency = (i * 0.064 + 0.14) * Math.PI
    const offset = 0.1 * i * Math.PI

    const numBuildings = Math.ceil(window.innerWidth / xPositionStep) + 1

    let position = -xPositionStep * 0.5
    for (let i = 0; i < numBuildings; i++) {
      const height =
        buildingHeight + amplitude * Math.sin(frequency * position + offset)

      const building = {
        height: Math.ceil(height),
        position,
        width: buildingWidth,
      }
      buildingRow.push(building)

      position += xPositionStep
    }
    buildings.push(buildingRow)

    buildingHeight -= rowBuildingHeightChange
    buildingWidth += rowBuildingWidthChange
  }
  console.log(buildings)
  return buildings
}

export default ParallaxCity
