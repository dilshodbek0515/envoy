import { StyleSheet, View } from 'react-native'
import PageHeader from '@/components/header/PageHeader'
import AppText from '@/components/text'

const Results = () => {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Notification' isEnabledBack />
      <AppText>Results</AppText>
    </View>
  )
}

export default Results

const styles = StyleSheet.create({})
