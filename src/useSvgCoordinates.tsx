import { RefObject, useEffect, useRef } from 'react'
import { noop } from './Map'
import { Coordinate } from './types'

// Inspiration: https://stackoverflow.com/a/22185812

const getMouseEventHandler = (element: SVGSVGElement, callback: (coordinate: Coordinate) => void) => {
  const mouseEventHandler = (e: MouseEvent) => {
    let pt = element.createSVGPoint()
    pt.x = e.pageX
    pt.y = e.pageY
    pt = pt.matrixTransform(element.getScreenCTM().inverse())

    const coordinate: Coordinate = { x: pt.x, y: pt.y }
    callback(coordinate)
  }

  return mouseEventHandler
}

type EventHandlers = {
  mousemove: (coordinate: Coordinate) => void
  click: (coordinate: Coordinate) => void
}

const useSvgMouseEventCoordinates = (eventHandlers: EventHandlers): RefObject<SVGSVGElement> => {
  const mapRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!mapRef.current) return noop

    const mouseMoveEventHandler = getMouseEventHandler(mapRef.current, eventHandlers.mousemove)
    mapRef.current?.addEventListener('mousemove', mouseMoveEventHandler)

    const clickEventHandler = getMouseEventHandler(mapRef.current, eventHandlers.click)
    mapRef.current?.addEventListener('click', clickEventHandler)

    return () => {
      mapRef.current?.removeEventListener('mousemove', mouseMoveEventHandler)
      mapRef.current?.removeEventListener('click', clickEventHandler)
    }
  }, [])

  return mapRef
}

export default useSvgMouseEventCoordinates
