import ArrowKeys from './ArrowKeys'
import Coordinates from './Coordinates'
import MapWrapper from './Map'
import MapServiceProvider from './MapService'
import Planets from './Planets'
import SpaceshipButtons from './SpaceshipButtons'
import Spaceships from './Spaceships'

function App() {
  return (
    <MapServiceProvider>
      <MapWrapper>
        <Spaceships />
        <Planets />
      </MapWrapper>
      <div>
        <ArrowKeys />
        <Coordinates />
        <SpaceshipButtons />
      </div>
    </MapServiceProvider>
  )
}

export default App
