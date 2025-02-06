// import ThemeSwitch from '../../features/theme/ThemeSwitch'

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
      <LeftContainer></LeftContainer>
      <RightContainer>{/* <ThemeSwitch /> */}</RightContainer>
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
  padding: 0px 16px;

  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(to bottom, var(--neutral-200), transparent);
  backdrop-filter: blur(16px);
  color: var(--shell-text);

  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */
  display: flex;
  gap: 0px;
  flex-wrap: wrap;

  /* @media (min-width: 1100px) { */
    top: 0px;
    flex-direction: row;
    justify-content: space-between;
  /* } */
`

const CenterContainer = styled.div`
  height: 40px;
  flex-basis: 1000px;
  max-width: 1000px;

  @media (min-width: 1100px) {
    order: 2;
  }
`

const NavList = styled.div`
  height: 100%;

  display: flex;
  gap: 32px;

  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
`

const NavItem = styled.button`
  border: none;
  padding: 0px;

  font-size: 0.875rem;
  cursor: pointer;

  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  color: var(--color-button-default-text);
  background: transparent;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 150%;
    height: 100%;
    background: radial-gradient(
      circle farthest-side at 50% 100%,
      var(--neutral-800) 0%,
      transparent 70%
    );

    transition: opacity 500ms ease;
    opacity: 0;
  }

  &:hover {
    color: var(--color-button-hover-text);
    /* background: radial-gradient(
      circle at bottom,
      var(--color-button-hover-bg) 0%,
      transparent 70%
    ); */
    border-bottom: 1px solid var(--neutral-500);
    &::before {
      opacity: 0.3;
    }
  }

  &:active {
    color: var(--color-button-active-text);
    /* background: radial-gradient(
      circle,
      var(--color-button-active-bg) 0%,
      transparent 70%
    ); */

    border-bottom: 1px solid var(--neutral-400);
    &::before {
      opacity: 0.5;
    }
  }

  &[data-active='true'] {
    color: var(--color-button-active-text);
    /* background: radial-gradient(
      circle at bottom,
      var(--color-button-active-bg) 0%,
      transparent 70%
    ); */

    border-bottom: 1px solid var(--neutral-500);
    &::before {
      opacity: 0.5;
    }
  }
`
const LeftContainer = styled.div`
  /* height: 40px; */
  flex: 1;
  display: flex;
  align-items: center;

  @media (min-width: 1100px) {
    order: 1;
  }
`
const RightContainer = styled.div`
  /* height: 40px; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;

  @media (min-width: 1100px) {
    order: 3;
  }
`
