interface CarIconProps {
  className?: string
  size?: number
}

export const CarIcon = ({ className = '', size = 24 }: CarIconProps) => {
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
        d="M5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V17Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 21V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 21V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 11H7.5L9.5 6H14.5L16.5 11H18C19.1046 11 20 11.8954 20 13V16H4V13C4 11.8954 4.89543 11 6 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.5"
        cy="18.5"
        r="1.5"
        fill="currentColor"
      />
      <circle
        cx="15.5"
        cy="18.5"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  )
}
