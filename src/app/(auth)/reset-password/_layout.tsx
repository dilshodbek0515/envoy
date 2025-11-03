import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const ResetPasswordLayout = () => {
  const Colors = useThemeColor()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground }
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='sms-code' />
      <Stack.Screen name='new-password' />
    </Stack>
  )
}

export default ResetPasswordLayout
