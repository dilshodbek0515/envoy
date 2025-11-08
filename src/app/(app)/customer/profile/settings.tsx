import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'

const Settings = () => {
  return (
    <View>
      <PageHeader title='Sozlamalar' isEnabledBack />
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})
