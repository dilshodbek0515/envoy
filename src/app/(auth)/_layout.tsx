import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const AuthLayout = () => {
  const Colors = useThemeColor()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground }
      }}
    >
      <Stack.Screen name='index' />
      {/* <Stack.Screen name='auth' /> */}
      <Stack.Screen
        name='reset-password'
        options={{
          presentation: 'fullScreenModal'
        }}
      />
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})
