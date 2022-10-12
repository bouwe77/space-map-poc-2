import ArrowKeys from './ArrowKeys'
import Coordinates from './Coordinates'
import MapWrapper from './Map'
import MapServiceProvider from './MapService'
import { Spaceships } from './Spaceships'

const planets = [
  { name: 'A', x: 20, y: 50, color: 'yellow' },
  { name: 'B', x: 100, y: 130, color: 'green' },
  { name: 'C', x: 100, y: 210, color: 'blue' },
  { name: 'D', x: 260, y: 290, color: 'red' },
  { name: 'E', x: 340, y: 290, color: 'purple' },
]

function App() {
  return (
    <MapServiceProvider>
      <MapWrapper>
        {planets.map((planet) => (
          <circle cx={planet.x} cy={planet.y} r={20} fill={planet.color} key={planet.name} />
        ))}
      </MapWrapper>
      <div>
        <ArrowKeys />
        <Coordinates />
        <Spaceships />
      </div>
    </MapServiceProvider>
  )
}

export default App
