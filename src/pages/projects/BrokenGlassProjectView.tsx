import styled from "styled-components"
import BrokenGlassMenu from "../../components/BrokenGlassMenu"
import useWindowSize from "../../utils/useWindowResize"

export const BrokenGlassProjectView = () => {
  const windowSize = useWindowSize()

  return (
    <Container>
      <BrokenGlassMenu width={windowSize.width} height={windowSize.height}/>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
