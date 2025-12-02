import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export interface IconProps {
  size?: number
  color?: string
}

const LanguageIcon: React.FC<IconProps> = ({
  size = 40,
  color = '#111',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 40 40' fill='none' {...props}>
      <Path
        d='M3.333 8.333h23.334M15 3.333v5m6.667 0c-2.222 8.89-7.222 15-15 18.334M10 15c2.222 4.444 5.556 7.778 10 10m1.667 11.667L30 18.333l8.334 18.334m-2.334-5H24'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export default LanguageIcon
