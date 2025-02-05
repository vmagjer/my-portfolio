import Container from '../../components/layout/Container'
import Hyperlink from '../../components/Hyperlink'
import data from '../../assets/data'
import styled from 'styled-components'

type ContactSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function ContactSection({ ...rest }: ContactSectionProps) {
  return (
    <Root {...rest}>
      <SectionTitle>Contact</SectionTitle>
      <Subtitle>Let&apos;s get in touch</Subtitle>
      <Wrapper>
        <ul>
          {data.contactInfo.map((ci) => (
            <li key={ci.name}>
              <ContactItem link={ci.link} onDark>
                {ci.icon}
                {ci.text}
              </ContactItem>
            </li>
          ))}
        </ul>
      </Wrapper>
    </Root>
  )
}

export default ContactSection

const Root = styled(Container)`
  background-color: var(--section-surface);
  color: white;

  padding: 32px 16px 48px;
`

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--color-title);

  margin: 0;
`

const Subtitle = styled.p`
  text-align: center;
  color: var(--color-subtitle);

  margin: 0;
  margin-bottom: 20px;
`

const Wrapper = styled.section`

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
    }
  }
`

const ContactItem = styled(Hyperlink)`
  display: flex;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
    fill: var(--color-body);

    margin-right: 12px;
  }
`
