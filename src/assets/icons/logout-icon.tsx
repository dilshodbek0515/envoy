import * as React from "react"
import Svg, { Path } from "react-native-svg"

export interface IconProps {
  size?: number
  color?: string
}

const LogoutIcon: React.FC<IconProps> = ({ size = 14, color = "#D91111", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M7 1.75a.583.583 0 01.068 1.163L7 2.917H4.083a.583.583 0 00-.579.515L3.5 3.5v7a.583.583 0 00.515.58l.069.003h2.625a.583.583 0 01.068 1.163l-.069.004H4.083a1.75 1.75 0 01-1.747-1.647l-.002-.103v-7A1.75 1.75 0 013.98 1.753l.103-.003H7zm3.33 3.187l1.649 1.65a.583.583 0 010 .825l-1.65 1.65a.583.583 0 11-.825-.825l.654-.654H7a.583.583 0 010-1.166h3.158l-.654-.654a.583.583 0 01.825-.826z"
        fill={color}
      />
    </Svg>
  )
}

export default LogoutIcon
