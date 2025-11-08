import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '@/components/text'
import { useSetAtom } from 'jotai'
import { logoutAtom } from '@/service/user/register-login/controller'

const index = () => {
  const handleLougout = useSetAtom(logoutAtom)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText onPress={handleLougout}>Diriver</AppText>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
