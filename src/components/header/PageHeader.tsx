import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Screens, Spacing } from '@/shared/tokens'
import AppText from '../text'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'

interface IProps {
  title: string
  isEnabledBack?: boolean
}
const PageHeader = ({ title = 'Header', isEnabledBack }: IProps) => {
  const Colors = useThemeColor()
  const Topinset = useSafeAreaInsets().top
  const height = Screens.height * 0.067
  return (
    <View
      style={{
        backgroundColor: Colors.Boxbackground,
        height: Topinset + height,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          height,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AppText
          variant='semiBold'
          style={{ fontSize: 20, color: Colors.textSecondary }}
        >
          {title}
        </AppText>
      </View>

      {isEnabledBack && (
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            left: Spacing.horizontal,
            bottom: 0,
            alignItems: 'flex-start',
            width: 50,
            justifyContent: 'center',
            height
          }}
        >
          <AntDesign name='arrow-left' size={24} color={Colors.textSecondary} />
        </Pressable>
      )}
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({})
