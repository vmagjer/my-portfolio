import styled from 'styled-components'
import data from '../assets/data'
// import Card3D from '../components/Card3D'
import SkillGraph from '../components/SkillGraph'
import { ProjectItem } from '../components/ProjectItem'

const HomePage = () => {
  return (
    <Container>
      <Section>
        <h2>Highlighted Projects</h2>
        <Projects>
          {data.highlightedProjects.map((projectId) => (
            <ProjectItem
              key={projectId}
              title={data.projects[projectId].name}
              image={data.projects[projectId].image}
              navLink={`/projects/${projectId}`}
            />
          ))}
        </Projects>
      </Section>

      <Section>
        <h2>Skills</h2>
        <Skills>
          {Object.values(data.technologies).map((tech) => (
            <Skill key={tech.name}>
              <img src={tech.icon} alt="" width="24" height="24" />
              {tech.name}
            </Skill>
          ))}
        </Skills>
        <SkillGraph />
      </Section>

      <Section>
        <h2>Work Experience</h2>
        <WorkExperiences>
          {data.workExperience.map((workExp) => (
            <WorkExperience key={workExp.from}>
              <h3>{workExp.role}</h3>
              <span>at {workExp.company}</span>
              <span>{workExp.type}</span>
              <span>{getDurationMonths(workExp.from, workExp.to)} months</span>
            </WorkExperience>
          ))}
        </WorkExperiences>
      </Section>

      <Section>
        <h2>Education</h2>
        <Education>
          {data.education.map((eduExp) => (
            <EducationItem key={eduExp.degree}>
              <h3>{eduExp.degree}</h3>
              <span>{eduExp.school}</span>
              <span>
                {getMMYYYY(eduExp.from)} - {getMMYYYY(eduExp.to)}
              </span>
            </EducationItem>
          ))}
        </Education>
      </Section>
    </Container>
  )
}

export default HomePage

function getDurationMonths(from: string, to: string) {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  return (
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
    toDate.getMonth() -
    fromDate.getMonth()
  )
}

function getMMYYYY(date: Date) {
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

  h2 {
    margin-bottom: 8px;
  }
`

const Skills = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const Skill = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 0.25rem;

  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.9);
`

const Projects = styled.div`
  /* display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 800px;

  align-content: flex-start; */

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  /* padding: 16px; */

  /* perspective: 2000px; */
`

// const Project = styled.div`
//   padding: 12px;
//   border-radius: 4px;
//   background-color: rgba(255, 255, 255, 0.1);

//   h3 {
//     margin-bottom: 4px;
//   }

//   img {
//     width: 100%;
//     height: 200px;
//     object-fit: cover;
//     border-radius: 4px;

//     margin-bottom: 8px;
//   }
// `
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
