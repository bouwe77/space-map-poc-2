import { useMap } from './MapService'
import { useSpaceships } from './useSpaceships'

const SpaceshipButtons = () => {
  const spaceships = useSpaceships()
  const { followSpaceship, unfollowSpaceship, followingSpaceshipName } = useMap()

  return (
    <div>
      {spaceships.map((spaceship) => (
        <div key={spaceship.name}>
          <button onClick={() => followSpaceship(spaceship)} style={{ color: spaceship.color }}>
            {spaceship.name} {followingSpaceshipName === spaceship.name ? '✅' : null}
          </button>
          <br />
        </div>
      ))}
      <button onClick={unfollowSpaceship}>unfollow</button>
    </div>
  )
}

export default SpaceshipButtons
