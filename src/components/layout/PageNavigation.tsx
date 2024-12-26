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

export default function PageNavigation({ items }: Props) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items])
  const { activeSection, scrollToSection } = useActiveSection(sectionIds)

  return (
    <Root>
      <Container>
        <NavList>
          {items.map((item) => (
            <NavItem
              key={`summary-item-${item.id}`}
              $active={activeSection === item.id}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.title}</span>
            </NavItem>
          ))}
        </NavList>
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

  @media (min-width: 1100px) {
    background: none;
    border: none;
    top: 50%;
    left: unset;
    right: 0;
    transform: translateY(-50%);
  }
`

const NavList = styled.div`
  padding: 0.5rem 1rem;
  gap: 6px;

  display: flex;
  flex-direction: row;

  @media (min-width: 1100px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

const NavItem = styled.button<{ $active: boolean }>`
  padding: 0.5rem;

  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${({ $active }) =>
    $active
      ? 'color: #fff; background:#476ed1'
      : 'color: #fff; background: #555'};

  font-size: 0.75rem;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  ${({ $active }) =>
    $active ? 'transform: translateY(8px);' : 'transform: translateY(0px);'}

  flex:1;
  @media (min-width: 1100px) {
    text-align: right;

    ${({ $active }) =>
      $active ? 'transform: translateX(-8px);' : 'transform: translateX(0px);'}

    padding: 0.5rem 2rem;
  }
`
