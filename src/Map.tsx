import { memo, PropsWithChildren } from 'react'
import { width, height } from './mapSettings'
import { Coordinate } from './types'
import { useMap } from './MapService'
import useSvgMouseEventCoordinates from './useSvgCoordinates'

export const noop = (): void => {}

interface MapProps extends PropsWithChildren {
  onMouseMove: (coord: Coordinate) => void
  onClick: (coord: Coordinate) => void
  centerMapOnCoordinate: Coordinate
}

const Map = memo(({ children, onMouseMove, onClick, centerMapOnCoordinate }: MapProps) => {
  console.log('rerender MAP...')

  const mapRef = useSvgMouseEventCoordinates({
    mousemove: onMouseMove,
    click: onClick,
  })

  const position = { x: centerMapOnCoordinate.x - width / 2, y: centerMapOnCoordinate.y - height / 2 }

  return (
    <svg
      ref={mapRef}
      width={width}
      height={height}
      viewBox={`${position.x} ${position.y} ${width} ${height}`}
      style={{ background: 'black' }}
    >
      {children}
    </svg>
  )
})

/**
 * The MapWrapper makes sure the memoization of the Map component works, by passing the dependencies of Map as props.
 * This way, Map only rerenders if the props change, which in this case only can be the centerMapOnCoordinate prop.
 * The other props are stable callbacks, or children that were already rendered higher up in the tree.
 * Map itself, internally, has nothing that can cause a rerender, because that would bypass the memoization.
 */
const MapWrapper = ({ children }: PropsWithChildren) => {
  const { onMouseOver, onClick, centerMapOnCoordinate } = useMap()

  return (
    <Map onMouseMove={onMouseOver} onClick={onClick} centerMapOnCoordinate={centerMapOnCoordinate}>
      {children}
    </Map>
  )
}

export default MapWrapper
