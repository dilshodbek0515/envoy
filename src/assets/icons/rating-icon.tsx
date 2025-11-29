import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

interface SvgProps {
  size?: number // Svg width va height uchun
  color?: string // Path va Rect stroke rangi uchun
}

const RatingIcon: React.FC<SvgProps> = ({
  size = 24,
  color = '#33363F',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M8 10v6M12 12v4M16 8v8'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Rect
        x={3}
        y={4}
        width={18}
        height={16}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

export default RatingIcon
