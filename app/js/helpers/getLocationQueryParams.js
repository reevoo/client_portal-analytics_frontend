export default () => {
  try {
    return Object.fromEntries(new URLSearchParams(window.location.search)) // eslint-disable-line
  } catch (error) {
    console.error(error)
    return {}
  }
}
