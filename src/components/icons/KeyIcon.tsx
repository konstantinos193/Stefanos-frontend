interface KeyIconProps {
  className?: string
  size?: number
}

export const KeyIcon = ({ className = '', size = 24 }: KeyIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.2 10.1V32l21.9-21.9H44.2zm3 3h11.7L47.2 24.8V13.1zm-3-3V32l21.9-21.9H44.2zm3 3h11.7L47.2 24.8V13.1zm-3-3V32l21.9-21.9H44.2zm3 3h11.7L47.2 24.8V13.1zM88.5 0h-49c-3.9 0-7 3.1-7 7v39.7c0 3.9 3.1 7 7 7h6v11.4h7.1v5.4l3.8 9.9-6.7 7.8v6.5l6.3 6.4-5.5 4.7 5.5 4.8-5.6 4.9L64.7 128l11.3-9.8V63.1h6.4v-9.4h6c3.9 0 7-3.1 7-7V7c.1-3.9-3.1-7-6.9-7zM91 46.6c0 1.4-1.1 2.5-2.5 2.5H78v9.4h-6.4v57.6l-3.7 3.2V50.6h-3v71.3l-.2.1-7.4-6.6 5.7-4.9-5.5-4.7 5.2-4.5-8.4-8.5v-3l7.4-8.6-4.5-11.6v-9.1H50V49.2H39.5c-1.4 0-2.5-1.1-2.5-2.5V7c0-1.4 1.1-2.5 2.5-2.5h48.9C89.9 4.5 91 5.6 91 7v39.6z"
        fill="currentColor"
      />
    </svg>
  )
}

