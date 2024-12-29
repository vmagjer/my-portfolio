import { ReactNode } from 'react'
import styled from 'styled-components'

type HyperlinkProps = {
  link: string
  external?: boolean
  children?: ReactNode
  onDark?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function Hyperlink({
  children,
  link,
  onDark = false,
  external: isExternal = false,
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
      {isExternal && (
        <sup>
          <span className="material-symbols-outlined icon">open_in_new</span>
        </sup>
      )}
    </Root>
  )
}

export default Hyperlink

const Root = styled.a<{ $onDark: boolean }>`
  @property --offset {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }

  color: ${(props) =>
    props.$onDark ? 'var(--color-dark-link)' : 'var(--color-link)'};

  --offset: 0.15em;
  text-underline-offset: var(--offset, 0.2em);
  text-decoration: none;
  text-decoration-color: transparent;
  transition: --offset 300ms, text-decoration-color 300ms;
  font-weight: 600;

  .icon {
    font-size: 1em;

    font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 20;
  }

  &:hover,
  &:focus {
    --offset: 0.3em;
    text-decoration: underline;
    text-decoration-color: ${(props) =>
      props.$onDark ? 'var(--color-dark-link)' : 'var(--color-link)'};
  }
`
