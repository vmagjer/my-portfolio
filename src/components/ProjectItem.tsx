import styled from 'styled-components'

type ProjectItemProps = {
  title: string
  image: string
  children: React.ReactNode
  reverse?: boolean
  link?: string
  linkText?: string
}

export const ProjectItem = ({
  title,
  image,
  children,
  reverse,
  link,
  linkText,
}: ProjectItemProps) => {
  return (
    <Root $reverse={reverse}>
      <ImageContainer $reverse={reverse}>
        <img src={image} alt={title} />
      </ImageContainer>
      <Body>
        <Text>
          <h3>{title}</h3>
          {children}
        </Text>
        <ExternalLink href={link}>
          {linkText}

          <span className="material-symbols-outlined">open_in_new</span>
        </ExternalLink>
      </Body>
    </Root>
  )
}

const Root = styled.div<{ $reverse?: boolean }>`
  background-color: #fff;

  border-radius: 6px;
  overflow: hidden;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 12px;
`

const ImageContainer = styled.div<{ $reverse?: boolean }>`
  width: 1/3;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #3c90b9;
  }
`
const Text = styled.div`
  h3 {
    margin-top: 0;
  }

  p {
    color: #333;

    &:first-of-type {
      margin-top: 0.4rem;
    }
  }
`

const ExternalLink = styled.a`
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: end;

  gap: 6px;

  text-decoration: none;
  text-align: right;
`
