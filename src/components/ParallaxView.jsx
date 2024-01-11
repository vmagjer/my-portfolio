import React, { useEffect, useRef, useState } from "react"
import "./ParallaxView.css"
import AnimationController from "../utils/AnimationController"
import ScrollProgress from "../utils/ScrollProgress"
import Table from "../assets/Table"

const ParallaxView = () => {
  const scrollView = useRef(null)

  useEffect(() => {
    // const scrollView = document.querySelector(".parallax-view")
    const scrollProgress = new ScrollProgress(scrollView.current)

    const cityAnimation = new AnimationController(
      updateView,
      scrollProgress,
      scrollView.current
    )

    return () => {
      cityAnimation.destroy()
    }
  }, [scrollView])

  const matrixShower = useRef(null)

  const [counter, setCounter] = useState(0)
  const [columnCounts, setColumnCounts] = useState([])

  useEffect(() => {
    const canvas = matrixShower.current

    if (!canvas) return

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.transform(-1, 0, 0, 1, canvas.width, 0)

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    const colSize = 20
    const rowSize = 20

    const cols = Math.floor(width / colSize)
    const rows = Math.floor(height / rowSize)

    setColumnCounts(
      new Array(cols).fill(0).map(() => -Math.floor(Math.random() * rows))
    )
    const startingColumns = new Array(cols)
      .fill(0)
      .map((x) => -Math.floor(Math.random() * rows))

    const chars =
      "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const promptText = "SCROLL DOWN"
    const promptTextStart = Math.floor((cols - promptText.length) / 2)
    const promptTextEnd = promptTextStart + promptText.length
    const promptTextRow = Math.floor(rows / 2)

    const draw = () => {
      ctx.fillStyle = `rgba(0, 8, 0, 0.05)` // this fades the text
      ctx.fillRect(0, 0, width, height)

      ctx.font = "15pt monospace"

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // useffect snapshots the state so I must write  logic within the set function. Can i avoid it somehow? I only need the useffect to create the interval.
      setColumnCounts((currentColumnCounts) => {
        const newColumnCounts = [...currentColumnCounts]

        for (let i = 0; i < cols; i++) {
          const count = newColumnCounts[i]

          if (count > rows) {
            newColumnCounts[i] = -Math.floor(Math.random() * rows)
            continue
          }

          const y = count * rowSize
          const x = colSize / 2 + colSize * i


          if (
            count == promptTextRow &&
            i >= promptTextStart &&
            i < promptTextEnd
          ) {
            ctx.fillStyle = "#fff"
            ctx.fillText(promptText[i - promptTextStart], x, y)
            continue
          }

          const randomChar = chars[Math.floor(Math.random() * chars.length)]

          // Flip text. Idk why but scaling the context beforehand didn't work for me
          ctx.save()
          ctx.translate(x, y)
          ctx.scale(-1, 1)

          ctx.fillStyle = "#494"
          ctx.fillText(randomChar, 0, 0)

          ctx.restore()
        }

        return newColumnCounts.map((c) => c + 1)
      })
    }

    const interval = setInterval(() => {
      requestAnimationFrame(draw)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="view" ref={scrollView}>
        <canvas ref={matrixShower} className="matrix-shower"></canvas>

        <div className="person" />
        <Table className="table" />
        {/* an image of a person acting as mask */}

        {/* an image of mountains and a sky with clouds */}
        {/* <div className="sky" /> */}
        {/* hills */}
        <div className="hills" />
        {/* hills */}
        <div className="hills" />
        {/* field with silhouette of traveller  */}
        <div className="field" />
      </div>
    </>
  )
}

function updateView(animationProgress) {
  // enlarge
}

export default ParallaxView
