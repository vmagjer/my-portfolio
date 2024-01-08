import './Building.css'

const Building = ({ style, layer }) => {
  const NUM_WINDOWS = 30

  const generateWindows = () => {
    return new Array(NUM_WINDOWS).fill(0, 0, NUM_WINDOWS).map((_, i) => (
      <div className="window" key={i}>
        {" "}
        .
      </div>
    ))
  }

  return (
    <div className="building" style={style} data-layer={layer}> 
      {/* {generateWindows()} */}
      {/* <div className="text">Scroll down</div> */}
    </div>
  )
}

export default Building
