import { useAtomValue } from 'jotai'
import { themeAtom } from './theme'
import { darkColors, lightColors } from './color'

export default function useThemeColor () {
  const theme = useAtomValue(themeAtom)

  return theme === 'light' ? lightColors : darkColors
}
