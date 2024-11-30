import Card3D from '../../components/Card3D'
import gandalfArmsImage from '../../assets/images/gandalf_smoking-arms.png'
import gandalfBackgroundImage from '../../assets/images/gandalf_background.jpg'
import gandalfNoArmsImage from '../../assets/images/gandalf_smoking_no_arms.png'
import smokeImage from '../../assets/images/smoke.png'
import styled from 'styled-components'

const items = [
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
  {
    name: 'Gandalf the White',
    image: [
      gandalfBackgroundImage,
      gandalfNoArmsImage,
      gandalfArmsImage,
      smokeImage,
    ],
  },
]
export const Card3DProjectView = () => {
  return (
    <Root>
      {/* <Card3D data={{name: data.personalInfo.fullName, image: cardImage}} /> */}
      {items.map((item, index) => (
        <Card3D key={index} data={{ name: item.name, image: item.image }} />
      ))}
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`
