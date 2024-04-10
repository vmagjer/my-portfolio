import styled from 'styled-components'
import data from '../assets/data'
import { useEffect, useRef } from 'react'
import { NetworkDrawingStrategy, NetworkRenderer, NetworkUpdatingStrategy } from '../utils/drawNodeNetwork'

export default function SkillGraph() {
  // const [R, setR] = useState(0.022)

  // function inputChanged(e) {
  //   setR(e.target.value)
  // }

  const wrapperRef = useRef(null)
  useEffect(() => {
    // initialize canvas
    if (!wrapperRef.current) return
    const height = wrapperRef.current.clientHeight
    const width = wrapperRef.current.clientWidth
    const canvas = document.getElementById('skill-graph')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    // create a particle system where each skill is a particle and repells or attracts other particles based on their adjacency
    const skills = Object.values(data.technologies)
    const adjacency = data.techAdjacencyMatrix

    const L = canvas.height / 20 // spring rest length
    const K_r = 6250 // repulsion constant
    const R = 0.022
    // const K_s = K_r / (R * L ** 3) // spring constant
    const delta_t = 2
    const max_displacement_squared = 2 ** 2

    const updatingStrategy = new NetworkUpdatingStrategy({
      L,
      K_r,
      R,
      delta_t,
      max_displacement_squared,
      center: { x: canvas.width / 2, y: canvas.height / 2 },
      centeringForce: 0.0001,
    })
    const drawingStrategy = new NetworkDrawingStrategy()
    const network = new NetworkRenderer(skills, adjacency, updatingStrategy, drawingStrategy, ctx)
    
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
  }, [])

  return (
    <Skills ref={wrapperRef}>
      <canvas id="skill-graph" width="400" height="400"></canvas>
    </Skills>
  )
}
const Skills = styled.div``
