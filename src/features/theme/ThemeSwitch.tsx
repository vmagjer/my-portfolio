import { ThemeContext } from './ThemeContext'
import styled from 'styled-components'
import { useContext } from 'react'

function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Root $checked={theme === 'dark'}>
      <HiddenInput type="checkbox" onChange={toggleTheme} />
      <MovingBall $checked={theme === 'dark'}>
        <span className="material-symbols-outlined">dark_mode</span>
        <span className="material-symbols-outlined">light_mode</span>
      </MovingBall>
    </Root>
  )
}

export default ThemeSwitch

const Root = styled.label<{ $checked: boolean }>`
  width: 72px;
  height: 20px;

  display: flex;
  align-items: center;

  cursor: pointer;
  border-radius: 10000px;
  background: var(--color-button-hover-bg);
`

const HiddenInput = styled.input`
  display: none;
`

const MovingBall = styled.div<{ $checked: boolean }>`
  width: 30px;
  height: 30px;
  
  position: relative;
  left: ${({ $checked }) => ($checked ? 'calc(100% - 30px)' : '0')};

  background: ${({ $checked }) => ($checked ? '#000' : '#7cb1e2')};
  color: ${({ $checked }) => ($checked ? '#fff' : '#ffde20')};
  border-radius: 50%;
  overflow: hidden;
  
  user-select: none;
  -webkit-user-select: none;

  transition: left 0.2s ease-in-out, background 0.2s ease-in-out,
  color 0.2s ease-in-out;

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
`
