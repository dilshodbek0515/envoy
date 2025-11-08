import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { Tabs, usePathname } from 'expo-router'
import useThemeColor from '@/theme/useTheme'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Screens } from '@/shared/tokens'
const CustomerLayout = () => {
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

  const botomOfset = useSharedValue(showTabBar ? 0 : Screens.height * 0.09)

  useEffect(() => {
    botomOfset.value = withTiming(showTabBar ? 0 : Screens.height * 0.09, {
      duration: 300
    })
  }, [showTabBar])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: botomOfset.value }]
  }))

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
          height: Screens.height * 0.09
        }
      }}
    >
      <Tabs.Screen
        name='customer-orders'
        options={{
          title: 'Yuklaringiz',
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name='box' size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen
        name='get-order'
        options={{
          title: 'Buyurtma berish',
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name='plus-circle' size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name='person-outline' size={size} color={color} />
          }
        }}
      />
    </Tabs>
  )
}

export default CustomerLayout

const styles = StyleSheet.create({})
