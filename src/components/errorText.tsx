import React from 'react'
import AppText from './text'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

const ErrorText = ({
  error,
  isVisable
}: {
  error: string
  isVisable: string | undefined | boolean
}) => {
  const AnimatedText = Animated.createAnimatedComponent(AppText)

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(isVisable ? 5 : 0, { duration: 200 })
    const opacity = withTiming(isVisable ? 1 : 0, { duration: 300 })
    return { transform: [{ translateY }], opacity }
  })

  return (
    <AnimatedText
      style={[{ color: 'red', fontSize: 12, marginTop: 4 }, animatedStyle]}
    >
      {error}
    </AnimatedText>
  )
}

export default ErrorText
