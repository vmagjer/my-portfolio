import DigitalRain from "../../components/DigitalRain"
import styled from "styled-components"

export const DigitalRainProjectView = () => {
  return (
    <Root>
      <DigitalRain text="DIGITAL RAIN PARTICLES" layers={2} />
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
