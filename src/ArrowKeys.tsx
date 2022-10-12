import { useMap } from './MapService'

const ArrowKeys = () => {
  const { movePin } = useMap()

  return (
    <>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => movePin('up')}>^</button>
      <br /> <button onClick={() => movePin('left')}>&lt;</button>
      <button onClick={() => movePin('right')}>&gt;</button>
      <br />
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => movePin('down')}>v</button>
    </>
  )
}

export default ArrowKeys
