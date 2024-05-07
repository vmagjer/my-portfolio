import styled from "styled-components"
import DigitalRain from "../../components/DigitalRain"

export const DigitalRainProjectView = () => {
  return (
    <Container>
      <DigitalRain text="Broken Glass" layers={3} />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
