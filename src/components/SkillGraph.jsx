import styled from 'styled-components'
import data from '../assets/data'
import { useEffect } from 'react'

export default function SkillGraph() {
  useEffect(() => {
    const canvas = document.getElementById('skill-graph')
    const ctx = canvas.getContext('2d')

    // create a particle system where each skill is a particle and repells or attracts other particles based on their adjacency
    const skills = Object.values(data.technologies)
    const adjacency = data.techAdjacencyMatrix
    const links = []
    const maxStrength = Math.max(...adjacency.flat())
    for (let i = 0; i < adjacency.length; i++) {
      for (let j = i + 1; j < adjacency[i].length; j++) {
        if (adjacency[i][j] === 0) continue
        links.push({
          source: i,
          target: j,
          strength: adjacency[i][j],
        })
      }
    }

    const radius = 60
    const maxForce = 0.1
    const maxSpeed = 2

    const particles = skills.map((skill) => ({
      skill,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      // y: canvas.height / 2 + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      links.forEach(({ source, target, strength }) => {
        const { x: x1, y: y1 } = particles[source]
        const { x: x2, y: y2 } = particles[target]

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${strength / maxStrength * 0.5})`
        ctx.lineWidth = strength / maxStrength * 4
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
      // update forces
      links.forEach(({ source, target, strength }) => {        
        const { x: x1, y: y1 } = particles[source]
        const { x: x2, y: y2 } = particles[target]

        const dx = x2 - x1
        const dy = y2 - y1
        const distance = Math.sqrt(dx ** 2 + dy ** 2)
        const angle = Math.atan2(dy, dx)

        let force = 0
        if (distance < radius) {
          force = - maxForce 
        } else {
          force = (distance - radius) / radius * maxForce * strength / maxStrength
        }

        const fx = Math.cos(angle) * force
        const fy = Math.sin(angle) * force

        particles[source].vx += fx
        particles[source].vy += fy
        particles[target].vx -= fx
        particles[target].vy -= fy        
      })

      // update positions
      particles.forEach((particle) => {
        // redirect particles that are outside the canvas towards the center
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          const dx = canvas.width / 2 - particle.x
          const dy = canvas.height / 2 - particle.y
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * 0.1
          particle.vy += Math.sin(angle) * 0.1
        }
        
        // limit speed
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
        if (speed > maxSpeed) {
          particle.vx = particle.vx / speed * maxSpeed
          particle.vy = particle.vy / speed * maxSpeed
        }

        particle.x += particle.vx
        particle.y += particle.vy
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
    <Skills>
      <canvas id="skill-graph" width="400" height="400"></canvas>
    </Skills>
  )
}
const Skills = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const Skill = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 0.25rem;

  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.9);
`
