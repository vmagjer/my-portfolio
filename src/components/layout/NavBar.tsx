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
      <LeftContainer className="quicksand">Vlatko Magjer</LeftContainer>
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
        {/* <LanguageSelect name="language" id="">
          <option value="HR">HR</option>
          <option value="EN">EN</option>
        </LanguageSelect> */}
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

  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */

  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
`

const CenterContainer = styled.div`
  flex-basis: 800px;
  max-width: 800px;
  /* @media (min-width: 1100px) {

  } */
`

const NavList = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 1100px) {
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
  }
`

const NavItem = styled.button<{ $active: boolean }>`
padding: 8px 12px;

border: none;
border-radius: 4px;

${({ $active }) =>
    $active
      ? 'color: #fff; background: var(--primary-300);'
      : 'color: #fff; background: transparent;'};

font-size: 0.75rem;
cursor: pointer;

transition: all 0.2s ease-in-out;

&:hover {
  ${({ $active }) =>
      $active ? '' : 'color: #fff; background: var(--primary-200);'};
  }
  
  @media (min-width: 1100px) {
    padding: 8px 16px;
  }
`
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 1100px) {
    display: none;
  }
`
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`
