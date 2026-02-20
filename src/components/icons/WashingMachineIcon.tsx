interface WashingMachineIconProps {
  className?: string
  size?: number
}

export const WashingMachineIcon = ({ className = '', size = 24 }: WashingMachineIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="14"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="7"
        cy="7"
        r="1"
        fill="currentColor"
      />
      <circle
        cx="17"
        cy="7"
        r="1"
        fill="currentColor"
      />
    </svg>
  )
}
