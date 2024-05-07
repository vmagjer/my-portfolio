
function generateRandomString(length: number, chars: string): string {
  const randomString = []
  for (let i = 0; i < length; i++) {
    randomString.push(chars[randomInt(chars.length)])
  }
  return randomString.join('')
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

export { generateRandomString, randomInt }