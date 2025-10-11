import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default function RootLayout () {
  return (
    <>
      <StatusBar style='light' />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#111' }
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({})
