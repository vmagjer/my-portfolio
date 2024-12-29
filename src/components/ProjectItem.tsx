import Hyperlink from './Hyperlink'
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
        {link && (
          <ExternalLink external link={link}>
            {linkText}
          </ExternalLink>
        )}
      </Body>
    </Root>
  )
}

const Root = styled.div<{ $reverse?: boolean }>`
  display: flex;
  flex-direction: column;

  border-radius: 6px;
  overflow: hidden;

  background-color: #fff;
  /* border: 1px solid var(--neutral-900); */
`
const Body = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 14px;
`

const ImageContainer = styled.div<{ $reverse?: boolean }>`
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
    color: var(--color-title);
  }

  p {
    color: var(--color-body);

    &:first-of-type {
      margin-top: 0.4rem;
    }
  }
`

const ExternalLink = styled(Hyperlink)`
  margin-top: 16px;
  align-self: end;

  /* display: flex;
  align-items: center;
  justify-content: end;

  gap: 6px;
  
  text-align: right; */
`
