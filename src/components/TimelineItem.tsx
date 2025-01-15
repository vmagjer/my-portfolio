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
        <MarkerContainer>
          <Marker $reverse={reverse} $color={color}>
            <img src={image} alt="" />
          </Marker>
        </MarkerContainer>
      </Line>

      <Content $reverse={reverse}>
        <DateStamp className="date">{date}</DateStamp>
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

  display: flex;
  gap: 12px;
  padding: 0 0 36px 32px;

  @media (min-width: 1100px) {
    ${({ $reverse }) => ($reverse ? 'padding: 0 32px 16px 0;' : '')}
    padding-bottom: 16px;
  }
`

const extraLineLength = 20
const Line = styled.div<{ $reverse?: boolean }>`
  position: absolute;
  left: 0;
  top: -${extraLineLength}px;
  transform: translateX(-50%);

  width: 4px;
  height: calc(100% + ${extraLineLength}px);
  background: var(--neutral-500);

  @media (min-width: 1100px) {
    ${({ $reverse }) =>
      $reverse ? 'left: 100%; transform: translateX(-50%);' : ''}
  }
`

const MarkerContainer = styled.div`
  position: relative;
  top: ${extraLineLength}px;
  transform: translateX(calc(-25px + 2px));
  height: calc(100% - 36px);
`

const Marker = styled.div<{ $color: string; $reverse?: boolean }>`
  position: sticky;
  top: 56px;
  transform: translateY(-6px);

  img {
    position: relative;
    top: 0px;

    width: 50px;
    height: 50px;
    border: 6px solid var(--section-surface);
    border-radius: 50%;

    background-color: ${(props) => props.$color ?? '#000'};
    padding: 0px;
    object-fit: contain;
  }

  &::before {
    box-sizing: border-box;
    content: '';
    z-index: 2;

    position: absolute;
    left: calc(50px - 1px);
    top: 50%;

    transform: translateY(-50%);

    width: 8px;
    height: 16px;
    clip-path: polygon(0 50%, 100% 0%, 100% 100%);

    background: var(--card-surface);

    @media (min-width: 1100px) {
      ${({ $reverse }) =>
        $reverse ? 'left: -7px; transform: translateY(-50%) scaleX(-1);' : ''}
    }
  }
`

const Content = styled.div<{ $reverse?: boolean }>`
  max-width: 50ch;
  padding: 14px 14px;
  border-radius: 0.25rem;
  position: relative;

  background-color: var(--card-surface);
  color: var(--color-body);

  > p {
    &:first-of-type {
      margin-top: 0.4rem;
    }
  }
  h3 {
    margin-top: 0.25rem;
    color: var(--color-title);
  }

  ul {
    padding-left: 16px;
  }
  details {
    margin-top: 0.75rem;

    summary {
      cursor: pointer;
      &:hover {
        background-color: #476ed11b;
      }
    }
  }
`

const DateStamp = styled.div`
  color: var(--color-subtitle);
`
