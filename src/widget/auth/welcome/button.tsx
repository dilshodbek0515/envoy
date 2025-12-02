import { Pressable, Text, View } from 'react-native'
import { welcomeStyle as styles } from '@/widget/style'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface Iprops {
  next: () => void
  back: () => void
  page: number
}

export default function WelcomeButton ({ next, back, page }: Iprops) {
  const backButtonWidth = useSharedValue(0)
  const backButtonOpacity = useSharedValue(0)
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  useEffect(() => {
    backButtonWidth.value = withTiming(page === 0 ? 0 : 55, { duration: 300 })
    backButtonOpacity.value = withTiming(page === 0 ? 0 : 1, { duration: 200 })
  }, [page])

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: backButtonWidth.value,
    opacity: backButtonOpacity.value
  }))
  return (
    <View style={styles.boxButton}>
      <Pressable style={styles.boshlashBtn} onPress={next}>
        <Text style={styles.boshlashBtnText}>Boshlash</Text>

        <AnimatedPressable
          style={[styles.backButton, backButtonAnimatedStyle]}
          onPress={back}
        >
          <Text style={{ color: '#fff' }}>@</Text>
        </AnimatedPressable>
      </Pressable>
    </View>
  )
}
