import Container from './Container'
import Hyperlink from '../Hyperlink'
import styled from 'styled-components'

export default function Footer() {
  return (
    <Root>
      <Wrapper>
        <SiteMap>
          <ul>
            {/* <li>
              <Hyperlink link="" onDark>Start</Hyperlink>
            </li> */}
            <li>
              <Hyperlink link='#about' onDark>About</Hyperlink>
            </li>
            <li>


              
            </li>

            <li>
              <Hyperlink link="#contact" onDark>Contact</Hyperlink>
            </li>
          </ul>
        </SiteMap>
        <LegalInfo>
          <FooterItem>© 2025 Vlatko Magjer</FooterItem>
          <FooterItem>
            Icons by &nbsp;
            <Hyperlink link="https://icons8.com" external onDark>
              Icons8
            </Hyperlink>
          </FooterItem>
        </LegalInfo>
      </Wrapper>
    </Root>
  )
}
const Root = styled(Container)`
  background-color: var(--footer-surface);
  color: var(--shell-text);
  padding: 0 16px;
`

const Wrapper = styled.footer`
  padding-top: 32px;
  padding-bottom: 8px;
`
const SiteMap = styled.div`
  margin-bottom: 40px;

  ul {
    padding: 0;

    ul {
      padding-left: 1rem;
    }
  }

  li {
    list-style: none;
  }
`

const LegalInfo = styled.div`
  padding: 8px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
const FooterItem = styled.div`
  margin-bottom: 0rem;
  font-size: 0.75rem;
`
