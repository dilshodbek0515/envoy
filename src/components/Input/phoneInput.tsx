import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { MaskedTextInput, MaskedTextInputProps } from 'react-native-mask-text'
import { IThemeColors } from '@/theme/color'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import AppText from '../text'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Closed from '@/assets/icons/close'

const AppPhoneInput = ({
  label = 'Telefon raqam',
  ...props
}: MaskedTextInputProps & { label?: string }) => {
  const Colors = useThemeColor()
  const [active, setActive] = useState(false)
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
  const activeColor = active ? Colors.primary : Colors.borderColor
  const length = (props.value ?? '').length

  const prefixAnimatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(active || length > 0 ? 1 : 0.8, { duration: 250 })
    const opacity = withTiming(active || length > 0 ? 1 : 0, { duration: 250 })
    return {
      opacity,
      transform: [{ scale }]
    }
  })

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

  const animatedCloseBoxStyle = useAnimatedStyle(() => {
    const opacity = withTiming(length > 0 ? 1 : 0, { duration: 200 })
    const translateX = withTiming(length > 0 ? 0 : 30, { duration: 200 })

    return {
      opacity,
      transform: [{ translateX }]
    }
  })

  return (
    <View
      style={[
        styles(Colors).inputBox,
        { borderColor: active ? Colors.primary : Colors.borderColor }
      ]}
    >
      <Animated.View style={[styles(Colors).prefixBox, prefixAnimatedStyle]}>
        <View style={styles(Colors).prefix}>
          <AppText>+998</AppText>
        </View>
        <View
          style={{
            width: 1,
            backgroundColor: active ? Colors.primary : Colors.borderColor,
            marginVertical: 15
          }}
        />
      </Animated.View>

      <MaskedTextInput
        style={styles(Colors).input}
        mask='99 999-99-99'
        placeholderTextColor={Colors.textSecondary}
        keyboardType='phone-pad'
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
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

      <Animated.View style={[styles(Colors).inputRightBox]}>
        <AnimatedPressable
          onPress={() => {
            props.onChangeText?.('', '')
          }}
          style={[
            styles(Colors).eyeButton,
            {
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

export default AppPhoneInput

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    inputBox: {
      height: 55,
      borderRadius: 20,
      borderWidth: 1,
      paddingLeft: Screens.width * 0.21,
      borderColor: Colors.borderColor,
      flexDirection: 'row',
      gap: Spacing.horizontal
    },

    input: {
      flex: 1,
      color: Colors.textPrimary
    },

    prefixBox: {
      paddingLeft: Spacing.horizontal,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.horizontal,
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 55
    },

    prefix: {
      justifyContent: 'center',
      alignItems: 'center'
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
      width: 55,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    eyeButton: {
      width: 55,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
