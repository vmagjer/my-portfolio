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
  cursor: pointer;
  /* display: flex;
  justify-content: ${({ $checked }) =>
    $checked ? 'flex-end' : 'flex-start'}; */
  /* padding: 4px; */
  border-radius: 10000px;
  background: var(--primary-200);
  width: 72px;
  height: 20px;
  display: flex;
  align-items: center;
`

const HiddenInput = styled.input`
  display: none;
`

const MovingBall = styled.div<{ $checked: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;

  position: relative;
  left: ${({ $checked }) => ($checked ? 'calc(100% - 30px)' : '0')};
  transition: left 0.2s ease-in-out, background 0.2s ease-in-out,
    color 0.2s ease-in-out;

  background: ${({ $checked }) => ($checked ? '#000' : '#7cb1e2')};
  color: ${({ $checked }) => ($checked ? '#fff' : '#ffde20')};
  
  user-select: none;
  -webkit-user-select: none;

  span {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
    position: relative;
    top: ${({ $checked }) => ($checked ? '0' : '-100%')};
    transition: top 0.2s ease-in-out;
  }
`
