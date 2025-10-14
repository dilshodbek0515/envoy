import { Fonts } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { Text, TextProps } from 'react-native'

type TFont = keyof typeof Fonts

// type a = 'regular' | 'medium' | 'semiBold' | 'bold'

interface AppTextProps extends TextProps {
  variant?: TFont
}

export default function AppText ({
  variant = 'regular',
  style,
  ...props
}: AppTextProps) {
  const Colors = useThemeColor()

  return (
    <Text
      {...props}
      style={[{ fontFamily: Fonts[variant], color: Colors.textPrimary }, style]}
    />
  )
}
