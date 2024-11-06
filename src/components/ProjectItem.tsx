import styled from 'styled-components'

type ProjectItemProps = {
  title: string
  image: string
  children: React.ReactNode
}

export const ProjectItem = ({ title, image, children }: ProjectItemProps) => {
  return (
    <Container>
      <Image>
        <img src={image} alt={title} />
      </Image>
      <Text>
        <h3>{title}</h3>
        {children}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  border-radius: 41px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    z-index: 1;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`

const Image = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Text = styled.div`
  padding: 1rem;
  background-color: #fff;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #0073e6;
  }

  p {
    margin: 0;
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
  }
`
