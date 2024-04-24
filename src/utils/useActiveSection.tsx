import { useState, useEffect } from 'react'

/**
 * Custom hook that determines the active section based on the scroll position.
 *
 * @param {string[]} sectionIds - An array of section IDs.
 * @returns {string} The ID of the active section.
 */
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0])

  useEffect(() => {
    const updateActiveSection = () => {
      const newActiveSection = getTopVisibleSection(sectionIds)

      if (newActiveSection === null) {
        console.error('No section found')
        return
      }

      setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [sectionIds])

  function scrollToSection(id: string) {
    const section = document.getElementById(id)
    if (!section) {
      console.error(`Section with ID "${id}" not found`)
      return
    }
    const offset = 40 + 32
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  return { activeSection, scrollToSection }
}

export default useActiveSection

function getMostVisibleSection(sectionIds: string[]): string | null {
  const scrollY = window.scrollY

  let mostVisibleSection = null
  let mostVisibleSectionPercentage = 0

  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) {
      console.error(`Section with ID "${sectionId}" not found`)
      return
    }

    // Calculate the percentage of the section that is visible
    const sectionTop = section.offsetTop
    const sectionBottom = sectionTop + section.offsetHeight
    const upperVisiblePoint = Math.max(scrollY, sectionTop)
    const lowerVisiblePoint = Math.min(
      scrollY + window.innerHeight,
      sectionBottom
    )
    const sectionVisibleHeight = lowerVisiblePoint - upperVisiblePoint
    const sectionVisiblePercentage =
      (sectionVisibleHeight / section.offsetHeight) * 100

    if (sectionVisiblePercentage > mostVisibleSectionPercentage) {
      mostVisibleSection = sectionId
      mostVisibleSectionPercentage = sectionVisiblePercentage
    }
  })

  return mostVisibleSection
}

function getTopVisibleSection(sectionIds: string[]): string | null {
  const offset = 40 + 32 + 16
  const scrollY = window.scrollY + offset

  // sectionIds.forEach((sectionId) => {
  for (const sectionId of sectionIds) {
    const section = document.getElementById(sectionId)
    if (section === null) {
      throw new Error(`Section with ID "${sectionId}" not found`)
    }

    const sectionTop = section.offsetTop
    const sectionBottom = sectionTop + section.offsetHeight

    if (scrollY >= sectionTop && scrollY <= sectionBottom) {
      return sectionId
    }
  }

  return null
}
