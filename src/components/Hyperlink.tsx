import { ReactNode } from 'react'
import styled from 'styled-components'

type HyperlinkProps = {
  link: string
  isExternal?: boolean
  children?: ReactNode
  onDark?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function Hyperlink({
  children,
  link,
  onDark = false,
  isExternal = false,
  ...rest
}: HyperlinkProps) {
  return (
    <Root
      href={link}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
      $onDark={onDark}
      {...rest}
    >
      {children}
    </Root>
  )
}

export default Hyperlink

const Root = styled.a<{ $onDark: boolean }>`
  text-decoration: none;
  color: var(--color-link);
  ${(props) => (props.$onDark ? 'color: var(--color-dark-link);' : '')}
  &:hover {
    text-decoration: underline;
  }
`
