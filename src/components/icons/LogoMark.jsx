export default function LogoMark({ size = 36 }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer Hexagonal Geometric Prism */}
      <path
        d="M32 6 L54 18.5 V43.5 L32 56 L10 43.5 V18.5 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="miter"
      />
      {/* Inner Isometric Wireframe Faces */}
      <path
        d="M10 18.5 L32 31 L54 18.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        opacity="0.75"
      />
      <path
        d="M32 31 V56"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.75"
      />
      {/* Primary Diamond Top Accent */}
      <polygon
        points="32,2.5 37.5,8 32,13.5 26.5,8"
        fill="var(--primary)"
      />
      {/* Node Vertices */}
      <rect x="52" y="41.5" width="4" height="4" fill="currentColor" opacity="0.8" />
      <rect x="8" y="41.5" width="4" height="4" fill="currentColor" opacity="0.8" />
    </svg>
  )
}
