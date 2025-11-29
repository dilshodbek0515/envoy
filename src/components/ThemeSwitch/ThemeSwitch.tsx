import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useThemeColor from '@/theme/useTheme'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import AppText from '../text'

const ThemeSwitch = ({
  isDark,
  onToggle
}: {
  isDark: boolean
  onToggle: () => void
}) => {
  const Colors = useThemeColor()
  const progress = useSharedValue(isDark ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isDark ? 1 : 0, { duration: 250 })
  }, [isDark])

  const sunStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - progress.value, { duration: 250 })
  }))

  const moonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 250 })
  }))
  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            padding: 3,
            overflow: 'hidden'
          }
        ]}
      >
        <Animated.View style={[sunStyle, { position: 'absolute' }]}>
          {/* <SunIcon size={28} color={Colors.textSecondary} /> */}
          <AppText style={{ fontSize: 24 }}>🌞</AppText>
        </Animated.View>
        <Animated.View style={[moonStyle, { position: 'absolute' }]}>
          {/* <MoonIcon size={28} color={Colors.textSecondary} /> */}
          <AppText style={{ fontSize: 24 }}>🌚</AppText>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

export default ThemeSwitch

const styles = StyleSheet.create({})
