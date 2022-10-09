import { useMap } from './MapService'

const Coordinates = () => {
  const { centerMapOnCoordinate, mouseOverCoordinate } = useMap()

  return (
    <div>
      Mouse over:
      {mouseOverCoordinate
        ? `${mouseOverCoordinate.x},${mouseOverCoordinate.y}`
        : null}
      <br />
      Pinned:
      {`${centerMapOnCoordinate.x},${centerMapOnCoordinate.y}`}
    </div>
  )
}

export default Coordinates
