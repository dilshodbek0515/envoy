import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native'
import React, { useState } from 'react'
import { IThemeColors } from '@/theme/color'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import EyeCloseIcon from '@/assets/icons/icon-closesd'
import EyeOpendIcon from '@/assets/icons/icon-open'
import { vibration } from '@/utils/haptics'
import Closed from '@/assets/icons/close'

interface IProps {
  label: string
  isPassword: boolean
}

const AppInput = ({ label, isPassword, ...props }: TextInputProps & IProps) => {
  const Colors = useThemeColor()
  const [active, setActive] = useState(false)
  const length = (props.value ?? '').length
  const [isSecurity, setIsSecurity] = useState<boolean>(false)
  const activeColor = active ? Colors.primary : Colors.borderColor

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(active || length > 0 ? '-240%' : '-50%', {
      duration: 180
    })

    const translateX = withTiming(active || length > 0 ? -5 : 0, {
      duration: 180
    })

    const fontSize = withTiming(active || length > 0 ? 12 : 16, {
      duration: 180
    })

    const paddingHorizontal = withTiming(active || length > 0 ? 7 : 0, {
      duration: 180
    })
    return {
      transform: [{ translateY }, { translateX }],
      fontSize,
      paddingHorizontal
    }
  })

  const animatedRightBoxStyle = useAnimatedStyle(() => {
    const translateX = withTiming(length <= 0 ? 55 : 0, { duration: 300 })

    return {
      transform: [{ translateX }]
    }
  })

  const animatedCloseBoxStyle = useAnimatedStyle(() => {
    const opacity = withTiming(length <= 0 ? 0 : 1, {
      duration: length <= 0 ? 300 : 1000
    })
    return { opacity }
  })

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  return (
    <View style={[styles(Colors).inputBox, { borderColor: activeColor }]}>
      <TextInput
        placeholderTextColor={Colors.textSecondary}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={styles(Colors).input}
        {...props}
        secureTextEntry={isSecurity && isPassword}
      />

      <Animated.Text
        onPress={() => setActive(true)}
        style={[
          {
            color: active ? Colors.primary : Colors.textSecondary
          },
          styles(Colors).label,
          labelAnimatedStyle
        ]}
      >
        {label}
      </Animated.Text>

      <Animated.View
        style={[
          styles(Colors).inputRightBox,
          animatedRightBoxStyle,
          { width: isPassword ? 110 : 55 }
        ]}
      >
        <Pressable
          onPress={() => {
            setIsSecurity($ => !$)
            vibration.light
          }}
          style={styles(Colors).eyeButton}
        >
          {isSecurity ? (
            <EyeCloseIcon color={activeColor} />
          ) : (
            <EyeOpendIcon color={activeColor} />
          )}
        </Pressable>

        <AnimatedPressable
          onPress={() => {
            props.onChangeText?.('')
          }}
          style={[
            styles(Colors).eyeButton,
            {
              borderLeftWidth: 1,
              borderColor: activeColor,
              marginVertical: 10
            },
            animatedCloseBoxStyle
          ]}
        >
          <Closed color={activeColor} />
        </AnimatedPressable>
      </Animated.View>
    </View>
  )
}

export default AppInput

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    inputBox: {
      height: 55,
      borderRadius: 20,
      borderWidth: 1,
      paddingLeft: Spacing.horizontal,
      flexDirection: 'row',
      gap: Spacing.horizontal
    },

    input: {
      flex: 1,
      color: Colors.textPrimary
    },

    label: {
      position: 'absolute',
      top: '50%',
      left: Spacing.horizontal,
      backgroundColor: Colors.pageBackground,
      fontSize: 16,
      borderRadius: 100
    },

    inputRightBox: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: 53,
      width: 110,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    eyeButton: {
      // height: 53,
      width: 55,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
