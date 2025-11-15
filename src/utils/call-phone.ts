import { Linking, Alert } from 'react-native'

const callPhone = async (phone: string) => {
  const url = `tel:${phone}`
  const imkoniyat = await Linking.canOpenURL(url)

  if (imkoniyat) {
    try {
      await Linking.openURL(url)
    } catch (error) {
      Alert.alert('Xato', 'Telefon qilishda muommo')
    }
  } else {
    Alert.alert('Xato', 'Telefon bunday imkoniyat yuq')
  }
}
export default callPhone
