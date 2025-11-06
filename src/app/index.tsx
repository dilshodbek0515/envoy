import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'
import Animated, {
  runOnJS,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreenIcon from '@/assets/icons/splash-screen-icon'
import { AppRoutes } from '@/constants/routes'

const index = () => {
  const router = useRouter()
  const [animatedDone, setAnimatedDone] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const [nextRoute, setNextRoute] = useState<string | null>(null)
  const scale = useSharedValue(0)

  const [fontsLoaded, fontsError] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter_18pt-Bold.ttf')
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedData = await AsyncStorage.getItem('authData')
        const parsedData = storedData ? await JSON.parse(storedData) : null
        const access = await parsedData?.access
        const role = await parsedData?.role
        let route = AppRoutes.auth.auth

        if (access && role === 'Customer') route = AppRoutes.customer.index
        else if (access && role === 'Driver') route = AppRoutes.driver.index
        setNextRoute(route)
      } catch (error) {
        setNextRoute(AppRoutes.auth.auth)
      } finally {
        setAuthReady(true)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      scale.value = withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.out(Easing.exp) }),
        withTiming(0.9, { duration: 1000, easing: Easing.out(Easing.exp) }),
        withTiming(
          1,
          { duration: 1000, easing: Easing.out(Easing.exp) },
          () => {
            runOnJS(setAnimatedDone)(true)
          }
        )
      )
    }
  }, [fontsLoaded, fontsError])

  useEffect(() => {
    if (animatedDone && authReady && nextRoute) {
      router.replace(nextRoute)
    }
  }, [animatedDone, authReady, nextRoute])

  if (!fontsLoaded && !fontsError) return null

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <SplashScreenIcon size={160} />
      </Animated.View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
