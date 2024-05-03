import styled from "styled-components"
import BrokenGlassMenu from "../../components/BrokenGlassMenu"
import { useEffect, useState } from "react"

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      console.log(windowSize)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

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
