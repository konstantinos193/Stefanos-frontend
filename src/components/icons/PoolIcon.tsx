interface PoolIconProps {
  className?: string
  size?: number
}

export const PoolIcon = ({ className = '', size = 24 }: PoolIconProps) => {
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
        d="M2 17C2 15.8954 2.89543 15 4 15H20C21.1046 15 22 15.8954 22 17V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V17Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 15V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
