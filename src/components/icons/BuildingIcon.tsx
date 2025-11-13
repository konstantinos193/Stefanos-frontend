interface BuildingIconProps {
  className?: string
  size?: number
}

export const BuildingIcon = ({ className = '', size = 24 }: BuildingIconProps) => {
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
        d="M3 21H21M5 21V7L12 3L19 7V21M9 9V13M15 9V13M9 17V19M15 17V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

