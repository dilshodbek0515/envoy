import { Dimensions } from 'react-native'

export const Screens = Dimensions.get('screen')

export const Spacing = {
  horizontal: Screens.width * 0.04
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
