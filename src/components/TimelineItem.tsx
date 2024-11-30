import { ReactNode } from 'react'
import styled from 'styled-components'

type TimelineItemProps = {
  image?: string
  date: string
  color?: string
  noPadding?: boolean
  className?: string
  children: ReactNode
}

const TimelineItem = ({
  image,
  date,
  color,
  noPadding,
  children,
  className,
}: TimelineItemProps) => {
  return (
    <TimelineItemContainer
      className={className}
      color={color}
      noPadding={noPadding}
    >
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <div className="date">{date}</div>
      <div className="content">{children}</div>
    </TimelineItemContainer>
  )
}
export default TimelineItem

const TimelineItemContainer = styled.div<{
  color?: string
  noPadding?: boolean
}>`
  position: relative;

  .date {
    padding: 0.75rem 0.75rem;
  }
  .content {
    max-width: 60ch;
    padding: 0.75rem;
    background-color: white;
    border-radius: 0.25rem;
    > * {
      margin-bottom: 0.5rem;
    }
  }

  .image-container {
    width: 40px;
    height: 40px;

    border-radius: 100%;
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    justify-items: center;

    background-color: ${(props) => props.color ?? '#000'};

    padding: 8px;
    padding: ${(props) => (props.noPadding ? '4px' : '8px')};

    border: 4px solid #b7b7b7;

    position: absolute;
    top: 0px;
    left: calc(-0.75rem + -1px);

    transform: translateX(-50%);

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`
