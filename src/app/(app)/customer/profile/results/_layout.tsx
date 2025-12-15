import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

export default function ResultsLayout () {
  const Colors = useThemeColor()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground }
      }}
    />
  )
}
