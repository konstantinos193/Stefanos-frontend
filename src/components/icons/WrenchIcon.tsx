interface WrenchIconProps {
  className?: string
  size?: number
}

export const WrenchIcon = ({ className = '', size = 24 }: WrenchIconProps) => {
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
        d="M14.7 6.3C15.0905 6.69053 15.0905 7.32369 14.7 7.71421L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071L7.29289 11.7071C6.90237 11.3166 6.90237 10.6834 7.29289 10.2929L12.2858 5.3C12.6763 4.90948 13.3095 4.90948 13.7 5.3L14.7 6.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10L6 14L10 18L14 14L10 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 5L18 6L17 5L18 4L19 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

