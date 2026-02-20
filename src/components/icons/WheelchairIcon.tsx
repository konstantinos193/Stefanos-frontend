interface WheelchairIconProps {
  className?: string
  size?: number
}

export const WheelchairIcon = ({ className = '', size = 24 }: WheelchairIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="5"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 12H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 12L16 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 12L8 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="8"
        cy="19"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="16"
        cy="19"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M11 19H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
