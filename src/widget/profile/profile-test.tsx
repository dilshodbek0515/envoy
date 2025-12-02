import { Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Radius, Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import AppText from '@/components/text'
import { AppRoutes } from '@/constants/routes'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'

const ProfileUserBoxTest = () => {
  const Colors = useThemeColor()
  return (
    <Pressable
      onPress={() =>
        safeRoute(() =>
          router.push(AppRoutes.customer.profileTest.user_test.index)
        )
      }
      style={{
        width: Screens.width * 0.94,
        height: Screens.height * 0.13,
        backgroundColor: Colors.Boxbackground,
        borderRadius: Radius.input
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          padding: Spacing.horizontal * 2,
          gap: Spacing.horizontal * 2,
          alignItems: 'center'
        }}
      >
        <Image
          source={require('@/assets/images/profile.jpg')}
          style={{ width: 60, height: 60, borderRadius: 40 }}
        />
        <View style={{ gap: Spacing.horizontal / 2 }}>
          <AppText variant='semiBold' style={{ fontSize: 18, color: '#fff' }}>
            Dilshodbek
          </AppText>
          <AppText
            variant='regular'
            style={{ fontSize: 12, color: Colors.textSecondary }}
          >
            +998975790515
          </AppText>
        </View>
      </View>
    </Pressable>
  )
}

export default ProfileUserBoxTest

const styles = StyleSheet.create({})
