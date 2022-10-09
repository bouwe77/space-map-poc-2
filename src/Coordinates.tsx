import { useMap } from './MapService'

const Coordinates = () => {
  const { centerMapOnCoordinate, mouseOverCoordinate } = useMap()

  return (
    <>
      Mouse over:
      {mouseOverCoordinate
        ? `${mouseOverCoordinate.x},${mouseOverCoordinate.y}`
        : null}
      <br />
      Pinned:
      {`${centerMapOnCoordinate.x},${centerMapOnCoordinate.y}`}
    </>
  )
}

export default Coordinates
