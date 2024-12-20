import Container from './Container'
import Hyperlink from '../Hyperlink'
import styled from 'styled-components'

export default function Footer() {
  return (
    <Root>
      <Wrapper>
        <SiteMap>
          <ul>
            <li>
              <Hyperlink link="" onDark>Start</Hyperlink>
            </li>
            <li>
              <Hyperlink link="" onDark>About</Hyperlink>
            </li>
            {/* <li> */}
            <li>Portfolio</li>
              <ul>
                <li>
                  <Hyperlink link="" onDark>Projects</Hyperlink>
                </li>
                <li>
                  <Hyperlink link="" onDark>Background</Hyperlink>
                </li>
              </ul>
            {/* </li> */}

            <li>
              <Hyperlink link="" onDark>Contact</Hyperlink>
            </li>
          </ul>
        </SiteMap>
        <LegalInfo>
          <FooterItem>Made by Vlatko Magjer</FooterItem>
          <FooterItem>
            Icons by &nbsp;
            <Hyperlink link="https://icons8.com" isExternal onDark>
              Icons8
            </Hyperlink>
          </FooterItem>
        </LegalInfo>
      </Wrapper>
    </Root>
  )
}
const Root = styled(Container)`
  background-color: #151517;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 16px;
`

const Wrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 8px;
`
const SiteMap = styled.div`
margin-bottom: 16px;

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
