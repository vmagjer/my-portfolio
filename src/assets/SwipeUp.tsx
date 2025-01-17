import { forwardRef } from 'react'

type SwipeUpProps = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const duration = 2

export default forwardRef(function SwipeUp(
  { className, ...rest }: SwipeUpProps,
  ref: React.LegacyRef<SVGSVGElement>
) {
  return (
    <svg
      ref={ref}
      className={className}
      fill="inherit"
      width="800px"
      height="800px"
      viewBox="0 0 1000 1000"
      version="1.1"
      xmlns="//www.w3.org/2000/svg"
      xmlnsXlink="//www.w3.org/1999/xlink"
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
      {...rest}
    >
      <g id="all">
        <g id="trail-container">
          <path
            transform="translate(320.000000,480.000000) scale(1,1)"
            id="trail"
            d="M 57.375 -74.7747 C 57.375 -74.7747 57.375 74.7747 57.375 74.7747 C 57.375 106.44 31.6652 132.1497 0 132.1497 C 0 132.1497 0 132.1497 0 132.1497 C -31.6652 132.1497 -57.375 106.44 -57.375 74.7747 C -57.375 74.7747 -57.375 -74.7747 -57.375 -74.7747 C -57.375 -106.44 -31.6652 -132.1497 0 -132.1497 C 0 -132.1497 0 -132.1497 0 -132.1497 C 31.6652 -132.1497 57.375 -106.44 57.375 -74.7747 z"
          />
        </g>
        <g id="hand-container">
          <path
            id="hand"
            transform="translate(500.000000,511.000000) scale(1,1) rotate(-45)"
            d="M -188.272 -6.528 C -188.272 -6.528 -87.472 186.128 -87.472 186.128 C -87.472 186.128 -67.558 222.894 -23.132 232.086 C 21.294 241.276 96.438 230.214 96.438 230.214 C 96.438 230.214 176.018 229.022 188.272 141.704 C 188.272 141.704 186.914 -35.708 186.914 -35.708 C 186.914 -35.708 166.996 -100.36 120.186 -53.626 C 120.186 -53.626 109.636 -120.086 53.806 -71.744 C 53.806 -71.744 41.55 -123.49 -14.278 -89.446 C -14.278 -89.446 -16.322 -205.872 -16.322 -205.872 C -16.322 -205.872 -18.364 -237.19 -51.046 -241.276 C -51.046 -241.276 -78.96 -236.508 -83.726 -207.912 C -83.726 -207.912 -83.726 16.766 -83.726 16.766 C -83.726 16.766 -135.542 -64.546 -188.272 -6.528 z"
          />
        </g>
      </g>
      <animateTransform
        xlinkHref="#all"
        id="hand-move"
        attributeName="transform"
        type="translate"
        from="0 200"
        to="0 -200"
        begin="0"
        dur={`${duration}s`}
        calcMode="spline"
        keySplines="0.4, 0, 0.2, 1"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref="#trail"
        attributeName="d"
        values="
        M 57.375 -74.775 C 57.375 -74.775 57.375 -73.608 57.375 -73.608 C 57.375 -41.942 31.665 -16.233 0 -16.233 C 0 -16.233 0 -16.233 0 -16.233 C -31.665 -16.233 -57.375 -41.942 -57.375 -73.608 C -57.375 -73.608 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z;
        M 57.375 -74.775 C 57.375 -74.775 57.375 -73.608 57.375 -73.608 C 57.375 -41.942 31.665 -16.233 0 -16.233 C 0 -16.233 0 -16.233 0 -16.233 C -31.665 -16.233 -57.375 -41.942 -57.375 -73.608 C -57.375 -73.608 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z;
        M 57.375 -74.775 C 57.375 -74.775 57.375 194.844 57.375 194.844 C 57.375 226.509 31.665 252.219 0 252.219 C 0 252.219 0 252.219 0 252.219 C -31.665 252.219 -57.375 226.509 -57.375 194.844 C -57.375 194.844 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z;
        M 57.375 -74.775 C 57.375 -74.775 57.375 -73.608 57.375 -73.608 C 57.375 -41.942 31.665 -16.233 0 -16.233 C 0 -16.233 0 -16.233 0 -16.233 C -31.665 -16.233 -57.375 -41.942 -57.375 -73.608 C -57.375 -73.608 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z;
        M 57.375 -74.775 C 57.375 -74.775 57.375 -73.608 57.375 -73.608 C 57.375 -41.942 31.665 -16.233 0 -16.233 C 0 -16.233 0 -16.233 0 -16.233 C -31.665 -16.233 -57.375 -41.942 -57.375 -73.608 C -57.375 -73.608 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z"
        begin="0s"
        dur={`${duration}s`}
        fill="freeze"
        keyTimes="0; 0.2; 0.5; 0.8; 1"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref="#hand"
        attributeName="opacity"
        values="0; 1; 1; 0"
        begin="0s"
        dur={`${duration}s`}
        keyTimes="0; 0.1; 0.9; 1"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref="#trail"
        attributeName="opacity"
        values="0; 0; 1; 1; 0; 0"
        begin="0s"
        dur={`${duration}s`}
        keyTimes="0; 0.1; 0.2; 0.8; 0.9; 1"
        repeatCount="indefinite"
      />
      {/* circle-bottom M 57.375 74.348 C 57.375 74.348 57.375 74.775 57.375 74.775 C 57.375 106.44 31.665 132.15 0 132.15 C 0 132.15 0 132.15 0 132.15 C -31.665 132.15 -57.375 106.44 -57.375 74.775 C -57.375 74.775 -57.375 74.348 -57.375 74.348 C -57.375 42.683 -31.665 16.973 0 16.973 C 0 16.973 0 16.973 0 16.973 C 31.665 16.973 57.375 42.683 57.375 74.348 Z */}
      {/* full-trail M 57.375 -74.7747 C 57.375 -74.7747 57.375 74.7747 57.375 74.7747 C 57.375 106.44 31.6652 132.1497 0 132.1497 C 0 132.1497 0 132.1497 0 132.1497 C -31.6652 132.1497 -57.375 106.44 -57.375 74.7747 C -57.375 74.7747 -57.375 -74.7747 -57.375 -74.7747 C -57.375 -106.44 -31.6652 -132.1497 0 -132.1497 C 0 -132.1497 0 -132.1497 0 -132.1497 C 31.6652 -132.1497 57.375 -106.44 57.375 -74.7747 z */}
      {/* circle-top M 57.375 -74.775 C 57.375 -74.775 57.375 -74.766 57.375 -74.766 C 57.375 -43.101 31.665 -17.391 0 -17.391 C 0 -17.391 0 -17.391 0 -17.391 C -31.665 -17.391 -57.375 -43.101 -57.375 -74.766 C -57.375 -74.766 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z */}
      {/* trail-long M 57.375 -74.775 C 57.375 -74.775 57.375 194.844 57.375 194.844 C 57.375 226.509 31.665 252.219 0 252.219 C 0 252.219 0 252.219 0 252.219 C -31.665 252.219 -57.375 226.509 -57.375 194.844 C -57.375 194.844 -57.375 -74.775 -57.375 -74.775 C -57.375 -106.44 -31.665 -132.15 0 -132.15 C 0 -132.15 0 -132.15 0 -132.15 C 31.665 -132.15 57.375 -106.44 57.375 -74.775 Z */}
    </svg>
  )
})
