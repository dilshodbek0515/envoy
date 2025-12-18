import { themeAtom } from '@/theme/theme'
import { useAtomValue } from 'jotai'
import { Dimensions } from 'react-native'

export const Screens = Dimensions.get('screen')

export const Spacing = {
  horizontal: Screens.width * 0.03
}

export const Radius = {
  primary: 5,
  input: 20
}

export const Colors = {
  secondary: '#000',
  primary: '#00ABE5',
  boxBackground: '#2a2a2a',
  borderColor: '#3a3a3a',
  white: '#fff',
  green: '#00ff4c',
  yellow: '#ffbd59',
  red: '#ff0000'
}

export const Fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold'
}

export const useAndroidRipple = (color?: string) => {
  const theme = useAtomValue(themeAtom)
  const localColor = theme === 'dark' ? '#00BEFF33' : '#0001'

  return {
    color: color || localColor,
    borderless: false,
    radius: -0.5,
    foreground: true
  }
}
