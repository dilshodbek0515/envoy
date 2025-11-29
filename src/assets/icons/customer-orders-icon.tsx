import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface SvgComponentProps {
  size?: number
  color?: string
}

const CustomerOrdersIcon: React.FC<SvgComponentProps> = ({
  size = 24,
  color = '#33363F',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M12 21v-8m0 8l-6.162-4.402c-.411-.293-.616-.44-.727-.655C5 15.728 5 15.475 5 14.971V8m7 13l6.163-4.402c.41-.293.615-.44.726-.655.111-.215.111-.468.111-.972V8m-7 5L5 8m7 5l7-5M5 8l5.838-4.17c.56-.4.842-.601 1.162-.601.32 0 .601.2 1.162.601L19 8'
        stroke={color}
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export default CustomerOrdersIcon
