// import { useCallback, useRef, useState } from 'react'
// import { useMap } from './MapService'
// import { Coordinate } from './types'

// const useMapMouseOver = () => {
//   // TODO Als ik ergens anders de mouseOverCoords wil gebruiken moet dit allemaal naar de machine,
//   // zodat ik rerenders kan controleren met selectors.

//   const { onMouseOver } = useMap()

//   const onMouseMove = useCallback((coord: Coordinate) => {
//     console.log(coord)
//     onMouseOver(coord)
//   }, [])

//   return { onMouseMove }
// }

// export default useMapMouseOver
