function Moon() {
  return (
    <svg className="moon">
      <defs>
        <mask id="crescentClip">
          <circle cx="50%" cy="50%" r="50%" fill="#fff" />
          <circle cx="80%" cy="32%" r="50%" fill="#000" />
        </mask>
      </defs>
      <circle cx="50%" cy="50%" r="50%" fill="#fff" mask="url(#crescentClip)" />
    </svg>
  )
}

export default Moon
