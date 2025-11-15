import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type Props = {
  size?: number
  color?: string
  direction?: 'left' | 'right' | 'up' | 'down'
  type?: 'arrow' | 'chevron'
}

export default function ArrowIcon ({
  size = 16,
  color = '#222',
  direction = 'left',
  type = 'arrow'
}: Props) {
  const rotation = React.useMemo(() => {
    switch (direction) {
      case 'left':
        return '180deg'
      case 'right':
        return '0deg'
      case 'up':
        return '-90deg'
      case 'down':
        return '90deg'
    }
  }, [direction])

  return (
    <View style={{ transform: [{ rotate: rotation }] }}>
      {type === 'arrow' ? (
        <Svg
          width={size}
          height={(size * 14) / 16}
          viewBox='0 0 16 14'
          fill={'none'}
        >
          <Path
            d='M8 1L14 7L8 13M14 7H1.5'
            stroke={color}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </Svg>
      ) : (
        <Svg
          width={size}
          height={(size * 14) / 16}
          viewBox='0 0 16 14'
          fill={'none'}
        >
          <Path
            d='M6 1L12 7L6 13'
            stroke={color}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </Svg>
      )}
    </View>
  )
}
