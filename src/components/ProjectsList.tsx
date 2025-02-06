import React, { useEffect, useRef } from 'react'

import styled from 'styled-components'

type ProjectItemType = {
  title: string
  image: React.ReactNode
  date: string
  content: React.ReactNode
  skills: string[]
}
type ProjectsListProps = {
  items: ProjectItemType[]
}

function ProjectsList({ items }: ProjectsListProps) {
  return (
    <Root>
      {items.map((item) => (
        <Project key={item.title} project={item}/>
      ))}
    </Root>
  )
}

export default ProjectsList

function Project({ project }: { project: ProjectItemType }) {
  const projectElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const element = projectElement.current
    if (!element) return

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectBox = entry.target

          if (entry.isIntersecting) {
            projectBox.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.5,
      }
    )

    visibilityObserver.observe(element)
    return () => {
      visibilityObserver.disconnect()
    }
  }, [projectElement])
  return (
    <ProjectsListItem ref={projectElement}>
      <TextAndImageContainer>
        <ImageContainer>
          {project.image}
        </ImageContainer>

        <TextContainer>
          <HeaderBox>
            <DateStamp>{project.date}</DateStamp>
            <ProjectTitle>{project.title}</ProjectTitle>
          </HeaderBox>

          <ProjectContent>{project.content}</ProjectContent>

          <SkillList>
            {project.skills.map((s) => (
              <SkillListItem key={`${project.title}-${s}`}>{s}</SkillListItem>
            ))}
          </SkillList>
        </TextContainer>
      </TextAndImageContainer>
    </ProjectsListItem>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 76px;
  width: 100%;
`

const ProjectsListItem = styled.div`
  width: 100%;

  gap: 16px;

  /* background: var(--alt-section-surface);
  padding: 14px;
  border-radius: 12px; */

  /* border-top: 1px solid var(--neutral-300);
  padding-top: 0.75rem; */

  /*   
  padding-bottom: 40px;
  position: relative;
  background: var(--section-surface);
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    inset: 0px;
    bottom: -2px;

    border-radius: 0px;
    background: linear-gradient(
      to right,
      transparent,
      var(--neutral-400),
      transparent
    );
  } */

  transition: opacity 500ms ease, transform 500ms ease;
  opacity: 0;
  transform: translateY(40px);
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`
const TextAndImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  @media (min-width: 1100px) {
    flex-direction: row;
    /* flex-direction: row-reverse; */
    gap: 32px;
  }
`
const ImageContainer = styled.div`
  flex: 0;
  min-width: 300px;
  max-height: 150px;
  overflow: hidden;

  > img {
    display: block;
    object-fit: cover;
    object-position: center;

    width: 100%;
    aspect-ratio: 1600/900;
    aspect-ratio: 3/2;
    aspect-ratio: 1920/1200;

    /* background-color: black; */
    border-radius: 2px;
  }
  mask-image: linear-gradient(to bottom, black 50%, transparent);

  @media (min-width: 1000px) {
    mask-image: none;
    max-height: none;
    overflow: visible;
  }
`

const TextContainer = styled.div`
  flex: 1;
`

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-direction: column-reverse; */

  margin-bottom: 0.75rem;

  @media (min-width: 1000px) {
    /* flex-direction: row-reverse;
    justify-content: space-between; */
  }
`

const DateStamp = styled.div`
  color: var(--color-subtitle);
  text-transform: uppercase;
  font-size: 0.75rem;
  white-space: nowrap;
  /* display: flex;
  align-items: center; */

  margin-bottom: 0.125rem;
`

const ProjectTitle = styled.h3`
  color: var(--color-title);
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
  min-width: 40px;
  border-radius: 1000px;

  padding: 0px 0.5rem;

  font-size: 0.75rem;
  text-align: center;

  background-color: var(--card-chip-surface);
  background-color: var(--neutral-300);
  /* background-color: #0e0e11; */
  color: var(--color-subtitle);
  /* box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12); */
`
