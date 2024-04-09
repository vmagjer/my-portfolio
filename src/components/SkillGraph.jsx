import styled from 'styled-components'
import data from '../assets/data'
import { useEffect, useRef } from 'react'

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
    const links = []
    const maxAdjacency = Math.max(...adjacency.flat())
    for (let i = 0; i < adjacency.length; i++) {
      for (let j = i + 1; j < adjacency[i].length; j++) {
        if (adjacency[i][j] === 0) continue
        links.push({
          source: i,
          target: j,
          strength: adjacency[i][j] / maxAdjacency,
        })
      }
    }
    const L = canvas.height / 20 // spring rest length
    const K_r = 6250 // repulsion constant
    const R = 0.022
    const K_s = K_r / (R * L ** 3) // spring constant
    const delta_t = 1
    const max_displacement_squared = 2 ** 2

    const particles = skills.map((skill) => ({
      skill,
      // x: Math.random() * canvas.width,
      // y: Math.random() * canvas.height,
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2 + (Math.random() - 0.5) * 200,
      fx: 0,
      fy: 0,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      links.forEach(({ source, target, strength }) => {
        const { x: x1, y: y1 } = particles[source]
        const { x: x2, y: y2 } = particles[target]

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${
          strength * 0.5
        })`
        ctx.lineWidth = strength * 4
        ctx.stroke()
        ctx.closePath()
      })
      particles.forEach((particle) => {
        // draw skill image
        const { icon } = particle.skill
        const img = new Image()
        img.src = icon
        ctx.drawImage(img, particle.x - 12, particle.y - 12, 24, 24)
      })
    }

    function update() {
      // reset velocities
      particles.forEach((particle) => {
        particle.fx = 0
        particle.fy = 0
      })
      // attraction between adjacent pairs
      links.forEach(({ source, target, strength }) => {
        const { x: x1, y: y1 } = particles[source]
        const { x: x2, y: y2 } = particles[target]

        const dx = x2 - x1
        const dy = y2 - y1
        if (dx === 0 && dy === 0) {
          return
        }
        const distanceSquared = dx ** 2 + dy ** 2
        const distance = Math.sqrt(distanceSquared)
        const force = K_s / (distance - L) * (.6+strength)
        const fx = (dx * force) / distance 
        const fy = (dy * force) / distance

        particles[source].fx += fx
        particles[source].fy += fy
        particles[target].fx -= fx
        particles[target].fy -= fy
      })

      // repulsion between all pairs
      for (let i = 0; i < particles.length - 1; i++) {
        const { x: x1, y: y1 } = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const { x: x2, y: y2 } = particles[j]

          const dx = x2 - x1
          const dy = y2 - y1
          if (dx === 0 && dy === 0) {
            particles[j].fx += Math.random() * 0.1
            particles[j].fy += Math.random() * 0.1
            continue
          }
          const distanceSquared = dx ** 2 + dy ** 2
          const distance = Math.sqrt(distanceSquared)
          const force = K_r / distanceSquared
          const fx = (dx * force) / distance
          const fy = (dy * force) / distance

          particles[i].fx -= fx
          particles[i].fy -= fy
          particles[j].fx += fx
          particles[j].fy += fy
        }
      }

      // centering force
      particles.forEach((particle) => {
        const { x, y } = particle
        const dx = x - canvas.width / 2
        const dy = y - canvas.height / 2

        const distanceSquared = dx ** 2 + dy ** 2
        const distance = Math.sqrt(distanceSquared)
        const force = 0.0001
        const fx = (dx * force) * distance
        const fy = (dy * force) * distance

        particle.fx -= fx
        particle.fy -= fy
      })

      // update positions
      particles.forEach((particle) => {
        let dx = delta_t * particle.fx
        let dy = delta_t * particle.fy
        const displacementSquared = dx ** 2 + dy ** 2
        if (displacementSquared > max_displacement_squared) {
          const scale = Math.sqrt(
            max_displacement_squared / displacementSquared
          )
          dx *= scale
          dy *= scale
        }
        particle.x += dx
        particle.y += dy
      })
    }

    function loop() {
      draw()
      update()
      requestAnimationFrame(loop)
    }

    loop()
    // TODO reduce computatuin
  }, [])

  return (
    <Skills ref={wrapperRef}>
      <canvas id="skill-graph" width="400" height="400"></canvas>
    </Skills>
  )
}
const Skills = styled.div``
