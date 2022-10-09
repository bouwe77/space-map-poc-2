import { useActor, useInterpret, useSelector } from '@xstate/react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react'
import { InterpreterFrom } from 'xstate'
import { send, start } from 'xstate/lib/actions'
import mapMachine, { MapMachineState } from './mapMachine'
import { Coordinate, Spaceship } from './types'
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
  mouseOverCoordinate: Coordinate | null
  onMouseOver: (coordinate: Coordinate) => void
  onClick: (coordinate: Coordinate) => void
  followSpaceship: (spaceship: Spaceship) => void
  unfollowSpaceship: () => void
}

export const useMap = (): MapHookReturn => {
  const service = useMapService()

  const centerMapOnCoordinate = useSelector(
    service,
    (state: MapMachineState) => state.context.centerMapOnCoordinate,
  )

  const mouseOverCoordinate = useSelector(
    service,
    (state: MapMachineState) => state.context.mouseOverCoordinate,
  )

  const onMouseOver = useCallback(
    (coordinate: Coordinate) => {
      //console.log('MOUSE_OVER:', coordinate)
      service.send({ coordinate, type: 'MOUSE_OVER' })
    },
    [service],
  )

  const onClick = useCallback(
    (coordinate: Coordinate) => {
      //console.log('CLICK:', coordinate)
      service.send({ coordinate, type: 'CLICK' })
    },
    [service],
  )

  const followSpaceship = useCallback(
    (spaceship: Spaceship) => {
      console.log('follow ' + spaceship.name)
      service.send({ type: 'FOLLOW_SPACESHIP', spaceship })
    },
    [service],
  )

  const unfollowSpaceship = useCallback(() => {
    console.log('unfollow')
    service.send({ type: 'UNFOLLOW_SPACESHIP' })
  }, [service])

  return {
    centerMapOnCoordinate,
    mouseOverCoordinate,
    onMouseOver,
    onClick,
    followSpaceship,
    unfollowSpaceship,
  }
}

export default MapServiceProvider
