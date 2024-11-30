import ChatBubble from '../../components/ChatBubble'
import Container from '../../components/layout/Container'
import profileImage from '../../assets/images/profile-picture-happy.jpg'
import styled from 'styled-components'

type ContactSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function ContactSection({ ...rest }: ContactSectionProps) {
  return (
    <Container {...rest}>
      <Wrapper>
        <ChatBubble avatarSrc={profileImage} avatarPosition="right">
          <p>
            Hey can we get in <h2>Contact</h2> about an opportunity for you?
          </p>
        </ChatBubble>
        <ChatBubble avatarSrc={profileImage} avatarPosition="left">
          <p>Sure! I&apos;d love to hear more about it.</p>
        </ChatBubble>
        <ChatBubble avatarSrc={profileImage} avatarPosition="right">
          <p>It&apos;s cool, fresh, innovative and the team is passionate.</p>
        </ChatBubble>
        <ChatBubble avatarSrc={profileImage} avatarPosition="left">
          <p>Sounds awesome! Let&apos;s get in touch.</p>
          <p>
            Send me a message at my:
            <ul>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Discord</li>
              <li>Github</li>
            </ul>
          </p>
        </ChatBubble>
      </Wrapper>
    </Container>
  )
}

export default ContactSection

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem 1rem 2rem 0.75rem;

  h2 {
    margin: 0;
  }
`