import ThemeSwitch from '../../features/theme/ThemeSwitch'
import styled from 'styled-components'
import useActiveSection from '../../utils/useActiveSection'
import { useMemo } from 'react'

export type Section = {
  id: string
  title: string
}

type NavBarProps = {
  items: Section[]
}

export default function NavBar({ items }: NavBarProps) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items])
  const { activeSection, scrollToSection } = useActiveSection(sectionIds)

  return (
    <Root>
      <LeftContainer>Vlatko Magjer</LeftContainer>
      <RightContainer>
        <ThemeSwitch />
      </RightContainer>
      <CenterContainer>
        <NavList>
          {items.map((item) => (
            <NavItem
              key={`nav-item-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              data-active={activeSection === item.id}
            >
              <span>{item.title}</span>
            </NavItem>
          ))}
        </NavList>
      </CenterContainer>
    </Root>
  )
}

const Root = styled.div`
  position: sticky;
  top: -40px;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 8px 16px;

  background: var(--shell-surface);
  color: var(--shell-text);

  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  
  @media (min-width: 1100px) {
    top: 0px;
    flex-direction: row;
    justify-content: space-between;
  }
`

const CenterContainer = styled.div`
  flex-basis: 800px;
  max-width: 800px;

  
  @media (min-width: 1100px) {
    order: 2;
  }
`

const NavList = styled.div`
  height: 100%;
  
  display: flex;
  align-items: center;
  gap: 8px;
  

  @media (min-width: 1100px) {
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
  }
`

const NavItem = styled.button`
  padding: 8px 12px;

  border: none;
  border-radius: 4px;

  font-size: 0.75rem;
  cursor: pointer;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  color: var(--color-button-default-text);
  background: var(--color-button-default-bg);

  &:hover, &:focus {
    color: var(--color-button-hover-text);
    background: var(--color-button-hover-bg);
  }

  &:active {
    color: var(--color-button-active-text);
    background: var(--color-button-active-bg);
  }

  &[data-active='true'] {
    color: var(--color-button-active-text);
    background: var(--color-button-active-bg);
    
    &:hover {
      color: var(--color-button-active-text);
      background: var(--color-button-active-bg);
    }
  }

  @media (min-width: 1100px) {
    padding: 8px 16px;
  }
`
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 32px;
  
  @media (min-width: 1100px) {
    order: 1;
  }
`
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  height: 32px;
  
  @media (min-width: 1100px) {
    order: 3;
  }
`
