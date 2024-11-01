import { useEffect, useState } from 'react'

import throttle from './throttle'

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
      const newActiveSection = getTopVisibleElement(sectionIds)

      if (newActiveSection === null) {
        console.error('No section found')
        return
      }

      setActiveSection(newActiveSection)
    }

    const throttledUpdateActiveSection = throttle(updateActiveSection, 100)

    window.addEventListener('scroll', throttledUpdateActiveSection)

    return () => {
      window.removeEventListener('scroll', throttledUpdateActiveSection)
    }
  }, [sectionIds])

  return { activeSection, scrollToSection: scrollToId }
}

export default useActiveSection

// assumes the ids are ordered by appearance on the page
function getTopVisibleElement(ids: string[]): string | null {
  const offset = 40 + 32 + 16
  const targetPosition = window.scrollY + offset

  for (const id of ids) {
    try {
      const element = getElementByIdGuaranted(id)
      const distanceFromTarget = targetPosition - element.offsetTop
      if (distanceFromTarget < 0) continue
      if (distanceFromTarget > element.offsetHeight) continue

      return id
    } catch (error) {
      console.warn(`Couldn't check Element with ID "${id}":\n${error}`)
    }
  }

  return null
}

function scrollToId(id: string) {
  try {
    const element = getElementByIdGuaranted(id)
    const elementPositionInViewport = element.getBoundingClientRect().top
    const elementPositionInDocument = window.scrollY + elementPositionInViewport
    const offset = 40 + 32
    const targetPosition = elementPositionInDocument - offset

    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  } catch (error) {
    console.error(`Couldn't scroll to Element with ID "${id}":\n${error}`)
  }
}

function getElementByIdGuaranted(id: string): HTMLElement {
  const element = document.getElementById(id)
  if (element === null) {
    throw new Error(`Element with ID "${id}" not found`)
  }
  return element
}
