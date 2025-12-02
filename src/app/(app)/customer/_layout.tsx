import React, { useEffect, useMemo, useState } from 'react'
import { Tabs, usePathname } from 'expo-router'
import useThemeColor from '@/theme/useTheme'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Screens } from '@/shared/tokens'
import ProfileIcon from '@/assets/icons/profile-icon'
import GetOrderIcon from '@/assets/icons/get-order-icon'
import CustomerOrdersIcon from '@/assets/icons/customer-orders-icon'
import { InteractionManager } from 'react-native'
const CustomerLayout = () => {
  const pathName = usePathname()
  const Colors = useThemeColor()

  const visableRoutes = useMemo(
    () => [
      '/customer/customer-orders',
      '/customer/get-order',
      '/customer/profile',
      '/customer/profile-test'
    ],
    [pathName]
  )

  const showTabBar = useMemo(() => {
    return visableRoutes.includes(pathName)
  }, [visableRoutes])

  const [ready, setReady] = useState(false)
  const botomOfset = useSharedValue(showTabBar ? 0 : Screens.height * 0.09)

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setReady(true)
      botomOfset.value = withTiming(
        visableRoutes.includes(pathName) ? 0 : Screens.height * 0.09,
        { duration: 300 }
      )
    })
    return () => task.cancel()
  }, [pathName])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: botomOfset.value }]
  }))

  if (!ready) return null

  return (
    <Tabs
      tabBar={props => (
        <Animated.View style={animatedStyle}>
          <BottomTabBar {...props} />
        </Animated.View>
      )}
      initialRouteName='get-order'
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.Boxbackground,
          borderTopWidth: 0,
          height: Screens.height * 0.09,
          position: 'absolute'
        }
      }}
    >
      <Tabs.Screen
        name='customer-orders'
        options={{
          title: 'Yuklaringiz',
          tabBarIcon: ({ focused, color, size }) => {
            return <CustomerOrdersIcon size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen
        name='get-order'
        options={{
          title: 'Buyurtma berish',
          tabBarIcon: ({ focused, color, size }) => {
            return <GetOrderIcon size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <ProfileIcon size={size} color={color} />
          }
        }}
      />

      <Tabs.Screen
        name='profile-test'
        options={{
          title: 'Profile-test',
          tabBarIcon: ({ focused, color, size }) => {
            return <ProfileIcon size={size} color={color} />
          }
        }}
      />
    </Tabs>
  )
}

export default CustomerLayout
