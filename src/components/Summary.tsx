import styled from 'styled-components'
import useActiveSection from '../utils/useActiveSection'
import { useMemo } from 'react'
export type Section = {
  id: string
  title: string
}

type Props = {
  items: Section[]
}

function Summary({ items }: Props) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items])
  const { activeSection, scrollToSection } = useActiveSection(sectionIds)

  return (
    <Container className="summary">
      {items.map((item, index) => (
        <SummaryItem
          key={`summary-item-${item.id}`}
          className="summary-item"
          $active={activeSection === item.id}
          onClick={() => scrollToSection(item.id)}
        >
          <span>{index}</span>
          <span>{item.title}</span>
        </SummaryItem>
      ))}
    </Container>
  )
}

export default Summary

const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  padding: 20px;

  background: rgba(000 000 000 / 0.3);
  backdrop-filter: blur(5px);
`

const SummaryItem = styled.button<{ $active: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  color: white;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
  border: none;
  cursor: pointer;
`
