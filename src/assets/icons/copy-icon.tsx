import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface SvgProps {
  size?: number // width + height
  color?: string // stroke color
}

const CopyIcon: React.FC<SvgProps> = ({
  size = 24,
  color = '#33363F',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Path d='M15 3H9a4 4 0 00-4 4v8' stroke={color} strokeWidth={2} />

      <Path
        d='M13.5 7c1.196 0 2.01.002 2.628.071.598.068.889.188 1.09.342.138.106.262.23.369.37.154.2.274.491.342 1.09.07.617.071 1.431.071 2.627v4c0 1.196-.002 2.01-.071 2.628-.068.598-.188.889-.342 1.09-.107.138-.23.262-.37.369-.2.154-.491.274-1.09.342-.617.07-1.431.071-2.627.071-1.196 0-2.01-.002-2.628-.071-.598-.068-.889-.188-1.09-.342a2.002 2.002 0 01-.369-.37c-.154-.2-.274-.491-.342-1.09C9.001 17.51 9 16.697 9 15.5v-4c0-1.196.002-2.01.071-2.628.068-.598.188-.889.342-1.09a2 2 0 01.37-.369c.2-.154.491-.274 1.09-.342C11.49 7.001 12.303 7 13.5 7z'
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

export default CopyIcon
