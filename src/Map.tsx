import { memo, PropsWithChildren } from 'react'
import { width, height } from './App'
import { Coordinate } from './types'
import { useMap } from './MapService'

interface MapProps extends PropsWithChildren {
  onMouseMove: (coord: Coordinate) => void
  onClick: (coord: Coordinate) => void
  centerMapOnCoordinate: Coordinate
}

const Map = memo(
  ({ children, onMouseMove, onClick, centerMapOnCoordinate }: MapProps) => {
    console.log('RERENDER MAP...')

    return (
      <svg
        width={width}
        height={height}
        viewBox={`${centerMapOnCoordinate.x} ${centerMapOnCoordinate.y} ${width} ${height}`}
        style={{ background: 'black' }}
        onMouseMove={(e) => onMouseMove({ x: e.clientX, y: e.clientY })}
        onClick={(e) => onClick({ x: e.clientX, y: e.clientY })}
      >
        {children}
      </svg>
    )
  },
)

/**
 * The MapWrapper makes sure the memoization of the Map works,
 * by always passing in props that never change.
 * If Map would call the useMapMouseOver en useMapClick itself, Map would
 * re-render everytime because the state inside these hooks changes all the time.
 */
const MapWrapper = ({ children }: PropsWithChildren) => {
  const { onMouseOver, onClick, centerMapOnCoordinate } = useMap()

  return (
    <Map
      onMouseMove={onMouseOver}
      onClick={onClick}
      centerMapOnCoordinate={centerMapOnCoordinate}
    >
      {children}
    </Map>
  )
}

export default MapWrapper
