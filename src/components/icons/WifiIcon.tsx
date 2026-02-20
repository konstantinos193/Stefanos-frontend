interface WifiIconProps {
  className?: string
  size?: number
}

export const WifiIcon = ({ className = '', size = 24 }: WifiIconProps) => {
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
        d="M5 12.55C7.92 10.24 11.44 9 15 9C18.56 9 22.08 10.24 25 12.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.42 9C5.82 5.62 11.31 4 17 4C22.69 4 28.18 5.62 32.58 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.53 16.11C10.67 14.83 13.33 14.83 15.47 16.11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="20"
        r="1"
        fill="currentColor"
      />
    </svg>
  )
}
