interface ThermometerIconProps {
  className?: string
  size?: number
}

export const ThermometerIcon = ({ className = '', size = 24 }: ThermometerIconProps) => {
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
        d="M14 14.76V3.5C14 2.67 13.33 2 12.5 2C11.67 2 11 2.67 11 3.5V14.76C9.54 15.48 8.5 16.96 8.5 18.5C8.5 20.7 10.3 22.5 12.5 22.5C14.7 22.5 16.5 20.7 16.5 18.5C16.5 16.96 15.46 15.48 14 14.76Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12.5"
        cy="18.5"
        r="2.5"
        fill="currentColor"
      />
      <path
        d="M11 6H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
