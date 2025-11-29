import { StyleSheet, View } from 'react-native'
import React from 'react'
import useThemeColor from '@/theme/useTheme'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import AppText from '../text'
import { Screens } from '@/shared/tokens'

interface SmsCodeBoxProps {
  code: string
  animValues: any[]
  isCodeCorrect: boolean | null
}

const SmsCodeBox: React.FC<SmsCodeBoxProps> = ({
  code,
  animValues,
  isCodeCorrect
}) => {
  const Colors = useThemeColor()

  const borderColor = () => {
    if (isCodeCorrect === true) return 'green'
    if (isCodeCorrect === false) return 'red'
    return 'transparent'
  }

  const animatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      const visable = animValues[index].value === 1
      return {
        opacity: withTiming(visable ? 1 : 0, { duration: 300 }),
        transform: [
          { translateY: withTiming(visable ? 0 : 20, { duration: 300 }) },
          { scale: withTiming(visable ? 1 : 0.8, { duration: 100 }) }
        ]
      }
    })

  return (
    <View style={styles.minBox}>
      {[0, 1, 2, 3].map(i => (
        <View
          key={i}
          style={[
            styles.box,
            {
              borderColor: borderColor(),
              backgroundColor: Colors.Boxbackground
            }
          ]}
        >
          <Animated.View style={animatedStyle(i)}>
            <AppText style={styles.text}>{code[i] && ''}</AppText>
          </Animated.View>
        </View>
      ))}
    </View>
  )
}

export default SmsCodeBox

const styles = StyleSheet.create({
  minBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  box: {
    width: Screens.width * 0.2,
    height: Screens.width * 0.2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5
  },
  text: {
    fontSize: 22
  }
})
