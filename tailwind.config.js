import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export const content = [
  './*.html',
  "./src/**/*.{html,js,ts,jsx,tsx}",
]
export const theme = {
  container: {
    center: true,
    padding: '1.25rem',
  },
  colors: {
    blue: '#1b3252',
    accent: '#ff874a',
    transparent: 'transparent',
    white: colors.white,
    black: colors.black,
    gray: colors.gray,
  },
  extend: {},
}
export const plugins = []

