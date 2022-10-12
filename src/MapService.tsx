import { useInterpret, useSelector } from '@xstate/react'
import { createContext, PropsWithChildren, useCallback, useContext } from 'react'
import { InterpreterFrom } from 'xstate'
import mapMachine, { Direction, MapMachineState } from './mapMachine'
import { Coordinate, Spaceship } from './types'
import { useSpaceship } from './useSpaceships'

const MapService = createContext({} as InterpreterFrom<typeof mapMachine>)

const MapServiceProvider = ({ children }: PropsWithChildren) => {
  const spaceship = useSpaceship()

  const mapService = useInterpret(mapMachine, {
    context: {
      followingSpaceshipName: spaceship.name,
      centerMapOnCoordinate: spaceship.position,
    },
  })

  return <MapService.Provider value={mapService}>{children}</MapService.Provider>
}

const useMapService = (): InterpreterFrom<typeof mapMachine> => {
  const ctx = useContext(MapService)
  if (!ctx) throw new Error('Only call useMapService within a MapServiceProvider')
  return ctx
}

interface MapHookReturn {
  centerMapOnCoordinate: Coordinate
  mouseOverCoordinate: Coordinate | null
  onMouseOver: (coordinate: Coordinate) => void
  pin: (coordinate: Coordinate) => void
  movePin: (direction: Direction) => void
  followSpaceship: (spaceship: Spaceship) => void
  unfollowSpaceship: () => void
  followingSpaceshipName: string | null
  followingSpaceshipMoved: (spaceship: Spaceship) => void
}

export const useMap = (): MapHookReturn => {
  const service = useMapService()

  const centerMapOnCoordinate = useSelector(service, (state: MapMachineState) => state.context.centerMapOnCoordinate)

  const mouseOverCoordinate = useSelector(service, (state: MapMachineState) => state.context.mouseOverCoordinate)

  const onMouseOver = useCallback(
    (coordinate: Coordinate) => {
      service.send({ coordinate, type: 'MOUSE_OVER' })
    },
    [service],
  )

  const pin = useCallback(
    (coordinate: Coordinate) => {
      service.send({ coordinate, type: 'PIN' })
    },
    [service],
  )

  const movePin = useCallback(
    (direction: Direction) => {
      service.send({ type: 'MOVE_PIN', direction })
    },
    [service],
  )

  const followSpaceship = useCallback(
    (spaceship: Spaceship) => {
      service.send({ type: 'FOLLOW_SPACESHIP', spaceship })
    },
    [service],
  )

  const unfollowSpaceship = useCallback(() => {
    service.send({ type: 'UNFOLLOW_SPACESHIP' })
  }, [service])

  const followingSpaceshipName = useSelector(service, (state: MapMachineState) => state.context.followingSpaceshipName)

  const followingSpaceshipMoved = useCallback(
    (spaceship: Spaceship) => {
      service.send({ type: 'SPACESHIP_MOVED', spaceship })
    },
    [service],
  )

  return {
    centerMapOnCoordinate,
    mouseOverCoordinate,
    onMouseOver,
    pin,
    movePin,
    followSpaceship,
    unfollowSpaceship,
    followingSpaceshipName,
    followingSpaceshipMoved,
  }
}

export default MapServiceProvider
