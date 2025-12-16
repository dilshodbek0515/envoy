import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const MakeOrdersLayout = () => {
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

export default MakeOrdersLayout
