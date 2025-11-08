import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const CustomerProfileLayout = () => {
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

export default CustomerProfileLayout

const styles = StyleSheet.create({})
