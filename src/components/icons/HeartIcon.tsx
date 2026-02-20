interface HeartIconProps {
  className?: string
  size?: number
}

export const HeartIcon = ({ className = '', size = 24 }: HeartIconProps) => {
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
        d="M20.84 4.61C20.3292 4.09899 19.7228 3.69257 19.0554 3.41208C18.3879 3.13159 17.6725 2.98201 16.95 2.98201C16.2275 2.98201 15.5121 3.13159 14.8446 3.41208C14.1772 3.69257 13.5708 4.09899 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.12831 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.12831 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.8717 11.3583 22.4513 9.95903 22.4513 8.5C22.4513 7.04097 21.8717 5.64169 20.84 4.61Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
