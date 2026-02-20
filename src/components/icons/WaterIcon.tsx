interface WaterIconProps {
  className?: string
  size?: number
}

export const WaterIcon = ({ className = '', size = 24 }: WaterIconProps) => {
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
        d="M12 2.69L5.69 9C2.61 12.08 2.61 17.08 5.69 20.16C8.77 23.24 13.77 23.24 16.85 20.16C19.93 17.08 19.93 12.08 16.85 9L12 2.69Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
