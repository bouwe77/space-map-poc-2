import { useMap } from './MapService'
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

const useSpaceships = (): Spaceship[] => {
  return spaceships
}

export const Spaceships = () => {
  const spaceships = useSpaceships()
  const { followSpaceship, unfollowSpaceship } = useMap()

  return (
    <div>
      {spaceships.map((spaceship) => (
        <div key={spaceship.name}>
          <button
            onClick={() => followSpaceship(spaceship)}
            style={{ color: spaceship.color }}
          >
            {spaceship.name}
          </button>
          <br />
        </div>
      ))}
      <button onClick={unfollowSpaceship}>unfollow</button>
    </div>
  )
}
