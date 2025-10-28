import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '@/components/text'
import { AppRoutes } from '@/constants/routes'
import { router } from 'expo-router'
import PageHeader from '@/components/header/PageHeader'
import { useAtomValue } from 'jotai'
import { resetPasswordSms } from '.'
import useThemeColor from '@/theme/useTheme'
import { Screens } from '@/shared/tokens'

const ResetPasswordSmsCode = () => {
  const smsCode = useAtomValue(resetPasswordSms)
  const [inputCode, setInputCode] = useState(' ')
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
      setInputCode(prev => prev + value)
    }
  }

  console.log('sms', smsCode)

  useEffect(() => {
    if (inputCode.length > 3) {
      if (inputCode === smsCode) {
        router.replace(AppRoutes.auth.resetPassword.newPassword)
      }
    }
  }, [inputCode])

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Parolni tiklash' isEnabledBack />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[1, 2, 3, 4].map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Colors.Boxbackground,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AppText style={{ fontSize: 30 }}>{inputCode[index]}</AppText>
              </View>
            )
          })}
        </View>

        <View style={{ width: Screens.width, gap: 1 }}>
          {buttons.map((row, index) => (
            <View key={index} style={{ flexDirection: 'row', gap: 1 }}>
              {row.map((button, index) => (
                <Pressable
                  onPress={() => handlePress(button.toString())}
                  style={{
                    flex: 1,
                    height: 50,
                    backgroundColor: Colors.Boxbackground,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  key={button}
                >
                  <AppText>{button.toString()}</AppText>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default ResetPasswordSmsCode

const styles = StyleSheet.create({})
