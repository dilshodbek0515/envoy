import { View } from 'react-native'
import React from 'react'
import AppText from '@/components/text'
import { useSetAtom } from 'jotai'
import { logoutAtom } from '@/service/user/register-login/controller'
import PageHeader from '@/components/header/PageHeader'

const CustomerOrders = () => {
  const handleLougout = useSetAtom(logoutAtom)

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Yuklaringiz' />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText onPress={handleLougout}>Customer</AppText>
      </View>
    </View>
  )
}

export default CustomerOrders
