import { createMachine, assign, StateFrom, ActorRefFrom } from 'xstate'
import { Coordinate } from './types'

const coordinateEquals = (coord1: Coordinate, coord2: Coordinate) =>
  coord1.x === coord2.x && coord1.y === coord2.y

interface MapMachineContext {
  centerMapOnCoordinate: Coordinate
  followingSpaceshipName: string | null
  mouseOverCoordinate: Coordinate | null
}

type MapMachineEvents =
  | {
      type: 'MOUSE_OVER'
      coordinate: Coordinate
    }
  | {
      type: 'CLICK'
      coordinate: Coordinate
    }
// | {
//       type: 'FOLLOW_SPACESHIP'
//       name: string
//     }
//   | {
//       type: 'UNFOLLOW_SPACESHIP'
//     }

const mapMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./mapMachine.typegen').Typegen0,
    schema: {
      context: {} as MapMachineContext,
      events: {} as MapMachineEvents,
    },
    id: 'mapMachine',
    initial: 'centeredOnMap',
    on: {
      MOUSE_OVER: [
        {
          actions: 'setMouseOverCoordinate',
          cond: 'isDifferentMouseOverCoordinate',
        },
      ],
      CLICK: {
        actions: 'setCenterMapOnCoordinate',
      },
    },
    states: {
      centeredOnMap: {},
    },
  },
  {
    actions: {
      setMouseOverCoordinate: assign({
        mouseOverCoordinate: (_, e) => e.coordinate,
      }),
      setCenterMapOnCoordinate: assign({
        centerMapOnCoordinate: (_, e) => e.coordinate,
      }),
    },
    guards: {
      isDifferentMouseOverCoordinate: (ctx, e) =>
        !ctx.mouseOverCoordinate ||
        !coordinateEquals(e.coordinate, ctx.mouseOverCoordinate),
    },
  },
)

export default mapMachine

export type MapMachineState = StateFrom<typeof mapMachine>
export type MapMachineActorRef = ActorRefFrom<typeof mapMachine>
