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
  gap: 0.75rem;
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
  gap: 1rem;
`