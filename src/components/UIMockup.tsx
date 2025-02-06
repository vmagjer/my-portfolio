import styled from 'styled-components'

// desktop and mobile
// mobile and mobile
// desktop and desktop
type MockupItem = {
  type: 'mobile' | 'desktop'
  image: string
}

type UIMockupProps = {
  items: MockupItem[]
  // type: 'mm' | 'dd' | 'dm'
}
function UIMockup({ items }: UIMockupProps) {
  const isMixed =
    items.some((i) => i.type === 'mobile') &&
    items.some((i) => i.type === 'desktop')
  return (
    <Root className={`${isMixed ? 'mixed' : ''}`}>
      {items.map((x) => (
        <img key={x.image} src={x.image} alt="" className={`${x.type}`} />
      ))}
    </Root>
  )
}

export default UIMockup

const Root = styled.div`
  width: 100%;
  aspect-ratio: 1.6;
  perspective: 1000px;
  position: relative;

  img {
    box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.5);
    &.mobile {
      width: 30%;
      aspect-ratio: 360/740;
      transform: rotate3d(1, 1, -1, 45deg);

      position: absolute;
      &:nth-child(1) {
        top: 0;
        left: 24%;
        transform: rotate3d(1, 1, -1, 45deg) translate3d(0, 0, 0);
      }
      &:nth-child(2) {
        top: 0%;
        left: 50%;
        transform: rotate3d(1, 1, -1, 45deg) translate3d(0, 0, 10px);
      }
    }
    &.desktop {
      width: 80%;
      aspect-ratio: 1.6;

      position: absolute;
      &:nth-child(1) {
        top: 0;
        left: 0;
      }
      &:nth-child(2) {
        bottom: 0%;
        right: 0px;
      }
    }
  }

  &.mixed {
    img {
      
      &.mobile {
        transform: none;
        top: unset;
        left: unset;
        bottom: 0;
        right: 0;
        width: 25%;

      }
    }
  }
`
