import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Summary from '../components/Summary'

const Home = styled.div`
  min-height: 100vh;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  min-height: 100vh;
`

const Section = styled.div`
  padding: 20px;
  color: white;
  background: rgba(000 000 000 / 0.3);

  min-height: 80vh;
`

const HomePage = () => {
  useEffect(() => {
    const handleScroll = (event) => {
      updateActiveSection(event)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [activeSection, setActiveSection] = useState('hero')
  const updateActiveSection = (scrollEvent) => {
    const scrollY = scrollEvent.target.scrollingElement.scrollTop
    const sections = document.querySelectorAll('#content > div')

    let mostVisibleSection = null
    let mostVisibleSectionPercentage = 0

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight
      const sectionId = section.getAttribute('id')
      const sectionVisibleHeight =
        Math.min(scrollY + window.innerHeight, sectionBottom) -
        Math.max(scrollY, sectionTop)
      const sectionVisiblePercentage =
        (sectionVisibleHeight / section.offsetHeight) * 100

      if (sectionVisiblePercentage > mostVisibleSectionPercentage) {
        mostVisibleSection = sectionId
        mostVisibleSectionPercentage = sectionVisiblePercentage
      }
    })

    setActiveSection(mostVisibleSection)
  }

  return (
    <>
      <Home>
        <Summary
          items={[
            { id: 'hero', title: 'Hero' },
            { id: 'experience', title: 'Experience' },
            { id: 'about', title: 'About' },
            { id: 'contact', title: 'Contact' },
          ]}
          activeItem={activeSection}
        />

        <Content id="content">
          <Section id="hero">hero</Section>
          <Section id="experience">experience</Section>
          <Section id="about">about</Section>
          <Section id="contact">contact</Section>
        </Content>
      </Home>
    </>
  )
}

export default HomePage
