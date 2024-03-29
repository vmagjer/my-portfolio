import styled from 'styled-components'
import data from '../assets/data'
import Card3D from '../components/Card3D'

const HomePage = () => {
  return (
    <Container>
      <Section>
        <h2>Skills</h2>
        <Skills>
          {Object.values(data.technologies).map((tech) => (
            <Skill key={tech.name}>
              <img src={tech.icon} alt="" width="48" height="48"/>
              {tech.name}            
            </Skill>
          ))}
        </Skills>
      </Section>
      <Section>
        <h2>Projects</h2>
        <Projects>
          {data.highlightedProjects.map((projectId) => (
            <Card3D key={projectId} data={data.projects[projectId]} />
          ))}
        </Projects>
      </Section>
      <Section>
        <h2>Work Experience</h2>
        <WorkExperiences>
          {Object.keys(data.workExperience).map((workId) => (
            <WorkExperience key={workId}>
              <h3>{data.workExperience[workId].role}</h3>
              <span>at {data.workExperience[workId].company}</span>
              <span>{data.workExperience[workId].type}</span>
              <span>{getDurationMonths(data.workExperience[workId].from,data.workExperience[workId].to)} months</span>
            </WorkExperience>
          ))}
        </WorkExperiences>
      </Section>
      <Section>
        <h2>Education</h2>
        <Education>
          {Object.keys(data.education).map((educationId) => (
            <EducationItem key={educationId}>
              <h3>{data.education[educationId].degree}</h3>
              <span>{data.education[educationId].school}</span>
              <span>{getMMYYYY(data.education[educationId].from)} - {getMMYYYY(data.education[educationId].to)}</span>
            </EducationItem>
          ))}
        </Education>
      </Section>
    </Container>
  )
}

export default HomePage

function getDurationMonths(from, to) {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  return (toDate.getFullYear() - fromDate.getFullYear()) * 12 + toDate.getMonth() - fromDate.getMonth()
}

function getMMYYYY(date) {
  return `${date.getMonth() + 1}/${date.getFullYear()}`
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
  /* width: 100%; */
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 360px;
  min-width: 360px;
  padding: 20px;

  background-color: rgba(0, 0, 0, 0.1);

  border-radius: 8px;
  /* border: 1px solid red; */

  h2 {
    margin-bottom: 8px;
  }
`

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const Skill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
`

const Projects = styled.div`
  display: flex;
  gap: 16px;
  /* padding: 16px; */
  flex-wrap: wrap ;

  /* perspective: 2000px; */
`

const Project = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);

  h3 {
    margin-bottom: 4px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;

    margin-bottom: 8px;
  }
`
const WorkExperiences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* padding: 16px; */
`

const WorkExperience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
`

const Education = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* padding: 16px; */
`

const EducationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
`