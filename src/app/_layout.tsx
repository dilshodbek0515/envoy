import i18n, { initLanguage } from '@/locales/_i18n'
import useThemeColor from '@/theme/useTheme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout () {
  const Colors = useThemeColor()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      await initLanguage()
      setReady(true)
    }
    prepare()
  }, [])

  const orginalConsoleWarn = console.warn
  console.warn = (...args) => {
    if (
      (typeof args[0] === 'string' &&
        args[0].includes('Expo AV has been deprected')) ||
      args[0].includes(
        'Reanimated Reading from `value` during component render'
      )
    ) {
      return
    }
    orginalConsoleWarn(...args)
  }

  if (!ready) return <View />

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor:'red' }}>
        <BottomSheetModalProvider>
          <View
            style={{
              flex: 1,
              paddingBottom: 0,
              backgroundColor: Colors.pageBackground
            }}
          >
            <StatusBar style='light' backgroundColor={Colors.Boxbackground} />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.pageBackground }
              }}
            />
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  )
}
