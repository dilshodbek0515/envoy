import { StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Stack, usePathname } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const CustomerOrdersLayout = () => {
  const pathName = usePathname()
  const Colors = useThemeColor()

  const visableRoutes = useMemo(
    () => [
      '/customer/customer-orders',
      '/customer/get-order',
      '/customer/profile'
    ],
    [pathName]
  )

  const showTabBar = useMemo(() => {
    return visableRoutes.includes(pathName)
  }, [visableRoutes])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground }
      }}
    />
  )
}

export default CustomerOrdersLayout

const styles = StyleSheet.create({})
