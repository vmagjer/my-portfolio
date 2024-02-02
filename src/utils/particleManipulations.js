const CELL_SIZE = 20

function bounceOff(point, particle) {
  const dx = particle.x - point.x
  const dy = particle.y - point.y

  const distance = Math.sqrt(dx ** 2 + dy ** 2)
  const radius = 60

  let vx = particle.velocity.x
  let vy = particle.velocity.y

  if (distance < radius) {
    const angle = Math.atan2(dy, dx)
    vx = Math.cos(angle) * CELL_SIZE
    vy = Math.sin(angle) * CELL_SIZE
  }

  return {
    position: { x: particle.x, y: particle.y },
    velocity: { x: vx, y: vy },
    color: 'rgba(0, 255, 70, 1)',
  }
}

function avoid(point, particle) {
  const dx = particle.x - point.x
  const dy = particle.y - point.y

  const distance = Math.sqrt(dx ** 2 + dy ** 2)
  const strength = 50
  const radius = 300

  const angle = Math.atan2(dy, dx) + (Math.PI / 2) * Math.sign(dx)
  // avoid cursor
  let vx =
    Math.cos(angle) *
    CELL_SIZE *
    (strength / distance) *
    ease(Math.max(0, radius - distance) / radius)
  // let vy = Math.sin(angle) * CELL_SIZE * (strength / distance) * ease(Math.max(0, (radius - distance)) / radius)
  let vy = 0

  vx += particle.velocity.x
  vy += particle.velocity.y

  return {
    position: { x: particle.x, y: particle.y },
    velocity: { x: vx, y: vy },
    color: 'rgba(0, 255, 70, 1)',
  }
}

const ease = (x) => 1 - (1 - x) ** 2
const bellFunction = (x, radius) => {
  if (x < -radius || x > radius) {
    return 0
  }
  return Math.sin((x / radius) * Math.PI)
}

function displaceAround(point, particle) {
  const dx = particle.x - point.x
  const dy = particle.y - point.y
  const radius_x = 160
  const radius_y = 160

  let x = particle.x
  x += bellFunction(dy, radius_x) * bellFunction(-dx, radius_y) * CELL_SIZE

  return {
    position: { x: x, y: particle.y },
    velocity: particle.velocity,
    color: 'rgba(0, 255, 70, 1)',
  }
}

function bounceAndAvoid(point, particle) {
  const dy = particle.y - point.y

  if (dy < 0) {
    return bounceOff(point, particle)
  } else {
    return avoid(point, particle)
  }
}

function slowDown(point, particle) {
  const dx = particle.x - point.x
  const dy = particle.y - point.y

  const distance = Math.sqrt(dx ** 2 + dy ** 2)
  const radius = 200

  let vx = particle.velocity.x
  let vy = particle.velocity.y

  if (distance < radius) {
    vx *= distance / radius
    vy *= distance / radius
  }

  return {
    position: { x: particle.x, y: particle.y },
    velocity: { x: vx, y: Math.max(vy, 4) },
    color: 'rgba(0, 255, 70, 1)',
  }
}

function restoreInitialVelocity(particle) {
  const vx = particle.velocity.x * 0.9 + particle.initial_velocity.x * 0.1
  const vy = particle.velocity.y * 0.9 + particle.initial_velocity.y * 0.1

  return {
    position: { x: particle.x, y: particle.y },
    velocity: { x: vx, y: vy },
    color: 'rgba(0, 255, 70, 1)',
  }
}

export {
  bounceOff,
  avoid,
  displaceAround,
  bounceAndAvoid,
  slowDown,
  restoreInitialVelocity,
}
