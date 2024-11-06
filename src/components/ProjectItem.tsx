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
    <Container reverse={reverse}>
      <Image reverse={reverse}>
        <img src={image} alt={title} />
      </Image>
      <Text>
        <h3>{title}</h3>
        {children}
      </Text>
    </Container>
  )
}

const Container = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  justify-content: space-between;
  width: 100%;
  background-color: #fff;

  perspective: 2000px;
`

const Image = styled.div<{ reverse?: boolean }>`
  width: 1/3;
  aspect-ratio: 4/3;
  overflow: hidden;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  /* transform-style: preserve-3d; */
  ${({ reverse }) =>
    reverse
      ? `transform: scale(1.0) translateX(40px) translateY(-10px) rotateY(-30deg);`
      : `transform: scale(1.0) translateX(-40px) translateY(-10px) rotateY(30deg);`}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Text = styled.div`
  padding: 1rem;
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
  }
`
