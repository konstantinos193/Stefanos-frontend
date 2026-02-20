interface UtensilsIconProps {
  className?: string
  size?: number
}

export const UtensilsIcon = ({ className = '', size = 24 }: UtensilsIconProps) => {
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
        d="M3 2V8C3 9.10457 3.89543 10 5 10C6.10457 10 7 9.10457 7 8V2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 2H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 15V22C21 22.5523 20.5523 23 20 23C19.4477 23 19 22.5523 19 22V15C19 13.8954 18.1046 13 17 13C15.8954 13 15 13.8954 15 15V22C15 22.5523 14.5523 23 14 23C13.4477 23 13 22.5523 13 22V15C13 12.7909 14.7909 11 17 11C19.2091 11 21 12.7909 21 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2V8C11 9.10457 10.1046 10 9 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
