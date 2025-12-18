import PageHeader from '@/components/header/PageHeader'
import { AppRoutes } from '@/constants/routes'
import MakeOrderNavigationButtons from '@/widget/customer/make-order/MakeOrderNavigationButtons'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import UnitInput from '@/components/Input/UnitInput'
import { Spacing } from '@/shared/tokens'

const Cargo = () => {
  return (
    <View>
      <PageHeader
        title='Yuk'
        isEnabledBack
        onLeftPress={() =>
          safeRoute(() => router.push(AppRoutes.customer.makeOrder.index))
        }
      />
      <Form />
      <MakeOrderNavigationButtons
        isVisableFirstButton={false}
        secondTitle='Manzil'
        secondPath={AppRoutes.customer.makeOrder.location}
      />
    </View>
  )
}

export default Cargo

const Form = () => {
  const [value, setValue] = useState('')
  return (
    <View
      style={{
        marginTop: Spacing.horizontal,
        paddingHorizontal: Spacing.horizontal
      }}
    >
      <UnitInput label='Yuk' value={value} onChangeText={setValue} />
    </View>
  )
}

const styles = StyleSheet.create({})
