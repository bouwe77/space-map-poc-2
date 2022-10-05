import { createMachine, assign } from 'xstate'

interface Coordinate {
  x: number
  y: number
}

interface MapMachineContext {
  centerCoordinate: Coordinate
  followingSpaceshipName: string | null
}

type MapMachineEvents =
  | {
      type: 'CENTER_ON_COORDINATE'
      coordinate: Coordinate
    }
  | {
      type: 'FOLLOW_SPACESHIP'
      name: string
    }
  | {
      type: 'UNFOLLOW_SPACESHIP'
    }

const mapMachine = createMachine(
  {
    schema: {
      context: {} as MapMachineContext,
      events: {} as MapMachineEvents,
    },
    context: {
      followingSpaceshipName: null,
    },
    id: 'mapMachine',
    init: 'cnteredOnMap',
    states: {
      centeredOnMap: {
        on: {
          CENTER_ON_COORDINATE: {
            action: 'setCenterCoordinate',
          },
        },
      },
    },
  },
  {
    actions: {
      setCenterCoordinate: assign({
        centerCoordinate: (_, e) => e.coordinate,
      }),
    },
  },
)
