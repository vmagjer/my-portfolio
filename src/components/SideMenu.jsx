import styled from 'styled-components'
import PropTypes from 'prop-types';

const links = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]

function SideMenu({ isOpen }) {
  return (
    <Container $isOpen={isOpen}>
      <Profile>
        <ProfileImage src="https://i.pravatar.cc/300" alt="profile" />
        <span>John Doe</span>
      </Profile>
      <ul>
        {links.map((link) => (
          <NavLink key={`nav-link-${link.id}`}>{link.title}</NavLink>
        ))}
      </ul>
    </Container>
  )
}

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default SideMenu

const Container = styled.div`
  position: fixed;  
  left: 0;
  height: 100vh;
  width: 300px;
  z-index: 1000;
  
  transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.3s;

  display: flex;
  flex-direction: column;
  

  background: rgba(000 000 000 / 0.3);
  backdrop-filter: blur(5px);
`
const NavLink = styled.div`
  padding: 10px;
  color: white;
`

const Profile = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 10px;
`

