interface ChatIconProps {
  className?: string
  size?: number
}

export const ChatIcon = ({ className = '', size = 24 }: ChatIconProps) => {
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
        d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C10.4607 21 9.01172 20.6565 7.74467 20.0511L3 21L3.94926 16.2558C3.34394 14.9887 3 13.5397 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

