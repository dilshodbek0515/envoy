import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import AppText from '@/components/text'
import { AppRoutes } from '@/constants/routes'
import { router } from 'expo-router'
import PageHeader from '@/components/header/PageHeader'
import { useAtomValue } from 'jotai'
import { resetPasswordSms } from '.'
import useThemeColor from '@/theme/useTheme'
import { Colors, Screens } from '@/shared/tokens'
import CountdownTimer from '@/widget/auth/login/timer'
import { resetPasswordPhone } from '@/service/user/controller/controller'

const ResetPasswordSmsCode = () => {
  const phoneNumber = useAtomValue(resetPasswordPhone)
  const smsCode = useAtomValue(resetPasswordSms)
  const [inputCode, setInputCode] = useState('')
  const Colors = useThemeColor()

  const buttons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, 'del']
  ]

  const handlePress = (value: string) => {
    if (value === 'del') {
      setInputCode(prev => prev.slice(0, -1))
    } else {
      setInputCode(prev => {
        if (prev.length >= 4) return prev
        return prev + value
      })
    }
  }

  useEffect(() => {
    if (inputCode.length > 3) {
      if (inputCode === smsCode) {
        router.replace(AppRoutes.auth.resetPassword.newPassword)
      } else {
        setInputCode('')
      }
    }
  }, [inputCode])

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Sms kod' isEnabledBack />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AppText
          style={{
            position: 'absolute',
            top: 10,
            fontSize: 16
          }}
        >
          {phoneNumber || '+998 99 999 99 99'}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 300
          }}
        >
          {[1, 2, 3, 4].map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  {
                    width: 70,
                    height: 70,
                    borderRadius: 20,
                    backgroundColor: Colors.Boxbackground,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
                <AppText style={{ fontSize: 30 }}>{inputCode[index]}</AppText>
              </View>
            )
          })}
        </View>

        <View
          style={{
            width: Screens.width,
            position: 'absolute',
            bottom: 0,
            gap: 2
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.Boxbackground,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }}
          >
            <CountdownTimer />
            <AppText
              variant='regular'
              style={{
                color: Colors.textPrimary06,
                fontSize: 14
              }}
            >
              Qayta SMS jo'natish
            </AppText>
            <AppText />
          </View>

          <View style={{ gap: 2 }}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: 'row', gap: 2 }}>
                {row.map((buttonValue, index) => (
                  <AnimatedButton
                    key={buttonValue}
                    label={buttonValue.toString()}
                    onPress={() => handlePress(buttonValue.toString())}
                    color={Colors.Boxbackground}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default ResetPasswordSmsCode

// animated
const AnimatedButton = ({
  label,
  onPress,
  color
}: {
  label: string
  onPress: () => void
  color: string
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10
    }).start()
  }

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{
          height: 71,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AppText variant='semiBold' style={{ fontSize: 20 }}>
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  green: {
    borderWidth: 1,
    borderColor: Colors.green
  },
  red: {
    borderWidth: 1,
    borderColor: Colors.red
  }
})
