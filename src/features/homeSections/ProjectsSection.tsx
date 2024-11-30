import Container from '../../components/layout/Container'
import { ProjectItem } from '../../components/ProjectItem'
import data from '../../assets/data'
import styled from 'styled-components'
import verdiGoShowcase from '../../assets/projects/verdi/verdi-go-showcase.png'
import webShopShowcase from '../../assets/projects/verdi/web-shop-showcase.png'

type ProjectsSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function ProjectsSection({ ...rest }: ProjectsSectionProps) {
  return (
    <Root {...rest}>
      <h2>Top Projects</h2>
      <ProjectsList>
        <ProjectItem
          title="Web shop for fresh local produce"
          image={webShopShowcase}
          reverse={false}
        >
          <p>
            Worked in a team of 4 to redesign a web shop for local produce. We
            refactored the stinky old code and introduced new features to
            improve the UX.
          </p>
        </ProjectItem>
        <ProjectItem
          title="Crowdsourced delivery solution"
          image={verdiGoShowcase}
          reverse={false}
        >
          <p>
            We made a mobile app to serve the shop{"'"}s delivery needs by
            crowdsourcing delivery drivers.
          </p>
        </ProjectItem>
        <ProjectItem
          title="Exploring frontend technologies"
          image={data.highlightedProjects[1].image}
          reverse={true}
        >
          <p>
            This is me testing the capabilities of CSS and JS as well as my own
            capabilities.
          </p>
          <p>I developed visually interesting componets like:</p>
          <ul>
            <li>the Matrix digital shower</li>
            <li>a graph visualization tool</li>
            <li>scroll-bound animation</li>
            <li>a 3D card component</li>
            <li>full screen menu resembling a broken glass pane</li>
          </ul>
        </ProjectItem>
      </ProjectsList>
    </Root>
  )
}

export default ProjectsSection

const Root = styled(Container)`
  z-index: 1;
  padding: 2rem 1rem 3rem;
  background-color: #e3e3e3;
  container-name: projects-section;

  ul {
    padding-left: 1rem;
  }
`

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`
