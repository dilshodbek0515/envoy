import React, { useEffect, useMemo, useState } from 'react'
import { Tabs, usePathname, useRouter } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import useThemeColor from '@/theme/useTheme'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Screens } from '@/shared/tokens'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { InteractionManager } from 'react-native'
const DriverLayout = () => {
  const pathName = usePathname()
  const Colors = useThemeColor()
  const router = useRouter()

  const visableRoutes = useMemo(
    () => ['/driver/loads', '/driver/settings'],
    [pathName]
  )

  const showTabBar = useMemo(() => {
    return visableRoutes.includes(pathName)
  }, [pathName])

  const [ready, setReady] = useState(false)
  const bottomOfset = useSharedValue(showTabBar ? 0 : Screens.height * 0.09)

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setReady(true)
      bottomOfset.value = withTiming(
        visableRoutes.includes(pathName) ? 0 : Screens.height * 0.09,
        { duration: 300 }
      )
    })
    return () => task.cancel()
  }, [pathName])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomOfset.value }]
  }))

  if (!ready) return null

  return (
    <Tabs
      tabBar={props => (
        <Animated.View style={animatedStyle}>
          <BottomTabBar {...props} />
        </Animated.View>
      )}
      initialRouteName='loads'
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.Boxbackground,
          borderTopWidth: 0,
          height: Screens.height * 0.09
        }
      }}
    >
      <Tabs.Screen
        name='loads'
        options={{
          title: 'Yuklar',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome6 name='boxes-stacked' size={size} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Sozlamalar',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name='settings-outline' size={size} color={color} />
            )
          }
        }}
      />
    </Tabs>
  )
}

export default DriverLayout
