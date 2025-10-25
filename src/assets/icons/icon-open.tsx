import { Colors } from '@/shared/tokens'
import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

// Props interfeysi
interface EyeOpendIconProps extends SvgProps {
  size?: number
  color?: string
}

const EyeOpendIcon: React.FC<EyeOpendIconProps> = ({
  size = 24,
  color = Colors.borderColor,
  ...props
}) => (
  <Svg width={size} height={size} fill='none' {...props}>
    <Path
      fill={color}
      d='M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18Zm0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6Zm0 2C14 8 16 10 16 12.5S14 17 11.5 17 7 15 7 12.5 9 8 11.5 8Zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z'
    />
  </Svg>
)

export default EyeOpendIcon
