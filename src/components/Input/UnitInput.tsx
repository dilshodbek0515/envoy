import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useThemeColor from '@/theme/useTheme'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { duration } from 'node_modules/zod/v4/core/regexes.cjs'

type TUnitInput = {
  label: string
} & TextInputProps

const UnitInput: React.FC<TUnitInput> = ({ label, value, ...props }) => {
  const [inputFocus, setInputFocus] = useState(false)
  const Colors = useThemeColor()
  const labelAnimation = useSharedValue(0)

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(labelAnimation.value, [0, 1], [17, -9.5]),
    color: interpolateColor(
      labelAnimation.value,
      [0, 1],
      [Colors.textSecondary, Colors.primary]
    )
  }))

  useEffect(() => {
    let show = inputFocus || value?.length
    labelAnimation.value = withTiming(show ? 1 : 0, { duration: 200 })
  }, [inputFocus])

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      labelAnimation.value,
      [0, 1],
      [Colors.borderColor, Colors.primary]
    )
  }))

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Text
        style={[
          styles.label,
          labelAnimatedStyle,
          { backgroundColor: Colors.pageBackground }
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        style={styles.input}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
    </Animated.View>
  )
}

export default UnitInput

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#fff'
  },
  input: {
    height: 55,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff'
  },
  label: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    left: 16,
    top: 17,
    paddingHorizontal: 4,
    borderRadius: 1000,
    zIndex: 5
  }
})
