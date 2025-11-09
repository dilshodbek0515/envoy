import React, { useMemo } from 'react'
import { Stack, usePathname } from 'expo-router'
import useThemeColor from '@/theme/useTheme'

const DriverLoadsLayout = () => {
  const Colors = useThemeColor()
  const pathName = usePathname()

  const visableRoutes = useMemo(
    () => ['/driver/driver-loads', '/driver/settings'],
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

export default DriverLoadsLayout
