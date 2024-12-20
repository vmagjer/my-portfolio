import styled from 'styled-components'

type AvatarImageProps = {
  src: string
  size: Size
}

type Size = 'small' | 'medium'| 'semi' | 'large' 

const sizeOptions: Record<Size, number> = {
  small: 20,
  medium: 40,
  semi: 50,
  large: 100
}

export default function AvatarImage({ src, size }: AvatarImageProps) {
  return <Root src={src} size={sizeOptions[size]}/>
}

const Root = styled.img<{size: number}>`
  width: ${({size})=> size}px;
  height: ${({size})=> size}px;
  border-radius: 10000px;
`
