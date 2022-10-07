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
    setCenterMapOnCoordinate: 'CLICK'
    setMouseOverCoordinate: 'MOUSE_OVER'
  }
  eventsCausingServices: {}
  eventsCausingGuards: {
    isDifferentMouseOverCoordinate: 'MOUSE_OVER'
  }
  eventsCausingDelays: {}
  matchesStates: 'centeredOnMap'
  tags: never
}
