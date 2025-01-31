import { useRef, useState } from 'react'

import styled from 'styled-components'

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
}: {
  group: CourseGroup
  expanded: boolean
}) => (
  <li>
    <b>{group.title}</b>
    <ul>
      {group.courses.map((c) => (
        <li key={`${group.title}-${c}`}>{c}</li>
      ))}
    </ul>
  </li>
)

function CourseList({ items }: CourseworkProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const toggleIsExpanded = useRef(() => setIsExpanded((prev) => !prev))

  return (
    <Root>
      <ExpandButton onClick={toggleIsExpanded.current}>
        <span className="label">
          {isExpanded ? 'Hide courses' : 'View courses'}
        </span>
        <span className="material-symbols-outlined">
          {isExpanded ? 'expand_less' : 'expand_more'}
        </span>
      </ExpandButton>
      <Content $isExpanded={isExpanded}>
        {items.map((group) => (
          <CourseListGroup
            group={group}
            key={group.title}
            expanded={isExpanded}
          />
        ))}
      </Content>
    </Root>
  )
}

export default CourseList

const Root = styled.div`
  margin: 0;
`
function getExpandedHeight(isExpanded: boolean) {
  return isExpanded ? '1000px' : '0'
}
const Content = styled.ul<{ $isExpanded: boolean }>`
  margin: 0;
  margin-top: 0.25rem;

  transition: max-height 500ms ease;
  overflow: hidden;

  max-height: ${(props) => getExpandedHeight(props.$isExpanded)};
`

const ExpandButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: var(--color-link);

  display: flex;
  align-items: center;

  margin-top: 0.5rem;
  padding: 4px 0;

  &:hover {
    .label {
      text-decoration: underline;
    }
  }
`
