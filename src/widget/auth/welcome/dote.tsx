import { StyleSheet, View } from 'react-native'
import { welcomeStyle } from '../../style'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle
} from 'react-native-reanimated'
import { Colors, Screens } from '../../../shared/tokens'
import { welcomeData } from './data'
export default function WelcomeDoteBox ({ ScrollX }: any) {
  return (
    <View style={welcomeStyle.doteBox}>
      {welcomeData?.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const a = [
            (index - 1) * Screens.width,
            index * Screens.width,
            (index + 1) * Screens.width
          ]

          const width = interpolate(
            ScrollX.value,
            a,
            [30, Screens.width * 0.6, 30],
            Extrapolate.CLAMP
          )

          const backgroundColor = interpolateColor(ScrollX.value, a, [
            '#333',
            Colors.primary,
            '#333'
          ])

          return { width, backgroundColor }
        })

        return (
          <Animated.View
            key={index}
            style={[welcomeStyle.dote, animatedStyle]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({})
