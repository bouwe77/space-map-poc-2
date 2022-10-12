import { useState } from 'react'
import { Spaceship } from './types'
import useInterval from './useInterval'

const move = (spaceship: Spaceship) => {
  const moveIt = {
    Defiant: (spaceship: Spaceship) => {
      return { ...spaceship, position: { ...spaceship.position, x: spaceship.position.x + 10 } }
    },
    Voyager: (spaceship: Spaceship) => {
      return { ...spaceship, position: { x: spaceship.position.x - 10, y: spaceship.position.y + 10 } }
    },
  }
  return spaceship.name in moveIt ? moveIt[spaceship.name](spaceship) : () => spaceship
}

const initialSpaceships = [
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
  const [spaceships, setSpaceships] = useState(initialSpaceships)

  useInterval(() => {
    setSpaceships(
      spaceships.map((s) => {
        return { ...s, ...move(s) }
      }),
    )
  }, 1000)

  return spaceships
}

/**
 * Returns the current user's spaceship.
 */
export const useSpaceship = () => {
  return initialSpaceships[0]
}
