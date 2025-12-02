import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '@/theme/useTheme'
import { Stack } from 'expo-router'

const SettingsTestLayout = () => {
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

export default SettingsTestLayout

const styles = StyleSheet.create({})
