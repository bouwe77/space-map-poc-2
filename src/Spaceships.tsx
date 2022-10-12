import useFollowSpaceship from './useFollowSpaceship'
import { useSpaceships } from './useSpaceships'

const Spaceships = () => {
  console.log('rerender SPACESHIPS...')

  const spaceships = useSpaceships()
  useFollowSpaceship()

  return (
    <>
      {spaceships.map((spaceship) => (
        <rect
          x={spaceship.position.x}
          y={spaceship.position.y}
          width={10}
          height={10}
          fill={spaceship.color}
          key={spaceship.name}
        />
      ))}
    </>
  )
}

export default Spaceships
