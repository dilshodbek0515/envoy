import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'

export default function Notification () {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Bildirishnomalar' isEnabledBack />
      <View>
        <Text>Bildirishnomalar</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
