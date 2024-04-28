import { Link } from 'react-router-dom'
import styled from 'styled-components'

type ProjectItemProps = {
  title: string
  image: string
  navLink: string
}

export const ProjectItem = ({
  title,
  image,
  navLink,
}: ProjectItemProps) => {
  return (
    <Container to={navLink}>
      <Text>
        <h3>{title}</h3>
        {/* <p>{description}</p> */}
      </Text>
      <Image>
        <img src={image} alt={title} />
      </Image>
    </Container>
  )
}

const Container = styled(Link)`
  position: relative;
  /* width: 420px; */

  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  &:hover h3 {
      background-size: 0 var(--underline-height),
        100% var(--underline-height);
    }
`

const Text = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 1rem;

  h3 {
    margin-top: 0;
    display: inline-block;

    /* animated underline */
    --underline-height: 1px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)),
      linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-size: 100% var(--underline-height),
      0 var(--underline-height);
    background-position: 100% 100%, 0 100%;

    transition: background-size 0.25s linear, background-position 0.25s linear;
    
  }

  p {
    margin-top: 0.5rem;
  }
`

const Image = styled.div`
  img {
    width: 100%;
  }
`
