import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'

const ResultTest = () => {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Ko'rsatgichlar" isEnabledBack />
      <View>
        <Text>Ko'rsatgichlar</Text>
      </View>
    </View>
  )
}

export default ResultTest

const styles = StyleSheet.create({})
