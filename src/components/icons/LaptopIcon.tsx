interface LaptopIconProps {
  className?: string
  size?: number
}

export const LaptopIcon = ({ className = '', size = 24 }: LaptopIconProps) => {
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
        d="M3 20H21M5 18H19C19.5523 18 20 17.5523 20 17V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

