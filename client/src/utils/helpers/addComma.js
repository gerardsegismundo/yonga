const addZeroes = num => {
  // add zeroes to non decimal
  return num.toLocaleString('en', { useGrouping: false, minimumFractionDigits: 2 })
}

const addComma = num => {
  if (!num) return 0

  num = addZeroes(num)

  if (num <= 999) return num

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default addComma
