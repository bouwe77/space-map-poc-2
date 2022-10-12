import { createMachine, assign, StateFrom, ActorRefFrom } from 'xstate'
import { Coordinate, Spaceship } from './types'

export type Direction = 'up' | 'left' | 'right' | 'down'

const coordinateEquals = (coord1: Coordinate, coord2: Coordinate) => coord1.x === coord2.x && coord1.y === coord2.y

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
      type: 'PIN'
      coordinate: Coordinate
    }
  | {
      type: 'MOVE_PIN'
      direction: Direction
    }
  | {
      type: 'FOLLOW_SPACESHIP'
      spaceship: Spaceship
    }
  | {
      type: 'UNFOLLOW_SPACESHIP'
    }
  | {
      type: 'SPACESHIP_MOVED'
      spaceship: Spaceship
    }

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
      PIN: {
        actions: 'setCenterMapOnCoordinate',
      },
      FOLLOW_SPACESHIP: {
        actions: ['setFollowingSpaceshipname', 'setCenterMapOnSpaceship'],
        target: 'followingSpaceship',
      },
      MOVE_PIN: {
        actions: 'setCenterMapMove',
      },
    },
    states: {
      centeredOnMap: {},
      followingSpaceship: {
        on: {
          SPACESHIP_MOVED: {
            actions: 'setCenterMapOnSpaceship',
          },
          UNFOLLOW_SPACESHIP: {
            actions: 'clearFollowingSpaceshipname',
            target: 'centeredOnMap',
          },
          MOVE_PIN: {
            target: 'centeredOnMap',
          },
        },
      },
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
      setCenterMapOnSpaceship: assign({
        centerMapOnCoordinate: (_, e) => e.spaceship.position,
      }),
      setFollowingSpaceshipname: assign({
        followingSpaceshipName: (_, e) => e.spaceship.name,
      }),
      clearFollowingSpaceshipname: assign({
        followingSpaceshipName: () => null,
      }),
      setCenterMapMove: assign({
        centerMapOnCoordinate: (ctx, e) => {
          if (e.direction === 'up')
            return {
              ...ctx.centerMapOnCoordinate,
              y: ctx.centerMapOnCoordinate.y - 10,
            }
          if (e.direction === 'left')
            return {
              ...ctx.centerMapOnCoordinate,
              x: ctx.centerMapOnCoordinate.x - 10,
            }
          if (e.direction === 'right')
            return {
              ...ctx.centerMapOnCoordinate,
              x: ctx.centerMapOnCoordinate.x + 10,
            }
          if (e.direction === 'down')
            return {
              ...ctx.centerMapOnCoordinate,
              y: ctx.centerMapOnCoordinate.y + 10,
            }
          return ctx.centerMapOnCoordinate
        },
      }),
    },
    guards: {
      isDifferentMouseOverCoordinate: (ctx, e) =>
        !ctx.mouseOverCoordinate || !coordinateEquals(e.coordinate, ctx.mouseOverCoordinate),
    },
  },
)

export default mapMachine

export type MapMachineState = StateFrom<typeof mapMachine>
export type MapMachineActorRef = ActorRefFrom<typeof mapMachine>
