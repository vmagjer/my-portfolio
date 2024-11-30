import { NavLink } from 'react-router-dom'
import data from '../../assets/data'
import profilePicture from '../assets/images/profile-picture.jpg'
import styled from 'styled-components'

const links = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
]

export default function SideMenu() {
  return (
    <Root>
      <ProfileSection>
        <ProfileImage src={profilePicture} alt="profile" />
        <span>{`${data.personalInfo.fullName}`}</span>
      </ProfileSection>

      <Navigation>
        <NavList>
          {links.map((link) => (
            <StyledNavLink
              to={link.path}
              key={`nav-link-${link.id}`}
              className={linkClasses}
            >
              {link.title}
            </StyledNavLink>
          ))}
        </NavList>

        <NavList>
          <NavListHeader>Projects</NavListHeader>
          {Object.entries(data.projects).map(([key, value]) => (
            <StyledNavLink
              to={`/projects/${key}`}
              key={key}
            >
              {value.name}
            </StyledNavLink>
          ))}
        </NavList>
      </Navigation>

      <Footer>Made with ❤️ by {data.personalInfo.fullName} </Footer>
    </Root>
  )
}

function linkClasses({
  isActive,
  isPending,
}: {
  isActive: boolean
  isPending: boolean
}) {
  if (isPending) return 'pending'
  if (isActive) return 'active'
  return ''
}

const Root = styled.div`
  height: calc(100vh - 16px);
  width: 100%;
  transition: transform 0.2s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #000;
  border: 1px solid #464646;
  border-left: none;
  border-radius: 0 8px 8px 0;
`

const ProfileSection = styled.div`
  padding: 20px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 100%;
  margin-bottom: 10px;
  scale: -1 1;
`

const Navigation = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
  justify-content: center;
`
const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const NavListHeader = styled.h3`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-bottom: 10px;
`

const StyledNavLink = styled(NavLink)`
  padding: 10px;
  color: rgba(255, 255, 255, 0.7);
  flex: 1;
  text-decoration: none;
  &.active {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 1);
    padding-left: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.8);
  }
`

const Footer = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`
