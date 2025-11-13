interface HandshakeIconProps {
  className?: string
  size?: number
}

export const HandshakeIcon = ({ className = '', size = 24 }: HandshakeIconProps) => {
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
        d="M11 12H9C8.44772 12 8 12.4477 8 13V15C8 15.5523 8.44772 16 9 16H11M11 12H13C13.5523 12 14 12.4477 14 13V15C14 15.5523 13.5523 16 13 16H11M11 12V10M11 12V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 8L5 10L7 12M17 8L19 10L17 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4C10.3431 4 9 5.34315 9 7V9C9 9.55228 9.44772 10 10 10H14C14.5523 10 15 9.55228 15 9V7C15 5.34315 13.6569 4 12 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

