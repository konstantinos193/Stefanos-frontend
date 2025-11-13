interface PartyIconProps {
  className?: string
  size?: number
}

export const PartyIcon = ({ className = '', size = 24 }: PartyIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
      <circle
        cx="6"
        cy="18"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
      />
      <circle
        cx="18"
        cy="18"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
      />
    </svg>
  )
}


