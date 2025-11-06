import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '@/components/text'
import { useSetAtom } from 'jotai'
import { logoutAtom } from '@/service/user/register-login/controller'

const driver = () => {
  const handleLougout = useSetAtom(logoutAtom)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText onPress={handleLougout}>Driver</AppText>
    </View>
  )
}

export default driver

const styles = StyleSheet.create({})
