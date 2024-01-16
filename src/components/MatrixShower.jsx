import { useEffect, useRef, useState } from "react"
const TICK = 100
const MIN_LAYER_SCALE = 0.3
const MATRIX_CHARS = '12345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

const COL_SIZE = 20
const ROW_SIZE = 20

const MatrixShower = ({ className, text = "", scale = 1, layers = 1 }) => {
  const canvasRef = useRef(null)

  const [counters, setCounters] = useState([[]])
  const [prevCounters, setPrevCounters] = useState([[]])

  const [randomStrings, setRandomStrings] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    // ascending (lower layers first)
    const layerScales = new Array(layers)
      .fill(0)
      .map(
        (x, i) => MIN_LAYER_SCALE + ((i + 1) * (1 - MIN_LAYER_SCALE)) / layers
      )

    // lower layers will have more columns and rows
    // const cols = new Array(layers)
    //   .fill(0)
    //   .map((x, i) => Math.ceil(width / COL_SIZE / layerScales[i]))
    // const rows = new Array(layers)
    //   .fill(0)
    //   .map((x, i) => Math.ceil(height / ROW_SIZE / layerScales[i]))

    const max_cols = Math.ceil(width / COL_SIZE / MIN_LAYER_SCALE)
    const max_rows = Math.ceil(height / ROW_SIZE / MIN_LAYER_SCALE)

    setCounters(
      new Array(layers)
        .fill(0)
        .map(() => new Array(max_cols).fill(0).map(() => -randomInt(max_rows)))
    )
    setPrevCounters(
      new Array(layers)
        .fill(0)
        .map(() => new Array(max_cols).fill(max_rows * 2))
    )

    setRandomStrings(
      new Array(max_cols)
        .fill("")
        .map(() => generateRandomString(max_rows, MATRIX_CHARS))
    )

    const textLayer = layers - 1
    const textStart = Math.floor(
      (Math.ceil(width / COL_SIZE) - text.length) / 2
    )
    const textEnd = textStart + text.length
    const textRow = Math.floor(Math.ceil(height / ROW_SIZE) / 2)

    const ctx = canvas.getContext("2d")

    function draw(counters, prevCounters, randomStrings) {
      ctx.clearRect(0, 0, width, height)

      for (let layer = 0; layer < layers; layer++) {
        drawLayer({
          cols: Math.ceil(width / COL_SIZE / layerScales[layer]),
          rows: Math.ceil(height / ROW_SIZE / layerScales[layer]),
          scale: layerScales[layer],
          counters: counters[layer],
          prevCounters: prevCounters[layer],
          randomStrings: randomStrings,
          layer,
        })
      }
    }

    function drawLayer({
      cols,
      rows,
      scale,
      counters,
      prevCounters,
      randomStrings,
      layer,
    }) {
      const xStep = Math.ceil(COL_SIZE * scale)
      let x = 0
      for (let col = 0; col < cols; col++) {
        drawColumn({
          col: col,
          rows,
          scale,
          activeRow: counters[col],
          prevActiveRow: prevCounters[col],
          x,
          symbols: randomStrings[((col + layer) * 3) % cols],
          layer,
        })

        x += xStep
      }
    }

    const tailLength = height / ROW_SIZE / 2
    const alphaStep = 1 / tailLength

    function drawColumn({
      col,
      rows,
      scale,
      activeRow,
      prevActiveRow,
      x,
      symbols,
      layer,
    }) {
      const isinTextCols = col >= textStart && col < textEnd
      const layerAlpha = Math.pow((layer + 1) / layers, 2) // lower layers are more transparent

      let alpha = 1 - activeRow * alphaStep

      const tailStart = activeRow - tailLength
      const prevTailStart = prevActiveRow - tailLength

      const yStep = Math.ceil(ROW_SIZE * scale)
      let y = 0
      for (let row = 0; row < rows; row++) {
        if (layer === textLayer && isinTextCols && row === textRow) {
          drawSymbol({
            x,
            y,
            scale,
            symbol: text[col - textStart],
            color: "150, 255, 170",
            alpha: alpha + 0.2, // makes text always visible
            flip: false,
          })
        } else {
          const color = row === activeRow ? "150, 255, 150" : "0, 255, 70"

          drawSymbol({
            x,
            y,
            scale,
            symbol: symbols[row],
            color,
            alpha: alpha * layerAlpha,
            flip: true,
          })
        }

        if (
          (row > tailStart && row < activeRow) ||
          (row > prevTailStart && row < prevActiveRow)
        ) {
          alpha += alphaStep
        } else {
          alpha = 0
        }
        y += yStep
      }
    }

    // text
    ctx.font = "15pt monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    // text glow
    ctx.shadowBlur = 8
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    function drawSymbol({
      x,
      y,
      scale,
      symbol,
      color,
      alpha = 1,
      flip = false,
    }) {
      ctx.fillStyle = `rgba(${color}, ${alpha})`
      ctx.shadowColor = `rgba(${color}, ${alpha})`

      ctx.save()
      ctx.translate(x, y)
      if (flip) ctx.scale(-1, 1)
      ctx.scale(scale, scale)
      ctx.fillText(symbol, 0, 0)

      ctx.restore()
    }

    const interval = setInterval(() => {
      // set functions are used because useEffect snapshots state
      setCounters((currCounters) => {
        setPrevCounters((currPrevCounters) => {
          setRandomStrings((currRandomStrings) => {
            requestAnimationFrame(() =>
              draw(currCounters, currPrevCounters, currRandomStrings)
            )

            // increment counters
            for (let layer = 0; layer < layers; layer++) {
              for (let col = 0; col < max_cols; col++) {
                currCounters[layer][col]++
                currPrevCounters[layer][col]++

                // reset counter if it reaches the end
                if (currCounters[layer][col] * ROW_SIZE >= height) {
                  currPrevCounters[layer][col] = currCounters[layer][col]
                  currCounters[layer][col] = -randomInt(max_rows)
                }
              }
            }

            // randomize a character in each collumn
            for (let i = 0; i < max_cols; i++) {
              const randomIndex = randomInt(max_rows)
              const randomChar = MATRIX_CHARS[randomInt(MATRIX_CHARS.length)]

              currRandomStrings[i] = setCharAt(
                currRandomStrings[i],
                randomIndex,
                randomChar
              )
            }

            return currRandomStrings
          })
          return currPrevCounters
        })
        return currCounters
      })
    }, TICK)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={className} />
    </>
  )
}

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

function setCharAt(str, index, chr) {
  // if (index > str.length - 1) return str
  return str.substring(0, index) + chr + str.substring(index + 1)
}

const generateRandomString = (length, chars) => {
  let randomString = ""
  for (let i = 0; i < length; i++) {
    randomString += chars[randomInt(chars.length)]
  }
  return randomString
}

export default MatrixShower
