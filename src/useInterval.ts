import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<(() => void) | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (!savedCallback.current) return
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
