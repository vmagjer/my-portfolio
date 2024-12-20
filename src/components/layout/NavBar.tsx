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
      <LeftContainer className='quicksand'>Vlatko Magjer</LeftContainer>
      <CenterContainer>
        <NavList>
          {items.map((item) => (
            <NavItem
              key={`nav-item-${item.id}`}
              $active={activeSection === item.id}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.title}</span>
            </NavItem>
          ))}
        </NavList>
      </CenterContainer>
      <RightContainer>
        <LanguageSelect name="language" id="">
          <option value="HR">HR</option>
          <option value="EN">EN</option>
        </LanguageSelect>
      </RightContainer>
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  background: var(--primary-100);
  color: #fff;

  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
`

const CenterContainer = styled.div`
  flex-basis: 800px;
  max-width: 800px;
`

const NavList = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

`

const NavItem = styled.button<{ $active: boolean }>`
  padding: 8px 16px;

  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${({ $active }) =>
    $active
      ? 'color: #fff; background:#476ed1'
      : 'color: #fff; background: #555'};

  font-size: 0.75rem;
  cursor: pointer;

  /* box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1),
    inset 0px 8px 2px -8px rgba(255, 255, 255, 0.5),
    inset 0px -6px 2px -5px rgba(0, 0, 0, 0.5); */

  transition: all 0.2s ease-in-out;

  /* ${({ $active }) =>
    $active ? 'transform: translateY(8px);' : 'transform: translateY(0px);'} */
`
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`
const LanguageSelect = styled.select`
  border: none;
  background: #151517;

  option {
    background: none;
  }
`
