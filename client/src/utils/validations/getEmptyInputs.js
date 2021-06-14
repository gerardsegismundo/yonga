export const getEmptyInputs = form => {
  let emptyInputs = []

  for (const [key, value] of Object.entries(form)) {
    console.log(`${key}: ${value}`)
  }

  for (const [key] of Object.entries(form)) {
    console.log(`${key}`)
  }

  return emptyInputs
}
