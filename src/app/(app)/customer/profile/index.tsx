import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '@/components/text'
import { useSetAtom } from 'jotai'
import { logoutAtom } from '@/service/user/register-login/controller'
import PageHeader from '@/components/header/PageHeader'
import { router } from 'expo-router'

const CustomerProfile = () => {
  const handleLougout = useSetAtom(logoutAtom)

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Profile' />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText onPress={() => router.push('(app)/customer/profile/settings')}>
          Customer
        </AppText>
      </View>
    </View>
  )
}

export default CustomerProfile

const styles = StyleSheet.create({})
