import { Coordinate, Spaceship } from './types'

const spaceship: Spaceship = {
  name: 'dummy',
  position: { x: 100, y: 100 },
  color: 'red',
}

/**
 * Returns the current user's spaceship.
 */
const useSpaceship = () => {
  return spaceship
}

export default useSpaceship
