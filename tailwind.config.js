import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export const content = [
  './**/*.html',
  "./src/**/*.{html,js,ts,jsx,tsx,vue}",
]
export const theme = {
  container: {
    center: true,
    padding: '1.25rem',
  },
  colors: {
    blue: '#1b3252',
    red: colors.red,
    accent: '#ff874a',
    transparent: 'transparent',
    white: colors.white,
    black: colors.black,
    gray: colors.gray,
  },
  extend: {
    fontFamily: {
      'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
}
export const plugins = []
