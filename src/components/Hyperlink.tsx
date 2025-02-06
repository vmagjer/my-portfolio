import styled from 'styled-components'

type HyperlinkProps = {
  link: string
  text: string
  external?: boolean
  onDark?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function Hyperlink({
  text,
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
      $textLength={text.length}
      {...rest}
    >
      {text.split('').map((c, i) => (
        <span key={text + i} className="char">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
      {isExternal && (
        <sup aria-hidden>
          <span className="material-symbols-outlined icon">open_in_new</span>
        </sup>
      )}
    </Root>
  )
}

export default Hyperlink

const Root = styled.a<{ $onDark: boolean; $textLength: number }>`
  @property --offset {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }

  color: var(--color-link);

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

  display: inline-block;
  .char {
    display: inline-block;
    transition: translateY 1000ms ease;
  }
  &:hover,
  &:focus {
    --offset: 0.3em;
    text-decoration: underline;
    text-decoration-color: var(--color-link);

    .char {
      animation: floatY 500ms ease infinite;
      ${(props) => staggerChildren(props.$textLength, 500, 10)}
    }
  }

  @keyframes floatY {
    0% {
      transform: translateY(0px);
      animation-timing-function: ease-out;
    }
    25% {
      transform: translateY(6px);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translateY(-6px);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateY(0px);
      animation-timing-function: ease-in;
    }
  }
`

/** staggers the floaty animation such that the text apears to wave, starting from one end */
function staggerChildren(
  numChildren: number,
  totalTime: number,
  waveLength: number
) {
  let result = ''
  const timeStep = totalTime / waveLength
  let delay = 0
  for (let i = 1; i <= numChildren; i++) {
    result += `
      &:nth-child(${numChildren}n+${i}) {
        animation-delay: ${delay}ms;
      }`
    delay += timeStep
  }
  return result
}
