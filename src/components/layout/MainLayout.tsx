import Footer from './Footer'
import styled from 'styled-components'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Root>
      {children}
      <Footer />
    </Root>
  )
}

const Root = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`
