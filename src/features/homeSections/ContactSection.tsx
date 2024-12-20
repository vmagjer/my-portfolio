import Container from '../../components/layout/Container'
import Hyperlink from '../../components/Hyperlink'
import data from '../../assets/data'
import profileImage from '../../assets/images/profile-picture-happy.jpg'
import styled from 'styled-components'

type ContactSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function ContactSection({ ...rest }: ContactSectionProps) {
  return (
    <Root {...rest}>
      <Wrapper>
        <div>
          <ul>
            {data.contactInfo.map((ci) => (
              <li key={ci.name}>
                <ContactItem link={ci.link} isExternal onDark>
                  <img src={ci.image} alt="" />
                  {ci.text}
                </ContactItem>
              </li>
            ))}
          </ul>
        </div>
        <AvatarWithBuble>
          <Bubble>
            <p>Give me a holler!</p>
          </Bubble>
          <img  src={profileImage} />
        </AvatarWithBuble>
      </Wrapper>
    </Root>
  )
}

export default ContactSection

const Root = styled(Container)`
  background-color: #27272e;
  color: white;
  
  padding: 0 16px;
`

const Wrapper = styled.section`
  position: relative;

  padding: 32px 0px 48px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h2 {
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 12px;
  }
`

const ContactItem = styled(Hyperlink)`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 2rem;
    height: 2rem;
  }
`

const AvatarWithBuble = styled.div`
  position: absolute;
  top: -20px;
  right: 0;

  display: flex;
  align-items: start;
  gap: 8px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    
    
    @media (min-width: 1100px) {
      width: 200px;
      height: 200px;
      
    }
  }
`
const Bubble = styled.div`
  /* position: absolute;
  top: -20px;
  left: 0; */
  position: relative;

  background: #151517;
  border-radius: 10000px;

  padding: 8px 16px;

  /* display: flex;
  justify-content: center;
  align-items: center; */

  p {
    margin: 0;
    opacity: 80%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;

    transform: translateX(90%) translateY(40%) rotateZ(200deg) scale(1.5);

    width: 19px;
    height: 20px;
    clip-path: polygon(0 100%, 100% 100%, 50% 20%);
    clip-path: path(
      'M 1 14 C 3 14 11 13 19 9 V 20 C 11 16 3 15 1 15 C 0 15 0 14 1 14 Z'
    );
    mask-size: contain;
    background-color: inherit;
    /* background-color: green; */
  }
`
