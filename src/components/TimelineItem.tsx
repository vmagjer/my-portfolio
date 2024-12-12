import AvatarImage from './AvatarImage'
import { ReactNode } from 'react'
import styled from 'styled-components'

type TimelineItemProps = {
  title: string
  image: string
  color: string
  date: string
  children: ReactNode
  noPadding?: boolean
  className?: string
  reverse?: boolean
}

const TimelineItem = ({
  title,
  image,
  color,
  date,
  children,
  noPadding,
  className,
  reverse,
}: TimelineItemProps) => {
  return (
    <Root className={className} noPadding={noPadding} $reverse={reverse}>
      <Line $reverse={reverse}>
        <TimelineMarker $color={color} $reverse={reverse}>
          <AvatarImage size="semi" src={image} />
          <div className="date">{date}</div>
        </TimelineMarker>
      </Line>

      <Content>
        <h3>{title}</h3>
        {children}
      </Content>
    </Root>
  )
}
export default TimelineItem

const Root = styled.div<{
  noPadding?: boolean
  $reverse?: boolean
}>`
  position: relative;

  padding: 0 0 3rem 1rem;

  @media (min-width: 1100px) {
    ${({ $reverse }) => ($reverse ? 'padding: 0 0.75rem 2rem 0;' : '')}
    padding-bottom: 3rem;
  }
`

const Line = styled.div<{ $reverse?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  width: 4px;
  border-radius: 10000px;
  background: #75777d;

  @media (min-width: 1100px) {
    ${({ $reverse }) => ($reverse ? 'right:-2px; left: unset;' : 'left:0;')}
  }
`

const TimelineMarker = styled.div<{ $color: string; $reverse?: boolean }>`
  position: absolute;
  top: calc((-16px - 0.75rem * tan(45deg)));
  left: 0;
  transform: translateX(-23px);

  display: flex;
  gap: 0rem;

  align-items: center;
  /* justify-items: center; */

  img {
    flex: 1;
    border: 6px solid #b5b2b7;
    background-color: ${(props) => props.$color ?? '#000'};
    padding: 0px;
    object-fit: contain;
  }

  .date {
    white-space: nowrap;
    transform: translateY(-0.55rem);
  }

  @media (min-width: 1100px) {
    /* gap: 0.25rem; */

    ${({ $reverse }) =>
      $reverse
        ? ''
        : 'flex-direction: row-reverse; transform: translateX(calc(-100% + 25px));'}

    .date {
      transform: translateY(0);
    }
  }
`

const Content = styled.div`
  max-width: 60ch;
  padding: 16px 12px;
  background-color: white;
  border-radius: 0.25rem;
  > p {
    &:first-of-type {
      margin-top: 0.4rem;
    }
  }
`
