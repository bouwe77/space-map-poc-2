import { Spaceship } from './types'

const spaceships = [
  {
    name: 'Enterprise',
    position: { x: 0, y: 0 },
    color: 'red',
  },
  {
    name: 'Defiant',
    position: { x: 320, y: 120 },
    color: 'blue',
  },
  {
    name: 'Voyager',
    position: { x: 120, y: 130 },
    color: 'green',
  },
]

/**
 * Returns all spaceships.
 */
export const useSpaceships = (): Spaceship[] => {
  return spaceships
}

/**
 * Returns the current user's spaceship.
 */
export const useSpaceship = () => {
  return spaceships[0]
}
