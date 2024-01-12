import { useEffect, useRef, useState } from "react"

const MatrixShower = () => {
  const canvasRef = useRef(null)

  const [counters, setCounters] = useState([])

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

    const chars =
      "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const promptText = "SCROLL DOWN"
    const promptTextStart = Math.floor((cols - promptText.length) / 2)
    const promptTextEnd = promptTextStart + promptText.length
    const promptTextRow = Math.floor(rows / 2)

    ctx.font = "15pt monospace"

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    function draw(counters) {
      ctx.fillStyle = `rgba(0, 8, 0, 0.05)` // this fades the text
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        if (counters[i] < 0) continue

        const x = i * colSize
        const y = counters[i] * rowSize

        if (
          counters[i] === promptTextRow &&
          i >= promptTextStart &&
          i < promptTextEnd
        ) {
          ctx.fillStyle = "#fff"
          ctx.fillText(promptText[i - promptTextStart], x, y)
          continue
        }

        const char = chars[Math.floor(Math.random() * chars.length)]

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(-1, 1)

        ctx.fillStyle = "#0f0"
        ctx.fillText(char, 0, 0)

        ctx.restore()
      }
    }

    const interval = setInterval(() => {
      setCounters((currCounters) => {
        draw(currCounters)

        for (let i = 0; i < cols; i++) {
          currCounters[i]++
          if (currCounters[i] > rows) {
            currCounters[i] = -Math.floor(Math.random() * rows)
          }
        }
        return currCounters
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

const generateRandomString = (length, chars) => {
  let randomString = ""
  for (let i = 0; i < length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)]
  }
  return randomString
}

export default MatrixShower
