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
    <Root {...rest} maxWidth="1000px">
      <SectionTitle>Top Projects</SectionTitle>
      <Subtitle>
        Work I&apos;m proud of and that presented interesting challenges.
      </Subtitle>
      <ProjectsList>
        <ProjectItem
          title="E-commerce platform for local farmers"
          image={webShopShowcase}
          reverse={false}
          link="https://www.verdi-farm.com/"
          linkText="E-commerce platform"
        >
          <p>
            Worked on a progressive web app that connects consumers and their
            local produce farmers.
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
          link="https://play.google.com/store/apps/details?id=verdi.go.development&hl=en"
          linkText="Delivery app"
        >
          <p>
            Built a mobile app to facilitate delivery of parcels via gig
            workers.
          </p>
          <p>
            The app allows the drivers to accept several gigs at once for more
            optimal route planning.
          </p>
        </ProjectItem>
        <ProjectItem
          title="Financial Comparison Tool"
          image={mojBankarShowcase}
          reverse={false}
          link="https://www.moj-bankar.hr/"
          linkText="Comparison tool"
        >
          <p>
            Worked on a web app offering tools to compare financial products and
            services.
          </p>
          <p>
            Includes a financial glossary, expert consultation forms, and
            service comparison tables to guide users toward smarter financial
            choices.
          </p>
        </ProjectItem>
      </ProjectsList>
    </Root>
  )
}

export default ProjectsSection

const Root = styled(Container)`
  z-index: 1;
  padding: 32px 16px 48px;
  background-color: var(--alt-section-surface);
`

const SectionTitle = styled.h2`
  color: var(--color-title);
  color: var(--color-title);
  @media (min-width: 600px) {
    text-align: center;
  }
`
const Subtitle = styled.p`
  margin: 0;
  margin-bottom: 40px;
  color: var(--color-subtitle);
  color: var(--color-subtitle);
  @media (min-width: 600px) {
    text-align: center;
  }
`

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  gap: 24px;
  flex-wrap: wrap;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`
