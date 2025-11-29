import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Screens, Spacing } from '@/shared/tokens'
import AppText from '../text'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router } from 'expo-router'
import ArrowIcon from '@/assets/icons/arrow-icon'

interface IProps {
  title: string
  isEnabledBack?: boolean
  onLeftPress?: () => void
  onRightPress?: () => void
  rightView?: ReactNode
}
const PageHeader = ({
  title = 'Header',
  isEnabledBack,
  rightView,
  onLeftPress,
  onRightPress
}: IProps) => {
  const Colors = useThemeColor()
  const Topinset = useSafeAreaInsets().top
  const height = Screens.height * 0.067

  const handleRightPress = () => {
    if (onLeftPress) {
      onLeftPress()
    } else {
      router.back()
    }
  }

  const handleLeftPress = () => {
    if (onRightPress) {
      onRightPress()
    }
  }

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
        <AppText variant='semiBold' style={{ fontSize: 20, color: 'white' }}>
          {title}
        </AppText>
      </View>

      {isEnabledBack && (
        <Pressable
          onPress={handleRightPress}
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
          <ArrowIcon
            direction='left'
            type={Platform.OS === 'ios' ? 'chevron' : 'arrow'}
            color={Colors.textSecondary}
          />
        </Pressable>
      )}

      {rightView && (
        <Pressable
          onPress={handleLeftPress}
          style={{
            position: 'absolute',
            right: Spacing.horizontal,
            bottom: 0,
            alignItems: 'flex-end',
            width: 50,
            justifyContent: 'center',
            height
          }}
        >
          {rightView}
        </Pressable>
      )}
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({})
