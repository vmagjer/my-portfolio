import styled from 'styled-components'
import { useState } from 'react'

type CourseGroup = {
  title: string
  color: string
  courses: string[]
}

type CourseworkProps = {
  items: CourseGroup[]
}

const CourseListGroup = ({
  group,
  expanded,
}: {
  group: CourseGroup
  expanded: boolean
}) => (
  <>
    <Chip $color={group.color} $size="medium">
      {group.title}
    </Chip>

    {group.courses.map((c) => (
      <Chip
        $color={`hsl(from ${group.color} h calc(0.2 * s) calc(0.7 * l))`}
        $size="small"
        $hidden={!expanded}
        key={`${group.title}-${c}`}
      >
        {c}
      </Chip>
    ))}
  </>
)

function CourseList({ items }: CourseworkProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const toggleIsExpanded = () => setIsExpanded((prev) => !prev)
  return (
    <Root>
      <Content>
        {items.map((group) => (
          <CourseListGroup
            group={group}
            key={group.title}
            expanded={isExpanded}
          />
        ))}
      </Content>
      <ExpandButton onClick={toggleIsExpanded}>
        {isExpanded ? 'Hide courses' : 'View courses'}
      </ExpandButton>
    </Root>
  )
}

export default CourseList

const Root = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Content = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 !important;
`
const Chip = styled.li<{
  $color?: string
  $size: 'small' | 'medium'
  $hidden?: boolean
}>`
  list-style: none;
  display: inline-block;
  flex-shrink: 1;

  padding: 4px 16px;
  border-radius: 16px;

  ${(props) =>
    props.$size === 'small'
      ? 'color: rgb(from currentcolor r g b / 0.75);'
      : ''}
  ${(props) => (props.$size === 'small' ? 'color: var(--color-subtitle);' : '')}
  
  
  transition: all  0.5s ease;
  ${(props) =>
    props.$hidden ? 'opacity: 0; padding: 0; width: 0; height: 0; display: none;' : ''}

  background-color: var(--card-chip-surface);
  background-color: ${(props) => props.$color};
`
const ExpandButton = styled.button`
  align-self: flex-end;
  border: none;
  background: none;
  color: var(--color-link);
`
