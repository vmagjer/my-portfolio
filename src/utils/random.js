
function generateRandomString(length, chars) {
  let randomString = []
  for (let i = 0; i < length; i++) {
    randomString.push(chars[randomInt(chars.length)])
  }
  return randomString.join('')
}

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

export { generateRandomString, randomInt }