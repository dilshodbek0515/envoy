import { Colors } from '@/shared/tokens'
import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

// Props interfeysi
interface EyeCloseIconProps extends SvgProps {
  size?: number
  color?: string
}

const EyeCloseIcon: React.FC<EyeCloseIconProps> = ({
  size = 24,
  color = Colors.borderColor,
  ...props
}) => (
  <Svg width={size} height={size} fill='none' {...props}>
    <Path
      fill={color}
      d='M21.488 15.469a.563.563 0 1 1-.976.562l-1.875-3.288a11.438 11.438 0 0 1-3.657 1.695l.579 3.47a.561.561 0 0 1-.919.521.563.563 0 0 1-.191-.335l-.574-3.428a12.086 12.086 0 0 1-3.75 0l-.57 3.428a.562.562 0 0 1-1.11-.188l.578-3.468a11.437 11.437 0 0 1-3.656-1.696l-1.879 3.29a.564.564 0 0 1-.976-.563l1.954-3.42a14.255 14.255 0 0 1-1.904-1.947.563.563 0 0 1 .876-.707c1.581 1.96 4.35 4.293 8.562 4.293s6.98-2.334 8.562-4.291a.562.562 0 1 1 .876.706 14.25 14.25 0 0 1-1.904 1.948l1.954 3.418Z'
    />
  </Svg>
)

export default EyeCloseIcon
