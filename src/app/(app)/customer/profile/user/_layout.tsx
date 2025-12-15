import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'
import { StatusBar } from 'expo-status-bar'

export default function UserLayout () {
  const Colors = useThemeColor()
  return (
    <>
      <StatusBar style='light' backgroundColor='transparent' />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.pageBackground }
        }}
      />
    </>
  )
}
