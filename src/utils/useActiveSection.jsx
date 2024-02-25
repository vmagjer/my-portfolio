import { useState, useEffect } from 'react';

/**
 * Custom hook that determines the active section based on the scroll position.
 *
 * @param {string[]} sectionIds - An array of section IDs.
 * @returns {string} The ID of the active section.
 */
const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const updateActiveSection = (scrollEvent) => {
      const scrollY = scrollEvent.target.scrollingElement.scrollTop;

      let mostVisibleSection = null;
      let mostVisibleSectionPercentage = 0;

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionVisibleHeight =
          Math.min(scrollY + window.innerHeight, sectionBottom) -
          Math.max(scrollY, sectionTop);
        const sectionVisiblePercentage =
          (sectionVisibleHeight / section.offsetHeight) * 100;

        if (sectionVisiblePercentage > mostVisibleSectionPercentage) {
          mostVisibleSection = sectionId;
          mostVisibleSectionPercentage = sectionVisiblePercentage;
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener('scroll', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;