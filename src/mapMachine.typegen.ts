// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    clearFollowingSpaceshipname: 'UNFOLLOW_SPACESHIP'
    setCenterMapOnCoordinate: 'CLICK'
    setCenterMapOnCoordinate2: 'FOLLOW_SPACESHIP' | 'SPACESHIP_MOVED'
    setFollowingSpaceshipname: 'FOLLOW_SPACESHIP'
    setMouseOverCoordinate: 'MOUSE_OVER'
  }
  eventsCausingServices: {}
  eventsCausingGuards: {
    isDifferentMouseOverCoordinate: 'MOUSE_OVER'
  }
  eventsCausingDelays: {}
  matchesStates: 'centeredOnMap' | 'followingSpaceship'
  tags: never
}
