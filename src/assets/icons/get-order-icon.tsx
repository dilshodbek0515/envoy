import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

interface SvgComponentProps {
  size?: number
  color?: string
}

const GetOrderIcon: React.FC<SvgComponentProps> = ({
  size = 24,
  color = '#222',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Circle cx={12} cy={12} r={9} stroke={color} />
      <Path d='M12 15V9M15 12H9' stroke={color} strokeLinecap='square' />
    </Svg>
  )
}

export default GetOrderIcon
