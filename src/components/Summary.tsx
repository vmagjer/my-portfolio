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

export default function Summary({ items }: Props) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items])
  const { activeSection, scrollToSection } = useActiveSection(sectionIds)

  return (
    <Container>
      {items.map((item) => (
        <SummaryItem
          key={`summary-item-${item.id}`}
          $active={activeSection === item.id}
          onClick={() => scrollToSection(item.id)}
        >
          <span>{item.title}</span>
        </SummaryItem>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  overflow-x: auto;

  padding: 0.5rem 1rem;
  gap: 0.5rem;

  /* background: #000; */
`

const SummaryItem = styled.button<{ $active: boolean }>`
  padding: 8px;

  font-size: 0.75rem;
  color: ${({ $active }) => ($active ? '#0073e6' : '#333')};
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(20px);
  transform: translateY(${({ $active }) => ($active ? '+4px' : '0')});

  border: none;
  border-radius: 4px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0px 8px 4px -8px rgba(255, 255, 255, 0.5),
    inset 0px -6px 4px -8px rgba(0, 0, 0, 0.5);

  cursor: pointer;

  transition: background 0.3s, color 0.3s, transform 0.3s;
  &:hover {
    background: rgba(0, 115, 230, 0.1);
    color: #0073e6;
  }
`
