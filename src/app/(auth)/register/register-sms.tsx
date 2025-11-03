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
const RegisterSms = () => {
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
        router.replace(AppRoutes.auth.register.registerInfo)
      } else {
        setInputCode('')
      }
    }
  }, [inputCode])

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Parolni tiklash' isEnabledBack />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 250
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
                    backgroundColor: Colors.Boxbackground
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
              variant='medium'
              style={{
                color: Colors.primary,
                fontSize: 18
              }}
            >
              Qayta sms yuboring
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
