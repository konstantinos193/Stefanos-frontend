interface RefreshIconProps {
  className?: string
  size?: number
}

export const RefreshIcon = ({ className = '', size = 24 }: RefreshIconProps) => {
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
        d="M1 4V10H7M23 20V14H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.49 9C20.0173 7.56678 19.2399 6.2854 18.2399 5.27541C17.2398 4.26543 16.0501 3.55976 14.772 3.22426C13.494 2.88875 12.1761 2.93334 10.9204 3.35427C9.66472 3.77521 8.51525 4.56091 7.59297 5.62955C6.67068 6.69819 6.00827 8.01119 5.66679 9.43289C5.32531 10.8546 5.31549 12.3363 5.63827 13.7632C5.96105 15.1901 6.60649 16.5125 7.516 17.6L1 24M23 0L16.484 6.4C17.3935 7.48752 18.039 8.80993 18.3617 10.2368C18.6845 11.6637 18.6747 13.1454 18.3332 14.5671C17.9917 15.9888 17.3293 17.3018 16.407 18.3705C15.4848 19.4391 14.3353 20.2248 13.0796 20.6457C11.8239 21.0667 10.506 21.1113 9.22798 20.7757C7.94993 20.4402 6.76019 19.7346 5.7601 18.7246"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


