import { ThemeContext } from './ThemeContext'
import styled from 'styled-components'
import { useContext } from 'react'

function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Root $checked={theme === 'dark'}>
      <HiddenInput type="checkbox" onChange={toggleTheme} />
      <IconContainer $checked={theme === 'dark'}>
        <span className="material-symbols-outlined">dark_mode</span>
        <span className="material-symbols-outlined">light_mode</span>
      </IconContainer>
    </Root>
  )
}

export default ThemeSwitch
const Root = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;

  cursor: pointer;
  border-radius: 10000px;
`

const HiddenInput = styled.input`
  display: none;
`
const IconContainer = styled.div<{ $checked: boolean }>`
  width: 40px;
  height: 40px;

  overflow: hidden;

  user-select: none;
  -webkit-user-select: none;

  transition: background 0.1s ease-in-out, color 0.1s ease-in-out;

  span {
    width: 100%;
    height: 100%;

    top: ${({ $checked }) => ($checked ? '0' : '-100%')};

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    transition: top 0.2s ease-in-out;
  }

  &:hover {
    background-color: var(--primary-200);
  }
`
