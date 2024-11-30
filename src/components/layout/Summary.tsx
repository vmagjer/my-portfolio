import Container from './Container'
import styled from 'styled-components'
import useActiveSection from '../../utils/useActiveSection'
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
    <Root>
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
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  overflow-x: auto;

  padding: 0.5rem 1rem;

  background: rgb(0, 0, 0);
  /* backdrop-filter:  saturate(1.5) brightness(1.5) blur(20px); */
  border-bottom: 1px solid #ffffff65;

  /* box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1),
    inset 0px -6px 2px -5px rgba(0, 0, 0, 0.5); */
`

const SummaryItem = styled.button<{ $active: boolean }>`
  padding: 0.5rem;
  margin-right: 0.25rem;

  font-size: 0.75rem;
  color: ${({ $active }) => ($active ? '#fff' : '#fff')};
  background: ${({ $active }) => ($active ? '#476ed14f' : 'transparent')};

  border: none;
  border-radius: 4px;

  /* box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1),
    inset 0px 8px 2px -8px rgba(255, 255, 255, 0.5),
    inset 0px -6px 2px -5px rgba(0, 0, 0, 0.5); */

  cursor: pointer;
`
