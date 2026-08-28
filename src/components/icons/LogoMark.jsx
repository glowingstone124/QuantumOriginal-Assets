export default function LogoMark({ size = 38 }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 6 L51 18 V42 L30 54 L9 42 V18 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 18 L30 30 L51 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M30 30 V54"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.7"
      />
      <rect
        x="25"
        y="2.5"
        width="10"
        height="10"
        fill="var(--primary)"
        transform="rotate(45 30 7.5)"
      />
      <circle cx="51" cy="42" r="3" fill="currentColor" opacity="0.65" />
      <circle cx="9" cy="42" r="3" fill="currentColor" opacity="0.65" />
    </svg>
  )
}
