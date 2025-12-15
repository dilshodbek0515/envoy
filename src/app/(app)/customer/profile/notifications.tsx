import { StyleSheet, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'
import AppText from '@/components/text'

const Notification = () => {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Notification' isEnabledBack />
      <AppText>Notification</AppText>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})
