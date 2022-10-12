import usePlanets from './usePlanets'

const Planets = () => {
  console.log('rerender PLANETS...')

  const planets = usePlanets()

  return (
    <>
      {planets.map((planet) => (
        <circle cx={planet.x} cy={planet.y} r={20} fill={planet.color} key={planet.name} />
      ))}
    </>
  )
}

export default Planets
