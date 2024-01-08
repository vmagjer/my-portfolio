import React, { useEffect, useRef } from "react"
import "./ParallaxView.css"
import AnimationController from "../utils/AnimationController"
import ScrollProgress from "../utils/ScrollProgress"

const ParallaxView = () => {
  const scrollView = useRef(null)

  useEffect(() => {
    // const scrollView = document.querySelector(".parallax-view")
    const scrollProgress = new ScrollProgress(scrollView.current)

    const cityAnimation = new AnimationController(
      updateView,
      scrollProgress,
      scrollView.current
    )

    return () => {
      cityAnimation.destroy()
    }
  }, [scrollView])

  return (
    <>
      <div className="view" ref={scrollView}>
        {/* an image of mountains and a sky with clouds */}
        <div className="sky" />
        {/* an image of a person acting as mask */}
        <div className="person" />
        {/* hills */}
        <div className="hills" />
        {/* hills */}
        <div className="hills" />
        {/* field with silhouette of traveller  */}
        <div className="field" />
      </div>
    </>
  )
}

function updateView(animationProgress) {
  // enlarge
}

export default ParallaxView
