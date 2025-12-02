import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export interface IconProps {
  size?: number
  color?: string
}

const DeleteIcon: React.FC<IconProps> = ({
  size = 14,
  color = '#D91111',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none' {...props}>
      <Path
        d='M4.083 12.25c-.32 0-.595-.114-.823-.342a1.126 1.126 0 01-.343-.825V3.5h-.583V2.333H5.25V1.75h3.5v.583h2.917V3.5h-.583v7.583c0 .321-.115.596-.343.825a1.12 1.12 0 01-.824.342H4.084zM9.918 3.5H4.084v7.583h5.833V3.5zM5.25 9.917h1.167v-5.25H5.25v5.25zm2.333 0H8.75v-5.25H7.583v5.25z'
        fill={color}
      />
    </Svg>
  )
}

export default DeleteIcon
