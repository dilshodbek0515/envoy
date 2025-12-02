import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export interface IconProps {
  size?: number
  color?: string
}

const ThemeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#33363F',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <Path
        d='M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636L7.05 7.05'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
    </Svg>
  )
}

export default ThemeIcon
