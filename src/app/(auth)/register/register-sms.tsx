import { Animated, Pressable, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import AppText from '@/components/text'
import { AppRoutes } from '@/constants/routes'
import { router } from 'expo-router'
import PageHeader from '@/components/header/PageHeader'
import { useAtomValue } from 'jotai'
import useThemeColor from '@/theme/useTheme'
import { Screens } from '@/shared/tokens'
import CountdownTimer from '@/widget/auth/login/timer'
import { resetPasswordSms } from '../reset-password'
import { vibration } from '@/utils/haptics'
import { resetPasswordPhone } from '@/service/user/controller/controller'
const RegisterSms = () => {
  const smsCode = useAtomValue(resetPasswordSms)
  const [inputCode, setInputCode] = useState('')
  const Colors = useThemeColor()
  const shakeAnim = useRef(new Animated.Value(0)).current
  const phoneNumber = useAtomValue(resetPasswordPhone)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      })
    ]).start()
  }

  useEffect(() => {
    if (inputCode.length === 4) {
      const timer = setTimeout(() => {
        if (inputCode === smsCode) {
          setIsSuccess(true)
          setTimeout(() => {
            router.replace(AppRoutes.auth.register.registerInfo)
          }, 400)
        } else {
          setIsError(true)
          startShake()
          setTimeout(() => {
            setInputCode('')
            setIsError(false)
            vibration.heavy
          }, 400)
        }
      }, 500)
      return () => clearTimeout(timer)
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

        <Animated.View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 300,
            transform: [{ translateX: shakeAnim }]
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
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.Boxbackground,
                    borderWidth: isError || isSuccess ? 1 : 0,
                    borderColor: isError
                      ? 'red'
                      : isSuccess
                      ? 'green'
                      : 'transparent'
                  }
                ]}
              >
                <AppText
                  style={{
                    fontSize: 30,
                    color: isError
                      ? 'red'
                      : isSuccess
                      ? 'green'
                      : Colors.textPrimary
                  }}
                >
                  {inputCode[index]}
                </AppText>
              </View>
            )
          })}
        </Animated.View>

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
                    onPress={() => {
                      handlePress(buttonValue.toString())
                      vibration.heavy()
                    }}
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

export default RegisterSms

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
          height: 60,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AppText style={{ fontSize: 20 }}>{label}</AppText>
      </Pressable>
    </Animated.View>
  )
}
