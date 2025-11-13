interface ScalesIconProps {
  className?: string
  size?: number
}

export const ScalesIcon = ({ className = '', size = 24 }: ScalesIconProps) => {
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
        d="M12 2V22M12 2L8 6H16L12 2ZM12 2L16 6H8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10H18M6 10C6 12.2091 7.79086 14 10 14C12.2091 14 14 12.2091 14 10M18 10C18 12.2091 16.2091 14 14 14C11.7909 14 10 12.2091 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


