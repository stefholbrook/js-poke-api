const fetch = require('node-fetch')

const dimensions = {
  heights: [],
  weights: [],
}

// charmander, bulbasaur, squirtle, pidgey, and rattata
async function fetchPokesDimensions() {
  const pokes = ['charmander', 'bulbasaur', 'squirtle', 'pidgey', 'rattata']

  for (let poke of pokes) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    const data = await response.json()

    dimensions.heights.push(data.height)
    dimensions.weights.push(data.weight)
  }

  // { heights: [ 6, 7, 5, 3, 3 ], weights: [ 85, 69, 90, 18, 35 ] }
  mean(dimensions.heights)
  mean(dimensions.weights)
  median(dimensions.heights)
  median(dimensions.weights)
  console.log(mode(dimensions.heights))
  console.log(mode(dimensions.weights))
  return dimensions
}

// sum / length
const mean = (values) => values.reduce((acc, value) => acc += value) / values.length

// sorted, middle or middle / 2
const median = (values) => {
  const sorted = values.sort()
  const index = values.length / 2

  if (values.length % 2 === 0) {
    return (sorted[index] + sorted[index - 1]) / 2
  } else {
    return sorted[index]
  }
}

// most frequently occuring
const mode = (values) => {
  const tallied = values.reduce((acc, value) => {
    if (acc[value] === undefined) {
      acc[value] = [0, value]
    }

    acc[value][0]++

    return acc
  }, {})

  // return Object.values(tallied).sort((a, b) => b[0] - a[0])[0][1]
  return Object.values(tallied).sort((a, b) => b[0] - a[0]).filter((value, index) => {
    const highest = index === 0 && value[0]
    return value[0] === highest
  }).map((value) => value[0] > 1 ? value[1] : null)
}


fetchPokesDimensions()
