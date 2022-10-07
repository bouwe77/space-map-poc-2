import { Coordinate } from './types'

interface Spaceship {
  name: string
  position: Coordinate
}

const spaceship: Spaceship = {
  name: 'dummy',
  position: { x: 100, y: 100 },
}

/**
 * Returns the current user's spaceship.
 */
const useSpaceship = () => {
  return spaceship
}

export default useSpaceship
