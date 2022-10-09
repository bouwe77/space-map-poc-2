import { useMap } from './MapService'

const ArrowKeys = () => {
  const { move } = useMap()

  return (
    <>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => move('up')}>^</button>
      <br /> <button onClick={() => move('left')}>&lt;</button>
      <button onClick={() => move('right')}>&gt;</button>
      <br />
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => move('down')}>v</button>
    </>
  )
}

export default ArrowKeys
