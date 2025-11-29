import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

interface SvgComponentProps {
  size?: number
  color?: string
}

const SvgComponent: React.FC<SvgComponentProps> = ({
  size = 24,
  color = '#222',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Circle cx={12} cy={8} r={3.5} stroke={color} strokeLinecap='round' />
      <Path
        d='M4.85 16.948c.639-2.345 3.065-3.448 5.495-3.448h3.31c2.43 0 4.856 1.103 5.496 3.448a9.95 9.95 0 01.295 1.553c.06.55-.394.999-.946.999h-13c-.552 0-1.005-.45-.946-.998a9.94 9.94 0 01.295-1.554z'
        stroke={color}
        strokeLinecap='round'
      />
    </Svg>
  )
}

export default SvgComponent
