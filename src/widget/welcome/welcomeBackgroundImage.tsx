import { Image, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { welcomeData } from './data'
import { Screens } from '../../shared/tokens'

export default function WelcomeBackgroundImage ({
  activePage,
  welcomeScrollX
}: {
  activePage: number
  welcomeScrollX: any
}) {
  const AnimatedImage = Animated.createAnimatedComponent(Image)
  const imageOpacity = { active: 1, inactive: 0 }

  return (
    <View style={styles.container}>
      {welcomeData?.map((page, index) => {
        const AnimatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * Screens.width,
            index * Screens.width,
            (index + 1) * Screens.width
          ]

          const opacity = interpolate(welcomeScrollX.value, inputRange, [
            imageOpacity.inactive,
            imageOpacity.active,
            imageOpacity.inactive
          ])
          return { opacity }
        })
        return (
          <AnimatedImage
            key={index}
            source={page.img}
            resizeMode='cover'
            blurRadius={100}
            style={[styles.image, AnimatedStyle]}
          />
        )
      })}

      <View
        style={{
          backgroundColor: '#191919e3',
          position: 'absolute',
          width: Screens.width,
          height: Screens.height
        }}
      />

      <Image
        source={welcomeData[activePage]?.img}
        style={{ zIndex: -1 }}
        blurRadius={1000}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Screens.width,
    height: Screens.height,
    overflow: 'hidden',
    zIndex: -10
  },
  image: {
    position: 'absolute',
    width: Screens.width,
    height: Screens.height
  }
})
