function handleGetRandoms(cant = 100000000) {
  const numbers = {}
  for (let i = 0; i < cant; i++) {
    const tempNum = Math.floor(Math.random() * 999 + 1)
    numbers[tempNum] = numbers[tempNum] ? numbers[tempNum] + 1 : 1
  }
  return numbers
}

function getRandoms(req, res) {
  const cant = req.query.cant || 100000000
  const numbers = handleGetRandoms(cant)
  res.json({ numbers })
}

module.exports = { getRandoms }