import TimelineItem from './TimelineItem'
import styled from 'styled-components'

export type TimelineItemInfo = {
  title: string
  image: string
  color: string
  date: string
  content: React.ReactNode
}
type TimelineProps = {
  // children: React.ReactNode
  items: TimelineItemInfo[]
}
export default function Timeline({ items }: TimelineProps) {
  return (
    <TimeLineRoot>
      <List>
        {items.map((ti, i) => {
          if (i % 2 == 0) {
            return (
              <>
                <TimelineItem
                  key={ti.title}
                  title={ti.title}
                  image={ti.image}
                  color={ti.color}
                  date={ti.date}
                  reverse={true}
                >
                  {ti.content}
                </TimelineItem>
                <div></div>
              </>
            )
          } else {
            return (
              <>
                <div></div>
                <TimelineItem
                  key={ti.title}
                  title={ti.title}
                  image={ti.image}
                  color={ti.color}
                  date={ti.date}
                  reverse={false}
                >
                  {ti.content}
                </TimelineItem>
              </>
            )
          }
        })}
      </List>
    </TimeLineRoot>
  )
}
const TimeLineRoot = styled.div`
  display: flex;
  align-content: stretch;
  gap: 0.75rem;
`
const List = styled.div<{ isLeft?: boolean }>`
  padding-top: 25px;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`
