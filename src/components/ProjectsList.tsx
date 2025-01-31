import { TimelineItemInfo } from './Timeline'
import styled from 'styled-components'

type ProjectsListProps = {
  items: TimelineItemInfo[]
}

function ProjectsList({ items }: ProjectsListProps) {
  return (
    <Root>
      {items.map((item) => (
        <ProjectsListItem key={item.title}>
          <TextAndImageContainer>
            <ImageContainer>
              <img src={item.image} alt="" />
            </ImageContainer>

            <TextContainer>
              <DateStamp>{item.date}</DateStamp>
              <ProjectTitle>{item.title}</ProjectTitle>

              <ProjectContent>{item.content}</ProjectContent>

              <SkillList>
                {item.skills.map((s) => (
                  <SkillListItem key={`${item.title}-${s}`}>{s}</SkillListItem>
                ))}
              </SkillList>
            </TextContainer>
          </TextAndImageContainer>
        </ProjectsListItem>
      ))}
    </Root>
  )
}

export default ProjectsList

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
`

const ProjectsListItem = styled.div`
  /* display: flex; */
  /* flex: 1; */
  width: 100%;
  
  gap: 16px;
  /* padding: 16px 0; */
  /* border-radius: 8px; */
  /* border-BOTTOM: 1px SOLID GRAY; */

  /* background-color: var(--card-surface); */
`
const TextAndImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  @media (min-width: 1100px) {
    flex-direction: row;
    gap: 24px;
  }
`
const ImageContainer = styled.div`
  flex: 0;
  min-width: 300px;

  img {
    display: block;
    object-fit: cover;
    object-position: center;

    width: 100%;
    aspect-ratio: 1600/900;
    aspect-ratio: 3/2;

    background-color: black;
    border-radius: 8px;
  }
`

const TextContainer = styled.div`
  flex: 1;
`
const DateStamp = styled.div`
  color: var(--color-subtitle);
  text-transform: uppercase;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`
const ProjectTitle = styled.h3`
  color: var(--color-title);
  margin-bottom: 1rem;
`
const ProjectContent = styled.div`
  color: var(--color-body);

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: 1em;
    /* padding-left: 0;
    list-style-position: inside; */
  }

  /* max-height: 3rem;
  overflow: hidden; */
  /* position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent,transparent, var(--card-surface));
  } */
`

const SkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  gap: 8px;
  margin-top: 1.25rem;
`
const SkillListItem = styled.li`
  list-style: none;
  min-width: 60px;
  text-align: center;
  padding: 4px 16px;
  border-radius: 1000px;
  background-color: var(--card-chip-surface);
  color: var(--color-subtitle);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12);
`
