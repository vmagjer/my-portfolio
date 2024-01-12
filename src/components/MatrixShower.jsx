import { useEffect, useRef, useState } from "react"

const MatrixShower = () => {
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

    const colSize = 20
    const rowSize = 20

    const cols = Math.ceil(width / colSize)
    const rows = Math.ceil(height / rowSize)

    setCounters(
      new Array(cols).fill(0).map(() => -Math.floor(Math.random() * rows))
    )
    setPrevCounters(new Array(cols).fill(rows * 2))

    const matrixChars = '12345789Z:."=*+-¦|ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'

    setRandomStrings(
      new Array(cols)
        .fill("")
        .map(() => generateRandomString(rows, matrixChars))
    )

    const promptText = "SCR0LL D0WN"
    const promptTextStart = Math.floor((cols - promptText.length) / 2)
    const promptTextEnd = promptTextStart + promptText.length
    const promptTextRow = Math.floor(rows / 2)

    ctx.font = "15pt monospace"

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    function draw(counters, prevCounters, randomStrings) {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        const x = i * colSize

        const isInPromptColumn = i >= promptTextStart && i < promptTextEnd

        for (let j = 0; j < rows; j++) {
          const y = j * rowSize

          let alpha = 1
          if (j < counters[i]) {
            const distance = counters[i] - j
            alpha = 1 - distance / rows
          } else if (j > counters[i]) {
            const distance = prevCounters[i] - j
            alpha = 1 - distance / rows
          }

          let char = randomStrings[i][j]
          let flip = true

          let color = "0, 255, 0"
          // prompt text
          if (isInPromptColumn && j === promptTextRow) {
            char = promptText[i - promptTextStart]
            flip = false

            color = "150, 255, 150"
            alpha = 0.5 + alpha // slow down fading
            
            // leading symbol
          } else if (j === counters[i]) {
            color = "150, 255, 150"
          }

          drawSymbol(x, y, char, color, alpha, flip)
        }
      }
    }

    function drawSymbol(x, y, symbol, color, alpha, flip = false) {
      ctx.fillStyle = `rgba(${color}, ${alpha})`

      ctx.save()
      ctx.translate(x, y)
      if (flip) ctx.scale(-1, 1)
      ctx.fillText(symbol, 0, 0)

      ctx.restore()
    }

    const interval = setInterval(() => {
      // set functions are used because useEffect snapshots state
      setRandomStrings((currRandomStrings) => {
        setCounters((currCounters) => {
          setPrevCounters((currPrevCounters) => {
            draw(currCounters, currPrevCounters, currRandomStrings)

            // increment counters
            for (let i = 0; i < cols; i++) {
              currCounters[i]++
              currPrevCounters[i]++
              if (currCounters[i] > rows) {
                currPrevCounters[i] = currCounters[i]
                currCounters[i] = -Math.floor(Math.random() * rows)
              }
            }
            return currPrevCounters
          })
          return currCounters
        })

        // randomize a character in each collumn
        for (let i = 0; i < cols; i++) {
          const randomIndex = Math.floor(Math.random() * rows)
          const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)]
          
          currRandomStrings[i] = setCharAt(currRandomStrings[i], randomIndex, randomChar)
        }

        return currRandomStrings
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}


function setCharAt(str, index, chr) {
  // if (index > str.length - 1) return str
  return str.substring(0, index) + chr + str.substring(index + 1)
}


const generateRandomString = (length, chars) => {
  let randomString = ""
  for (let i = 0; i < length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)]
  }
  return randomString
}

export default MatrixShower
