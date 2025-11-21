/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'header-text': '#f3f4f6', // Very light gray (gray-100) for better visibility on dark header background
        'accent-blue': '#3b82f6', // Blue-500 equivalent
      },
    },
  },
  plugins: [],
}
