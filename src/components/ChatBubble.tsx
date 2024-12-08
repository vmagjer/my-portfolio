import AvatarImage from './AvatarImage'
import { ReactNode } from 'react'
import styled from 'styled-components'

type ChatBubbleProps = {
  children?: ReactNode
  avatarSrc: string
  avatarPosition?: 'left' | 'right'
  name: string
}
export default function ChatBubble({
  children,
  avatarSrc,
  avatarPosition = 'left',
  name,
}: ChatBubbleProps) {
  const isReversedOrientation = avatarPosition === 'right'
  return (
    <Root $reverse={isReversedOrientation}>
      <AvatarImage src={avatarSrc} size="medium" />

      <BubbleGroup $reverse={isReversedOrientation}>
        <Info $reverse={isReversedOrientation}>
          <Identificator>{name}</Identificator>
          <TimeTag>A minute ago</TimeTag>
        </Info>
        {children}
        </BubbleGroup>
    </Root>
  )
}

const Root = styled.div<{ $reverse: boolean }>`
  display: flex;
  height: fit-content;
  /* flex-direction: ${(props) => (props.$reverse ? 'row-reverse' : 'row')}; */
  gap: 0.5rem;
  position: relative;

  ${(props) => (props.$reverse ? 'img{opacity:0;}' : '')}

  img {
    position: sticky;
    bottom: 4px;
    align-self: flex-end;
  }
`
const BubbleGroup = styled.div<{ $reverse: boolean }>`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    margin: 0;
    background-color: ${(props) => (props.$reverse ? '#2a41b4' : '#adc4e6')};
    color: ${(props) => (props.$reverse ? '#fff' : '#000')};
    align-self: ${(props) => (props.$reverse ? 'flex-end' : 'flex-start')};

    border-radius: 8px;
    max-width: 80ch;

    z-index: 10;
    padding: 0.5rem 0.75rem;

    &:last-of-type {
      ${(props) =>
        props.$reverse
          ? 'border-bottom-right-radius: 0;'
          : 'border-bottom-left-radius: 0;'};
      &::before {
        content: '';
        z-index: 1;
        position: absolute;
        bottom: 0;

        left: ${(props) => (props.$reverse ? '100%' : '0')};
        transform: ${(props) =>
          props.$reverse ? 'translateX(-58%) scaleX(-1);' : 'translateX(-42%) '};

        width: 24px;
        height: 20px;
        clip-path: polygon(0 100%, 100% 100%, 50% 20%);
        clip-path: path('M 1 19 C 5 18 9.467 14.396 10 10 H 16 V 20 H 1 C 0 20 0.012 19.283 1 19 Z');
        mask-size: contain;
        background-color: inherit;
      }
    }
  }
`
const Info = styled.div<{ $reverse: boolean }>`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  align-self: ${(props) => (props.$reverse ? 'flex-end' : 'flex-start')};

  color: rgb(131, 131, 131);
`

const Identificator = styled.div`
  
`
const TimeTag = styled.div`
  
`