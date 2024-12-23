import React from 'react'
import styled from 'styled-components'

type SectionProps = {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export default function Container({
  children,
  className,
  contentClassName,
  ...rest
}: SectionProps) {
  return (
    <Root className={className} {...rest}>
      <Content className={contentClassName}>{children}</Content>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  /* overflow: hidden */
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
`
