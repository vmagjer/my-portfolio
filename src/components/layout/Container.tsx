import React from 'react'
import styled from 'styled-components'

type SectionProps = {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  maxWidth?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export default function Container({
  children,
  className,
  contentClassName,
  maxWidth = '800px',
  ...rest
}: SectionProps) {
  return (
    <Root className={className} {...rest}>
      <Content className={contentClassName} $maxWidth={maxWidth}>
        {children}
      </Content>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
`

const Content = styled.div<{ $maxWidth: string }>`
  margin: 0 auto;
  max-width: ${(props) => props.$maxWidth};
  width: 100%;
`
