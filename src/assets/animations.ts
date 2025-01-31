
export const flyIn: Keyframe[] | PropertyIndexedKeyframes = [
  {
    position: 'relative',
    opacity: '0%',
    left: '10px',
  },
  {
    opacity: '100%',
    left: '0px',
  },
]

export const sproingIn: Keyframe[] = [
  // fly in
  {
    offset: 0,
    transformOrigin: '0 50%',
    scale: '1',
    translate: '-100vw 0',
  },
  // reach destination, stretch because of abrupt stop
  {
    offset: 0.5,
    scale: '1.2 0.9',
    translate: '5vw 0',
  },
  {
    offset: 0.6,
    scale: '1.2 0.9',
    translate: '5vw 0',
  },
  // rebound the stretch into final position
  {
    offset: 1,
    scale: '1 1',
    translate: '0 0',
  },
]

export const bloomIn: Keyframe[] | PropertyIndexedKeyframes = [
  {
    transform: 'scale(0)',
    bottom: '-50%',
  },
  {
    offset: 0.5,
    transform: 'scale(1)',
    bottom: '10%',
  },
  {
    offset: 0.6,
    transform: 'scaleY(1)',
    bottom: '0%',
  },
  {
    offset: 0.8,
    transform: 'scaleY(0.9)',
    bottom: '-10%',
  },
  {
    offset: 1,
    transform: 'scaleY(1)',
    bottom: '0%',
  },
]

export const fadeIn: Keyframe[] = [
  {
    offset: 0,
    opacity: 0,
  },
  {
    offset: 1,
    opacity: 1,
  },
]


export const popIn: Keyframe[] = [
  // fly in
  {
    offset: 0,
    transformOrigin: '50% 100%',
    scale: '0',
  },
  // reach destination, stretch because of abrupt stop
  {
    offset: 0.5,
    scale: '1.2',
  },
  {
    offset: 0.6,
    scale: '1.2',
  },
  // rebound the stretch into final position
  {
    offset: 1,
    scale: '1 1',
    translate: '0 0',
  },
]

const tiltLeft: Keyframe = {
  "-webkit-transform": 'scale3d(1.1,1.1,1.1) rotate(3deg)',
  transform: 'scale3d(1.1,1.1,1.1) rotate(3deg)',
}
const tiltRight: Keyframe = {
  "-webkit-transform": 'scale3d(1.1,1.1,1.1) rotate(-3deg)',
  transform: 'scale3d(1.1,1.1,1.1) rotate(-3deg)',
}
const tiltRightSmall: Keyframe = {
  "-webkit-transform": 'scale3d(1.1,1.1,1.1) rotate(-3deg)',
  transform: 'scale3d(1.1,1.1,1.1) rotate(-3deg)',
}

export const tada: Keyframe[] = [
  {
    "-webkit-transform": 'scaleX(1)',
    transform: 'scaleX(1)',
  }, 
  tiltRightSmall, tiltRightSmall,
  tiltLeft, tiltRight,
  tiltLeft, tiltRight,
  tiltLeft, tiltRight,
  tiltLeft,
  {
    "-webkit-transform": 'scaleX(1)',
    transform: 'scaleX(1)',
  }
]
export const zoomIn: Keyframe[] = [
  {
    "-webkit-transform": 'scale(0)',
    transform: 'scale(0)',
  }, 
  {
    "-webkit-transform": 'scale(1)',
    transform: 'scale(1)',
  }
]