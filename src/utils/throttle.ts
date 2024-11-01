
export default function throttle(callback: () => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null

  return function () {
    if (timeout !== null) {
      return
    }

    callback()
    timeout = setTimeout(() => {
      timeout = null
    }, delay)
  }
}