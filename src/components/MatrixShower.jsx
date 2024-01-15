import { useEffect, useRef, useState } from "react"
const MIN_TICK = 100

const MatrixShower = ({ className, text = "", scale = 1 }) => {
  const canvasRef = useRef(null)

  const [counters, setCounters] = useState([])
  const [prevCounters, setPrevCounters] = useState([])

  const [randomStrings, setRandomStrings] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    const colSize = 20 * scale
    const rowSize = 20 * scale

    const cols = Math.ceil(width / colSize)
    const rows = Math.ceil(height / rowSize)

    setCounters(new Array(cols).fill(0).map(() => -randomInt(rows)))
    setPrevCounters(new Array(cols).fill(rows * 2))

    const matrixChars = '12345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

    setRandomStrings(
      new Array(cols)
        .fill("")
        .map(() => generateRandomString(rows, matrixChars))
    )

    const promptText = text
    const promptTextStart = Math.floor((cols - promptText.length) / 2)
    const promptTextEnd = promptTextStart + promptText.length
    const promptTextRow = Math.floor(rows / 2)

    ctx.font = "15pt monospace"

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    function draw(counters, prevCounters, randomStrings) {
      ctx.clearRect(0, 0, width, height)

      let x = 0
      for (let i = 0; i < cols; i++) {
        drawColumn({
          col: i,
          activeRow: counters[i],
          prevActiveRow: prevCounters[i],
          x,
          randomStrings,
        })

        x += colSize
      }
    }

    const tailLength = rows * 0.7
    const alphaStep = 1 / tailLength

    function drawColumn({ col, activeRow, prevActiveRow, x, randomStrings }) {
      const isinPromptCols = col >= promptTextStart && col < promptTextEnd

      let alpha = 1 - activeRow * alphaStep

      const tailStart = activeRow - tailLength
      const prevTailStart = prevActiveRow - tailLength

      // const x = col * colSize
      let y = 0
      for (let row = 0; row < rows; row++) {
        if (isinPromptCols && row === promptTextRow) {
          const char = promptText[col - promptTextStart]
          const color = "150, 255, 170"

          drawSymbol(x, y, char, color, alpha + 0.2, false)
        } else {
          const char = randomStrings[col][row]
          const color = row === activeRow ? "150, 255, 150" : "0, 255, 70"

          drawSymbol(x, y, char, color, alpha, true)
        }

        if (
          (row > tailStart && row < activeRow) ||
          (row > prevTailStart && row < prevActiveRow)
        ) {
          alpha += alphaStep
        } else {
          alpha = 0
        }
        y += rowSize
      }
    }

    // shadow
    ctx.shadowBlur = 8
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    function drawSymbol(x, y, symbol, color, alpha = 1, flip = false) {
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
            draw(currCounters, currPrevCounters, currRandomStrings)

            // increment counters
            for (let i = 0; i < cols; i++) {
              currCounters[i]++
              currPrevCounters[i]++

              // reset counter if it reaches the end
              if (currCounters[i] >= rows) {
                currPrevCounters[i] = currCounters[i]
                currCounters[i] = -randomInt(rows)
              }
            }

            // randomize a character in each collumn
            for (let i = 0; i < cols; i++) {
              const randomIndex = randomInt(rows)
              const randomChar = matrixChars[randomInt(matrixChars.length)]

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
    }, MIN_TICK)

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
