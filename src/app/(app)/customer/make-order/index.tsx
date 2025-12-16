import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSetAtom } from 'jotai'
import { logoutAtom } from '@/service/user/register-login/controller'
import PageHeader from '@/components/header/PageHeader'
import { AppRoutes } from '@/constants/routes'
import AppText from '@/components/text'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'

const MakeOrderPage = () => {
  const handleLougout = useSetAtom(logoutAtom)

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Buyurtma berish' />

      <MakeOrederButtons />
    </View>
  )
}

export default MakeOrderPage

const MakeOrederButtons = () => {
  const Colors = useThemeColor()
  const formButtons = [
    {
      title: 'Yuk',
      route: AppRoutes.customer.makeOrder.cargo
    },
    {
      title: 'Manzil',
      route: AppRoutes.customer.makeOrder.location
    },
    {
      title: 'Yuk mashina',
      route: AppRoutes.customer.makeOrder.truck
    },
    {
      title: 'Narx',
      route: AppRoutes.customer.makeOrder.price
    },
    {
      title: 'Vaqt',
      route: AppRoutes.customer.makeOrder.time
    },
    {
      title: 'Izoh',
      route: AppRoutes.customer.makeOrder.comment
    }
  ]

  return (
    <ScrollView
      // showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: Screens.height * 0.09 + Spacing.horizontal,
        padding: Spacing.horizontal,
        gap: Spacing.horizontal
      }}
    >
      {formButtons.map((button, index) => {
        const handleNavigate = () => {
          safeRoute(() => router.push(button.route))
        }

        return (
          <Pressable
            key={button.title}
            onPress={handleNavigate}
            style={{
              flex: 1,
              backgroundColor: Colors.Boxbackground,
              borderRadius: 20,
              padding: Spacing.horizontal
              // height: Screens.height * 0.12
            }}
          >
            <AppText>{button.title}</AppText>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
