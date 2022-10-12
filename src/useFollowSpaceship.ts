import { useEffect } from 'react'
import { noop } from './Map'
import { useMap } from './MapService'
import { useSpaceships } from './useSpaceships'

const useFollowSpaceship = () => {
  const spaceships = useSpaceships()
  const { followingSpaceshipName, followingSpaceshipMoved } = useMap()

  useEffect(() => {
    if (!followingSpaceshipName) return
    const spaceship = spaceships.find((s) => s.name === followingSpaceshipName)
    if (!spaceship) return noop
    followingSpaceshipMoved(spaceship)
  }, [followingSpaceshipName, spaceships, followingSpaceshipMoved])
}

export default useFollowSpaceship
