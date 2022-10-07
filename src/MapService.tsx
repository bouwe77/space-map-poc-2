import { useActor, useInterpret, useSelector } from '@xstate/react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react'
import { InterpreterFrom } from 'xstate'
import mapMachine, { MapMachineState } from './mapMachine'
import { Coordinate } from './types'
import useSpaceship from './useSpaceship'

const MapService = createContext({} as InterpreterFrom<typeof mapMachine>)

const MapServiceProvider = ({ children }: PropsWithChildren) => {
  const spaceship = useSpaceship()

  const mapService = useInterpret(mapMachine, {
    actions: {},
    context: {
      followingSpaceshipName: spaceship.name,
      centerMapOnCoordinate: spaceship.position,
    },
    guards: {},
    services: {},
  })

  return (
    <MapService.Provider value={mapService}>{children}</MapService.Provider>
  )
}

const useMapService = (): InterpreterFrom<typeof mapMachine> => {
  const ctx = useContext(MapService)
  if (!ctx)
    throw new Error('Only call useMapService within an MapServiceProvider')
  return ctx
}

interface MapHookReturn {
  centerMapOnCoordinate: Coordinate
  onMouseOver: (coordinate: Coordinate) => void
  onClick: (coordinate: Coordinate) => void
}

export const useMap = (): MapHookReturn => {
  const service = useMapService()

  const centerMapOnCoordinate = useSelector(
    service,
    (state: MapMachineState) => state.context.centerMapOnCoordinate,
  )

  const onMouseOver = useCallback(
    (coordinate: Coordinate) => {
      console.log('MOUSE_OVER:', coordinate)
      service.send({ coordinate, type: 'MOUSE_OVER' })
    },
    [service],
  )

  const onClick = useCallback(
    (coordinate: Coordinate) => {
      console.log('CLICK:', coordinate)
      service.send({ coordinate, type: 'CLICK' })
    },
    [service],
  )

  return {
    centerMapOnCoordinate,
    onMouseOver,
    onClick,
  }
}

export default MapServiceProvider
