import PropTypes from 'prop-types'
import styled from 'styled-components'
import useActiveSection from '../utils/useActiveSection'

function Summary({ items }) {
  
  const sectionIds = items.map((section) => section.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <Container className="summary">
      {items.map((item, index) => (
        <SummaryItem
          key={`summary-item-${item.id}`}
          className="summary-item"
          $active={activeSection === item.id}
          onClick={() => scrollToId(item.id)}
        >
          <span>{index}</span>
          <span>{item.title}</span>
        </SummaryItem>
      ))}
    </Container>
  )
}

Summary.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
}

export default Summary

function scrollToId(id) {
  const section = document.getElementById(id)
  const offset = 40 + 32
  const elementPosition = section.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.scrollY - offset

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}


const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  padding: 20px;

  background: rgba(000 000 000 / 0.3);
  backdrop-filter: blur(5px);
`

const SummaryItem = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  color: white;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
  border: none;
  cursor: pointer;
`