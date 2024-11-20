import { ReactNode } from 'react'
import styled from 'styled-components'

type TimelineProps = {
  children: React.ReactNode
}
export default function Timeline({ children }: TimelineProps) {
  return (
    <TimeLineRoot>
      <Line />
      <List>{children}</List>
    </TimeLineRoot>
  )
}
const TimeLineRoot = styled.div`
  display: flex;
  align-content: stretch;
  gap: 16px;
  padding: 16px;
`
const Line = styled.div`
  width: 2px;
  border-radius: 10000px;
  background: #646464;
`

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const TimelineItem = ({image, date, children, className}:{image?: string, date: string, children: ReactNode, className?: string})=>{
  return (
    <TimelineItemContainer image={image} className={className}>
      <div className="date">{date}</div>
      <div className="content">{children}</div>
    </TimelineItemContainer>
  )
}
export const TimelineItemContainer = styled.div<{image?: string}>`
  position: relative;
  
  .date {
    padding: .5rem;
  }
  .content {
    padding: .5rem;
    background-color: white;
  }

  &::before {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    background-color: #646464;

    background-image: url(${props => props.image});
    background-size: cover;

    border: 2px solid #b0bfbf;
    
    position: absolute;
    left: -17px;
    top: 0.25rem;
    transform: translateX(-50%);
  }
`
