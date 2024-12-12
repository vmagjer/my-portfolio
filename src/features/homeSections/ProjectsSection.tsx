import Container from '../../components/layout/Container'
import { ProjectItem } from '../../components/ProjectItem'
import mojBankarShowcase from '../../assets/projects/moj-bankar/moj-bankar-showcase.png'
import styled from 'styled-components'
import verdiGoShowcase from '../../assets/projects/verdi/mockup-verdi-go.png'
import webShopShowcase from '../../assets/projects/verdi/mockup-verdi.jpeg'

type ProjectsSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
function ProjectsSection({ ...rest }: ProjectsSectionProps) {
  return (
    <Root {...rest}>
      <SectionTitle>Top Projects</SectionTitle>
      <Subtitle>Work I&apos;m proud of and that presented intersting challenges.</Subtitle>
      <ProjectsList>
        <ProjectItem
          title="E-commerce platform for fresh local produce"
          image={webShopShowcase}
          reverse={false}
          link="#"
          linkText="E-commerce platform"
        >
          <p>
            Worked on a progressive web app that connects consumers and their
            nearest local produce farmers.
          </p>
          <p>
            The platform handles payment and delivery logistics, greatly
            simplifying retail for the farmers and their customers.
          </p>
        </ProjectItem>
        <ProjectItem
          title="Crowdsourced delivery app"
          image={verdiGoShowcase}
          reverse={false}
          link="#"
          linkText="Delivery app"
        >
          <p>
            Built a mobile app to facilitate delivery of parcels via gig
            workers.
          </p>
          {/* <p>
            The app allows the drivers to accept offers they could complete
            concurrently with their other gigs.
          </p> */}
          <p>
            The app allows the drivers to accept several gigs at once for more
            optimal route planning.
          </p>
        </ProjectItem>
        <ProjectItem
          title="Financial Comparison Tool"
          image={mojBankarShowcase}
          reverse={false}
          link="#"
          linkText="Comparison tool"
        >
          <p>
            Worked on a web app offering tools to compare insurance, loans,
            credit cards, and savings products.
          </p>
          <p>
            Includes a financial glossary, expert consultation forms, and
            service comparison tables to guide users toward smarter financial
            choices.
          </p>
        </ProjectItem>
        {/* <ProjectItem
          title="Exploring frontend technologies"
          image={exploringShowcase}
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
        </ProjectItem> */}
      </ProjectsList>
    </Root>
  )
}

export default ProjectsSection

const Root = styled(Container)`
  z-index: 1;
  padding: 32px 16px 48px;
  background-color: #e3e3e3;

  ul {
    padding-left: 1rem;
  }
`

const SectionTitle = styled.h2`
  /* margin-bottom: 8px; */
` 
const Subtitle = styled.p`
  margin: 0;
  margin-bottom: 16px;
  opacity: 80%;
`

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  gap: 24px;
  flex-wrap: wrap;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`