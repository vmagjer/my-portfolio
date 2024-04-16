import styled from 'styled-components'
import data from '../assets/data'
import { useEffect, useRef, useState } from 'react'
import {
  NetworkDrawingStrategy,
  NodeLinkDiagramRenderer,
  GraphTopologyStrategy,
  UndirectedGraph,
} from '../utils/drawNodeNetwork'

const skillsGraph = new UndirectedGraph(Object.values(data.technologies), (a, b) => {
  if (a.id === b.id) return 0
  const commonTagsCount = a.tags.filter(tag => b.tags.includes(tag)).length
  const aTagsIncludesB = a.tags.includes(b.id)
  const bTagsIncludesA = b.tags.includes(a.id)
  return commonTagsCount + aTagsIncludesB + bTagsIncludesA
})

export default function SkillGraph() {
  const [R, setR] = useState(0.05)

  function inputChanged(e) {
    setR(e.target.value)
  }

  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    // initialize canvas
    if (!wrapperRef.current) return
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = wrapperRef.current.clientWidth
    canvas.height = wrapperRef.current.clientHeight
    const ctx = canvas.getContext('2d')

    const updatingStrategy = new GraphTopologyStrategy({
      L: 20,
      K_r: 6250,
      R: R,
      delta_t: .04, 
      max_displacement_squared: 1 ** 2,
      center: { x: canvas.width / 2, y: canvas.height / 2 }, 
      centeringForce: 0.0001,
    })
    const drawingStrategy = new NetworkDrawingStrategy()


    const network = new NodeLinkDiagramRenderer(
      skillsGraph,
      updatingStrategy,
      drawingStrategy,
      ctx
    )

    let requestId = null
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      network.draw(ctx)
      network.update()
      requestId = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [wrapperRef, canvasRef, R])

  const onReset = () => {
    console.log('reset')
  }

  return (
    <Skills ref={wrapperRef}>
      <canvas ref={canvasRef} id="skill-graph" width="400" height="400"></canvas>
      <button onClick={onReset}>Reset</button>
      <input type="range" min="0" max="0.09" step="0.001" id="myRange" onChange={inputChanged} value={R}></input>
      {R}
    </Skills>
  )
}
const Skills = styled.div`
width: 100%;
height: 400px;`
