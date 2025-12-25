let safe = false

const safeRoute = (handleRoute: () => void, delay?: 100000) => {
  if (safe === true) return
  safe = true
  handleRoute()
  setTimeout(() => {
    safe = false
  }, delay)
}

export default safeRoute
