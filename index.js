const { parse } = require('csv-parse')
const fs = require('fs')
const habitablePlanet = []

function isPlanetHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_prad'] < 1.6
  )
}

fs.createReadStream('keplar_data.csv')
  .pipe(parse({ comment: '#', columns: true }))
  .on('data', (data) => {
    if (isPlanetHabitable(data)) {
      habitablePlanet.push(data)
    }
  })
  .on('error', (error) => console.log(error))
  .on('end', () => {
    console.log(
      habitablePlanet.map((planets) => {
        return planets['kepler_name']
      })
    )
    console.log(`${habitablePlanet.length} is number of Habitable planet found`)
    console.log('done')
  })
// parse()
