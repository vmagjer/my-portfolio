import styled from 'styled-components'

type ProjectItemProps = {
  title: string
  image: string
  children: React.ReactNode
  reverse?: boolean
}

export const ProjectItem = ({
  title,
  image,
  children,
  reverse,
}: ProjectItemProps) => {
  return (
    <Root $reverse={reverse}>
      <ImageContainer $reverse={reverse}>
        <img src={image} alt={title} />
      </ImageContainer>
      <Text>
        <h3>{title}</h3>
        {children}
      </Text>
    </Root>
  )
}

const Root = styled.div<{ $reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  /* flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')}; */
  /* justify-content: space-between; */
  background-color: #fff;

  border-radius: 6px;
  overflow: hidden;

  padding: 0.75rem;
`

const ImageContainer = styled.div<{ $reverse?: boolean }>`
  width: 1/3;
  aspect-ratio: 4/3;

  border-radius: 4px;
  overflow: hidden;

  /* transform-style: preserve-3d; */
  /* ${({ $reverse }) =>
    $reverse
      ? `transform: scale(1.0) translateX(2rem) translateY(-1rem) rotateY(-0deg);`
      : `transform: scale(1.0) translateX(-2rem) translateY(-1rem) rotateY(0deg);`} */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Text = styled.div`
  padding-left: 1px;
  margin-top: 0.5rem;

  h3 {
    margin-top: 0;
    /* margin-bottom:0.25rem; */
  }

  p {
    color: #333;
    /* margin-bottom: 0.5rem;
    line-height: 1.25rem; */

    &:first-of-type {
      margin-top: 0;
    }
  }
`
