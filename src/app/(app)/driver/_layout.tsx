import React, { useEffect, useMemo } from 'react'
import { Tabs, usePathname } from 'expo-router'
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
const DriverLayout = () => {
  const pathName = usePathname()
  const Colors = useThemeColor()

  const visableRoutes = useMemo(
    () => ['/driver/loads', '/driver/settings'],
    [pathName]
  )

  const showTabBar = useMemo(() => {
    return visableRoutes.includes(pathName)
  }, [pathName])

  const bottomOfset = useSharedValue(showTabBar ? 0 : Screens.height * 0.09)

  useEffect(() => {
    bottomOfset.value = withTiming(showTabBar ? 0 : Screens.height * 0.09, {
      duration: 300
    })
  }, [showTabBar])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomOfset.value }]
  }))

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
