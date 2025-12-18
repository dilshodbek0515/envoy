import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import PageHeader from '@/components/header/PageHeader'
import MakeOrderNavigationButtons from '@/widget/customer/make-order/MakeOrderNavigationButtons'
import { AppRoutes } from '@/constants/routes'
import safeRoute from '@/utils/safeNavigate'
import { router, useFocusEffect } from 'expo-router'

const Truck = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        safeRoute(() => router.replace(AppRoutes.customer.makeOrder.index))
        return true
      }
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => sub.remove()
    }, [router])
  )
  return (
    <View>
      <PageHeader
        title='Yuk mashina'
        isEnabledBack
        onLeftPress={() =>
          safeRoute(() => router.push(AppRoutes.customer.makeOrder.index))
        }
      />
      <MakeOrderNavigationButtons
        firstTitle='Manzil'
        secondTitle='Narx'
        secondPath={AppRoutes.customer.makeOrder.price}
      />
    </View>
  )
}

export default Truck

const styles = StyleSheet.create({})
