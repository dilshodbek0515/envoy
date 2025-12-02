import { Pressable, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import PageHeader from '@/components/header/PageHeader'
import AppText from '@/components/text'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'

const SettingsTest = () => {
  const Colors = useThemeColor()

  const settings = useMemo(
    () => [
      {
        id: 'theme',
        title: 'Theme',
        icon: () => <AppText>🌙</AppText>,
        iconBackColor: Colors.primary02,
        iconColor: Colors.yellow
      },
      {
        id: 'language',
        title: 'Language',
        icon: () => <AppText>🇺🇿</AppText>,
        iconBackColor: Colors.green02,
        iconColor: Colors.green
      },
      {
        id: 'logout',
        title: 'Logout',
        icon: () => <AppText>📤</AppText>,
        iconBackColor: Colors.red02,
        iconColor: Colors.red
      },
      {
        id: 'delete',
        title: 'Delete',
        icon: () => <AppText>🗑</AppText>,
        iconBackColor: Colors.red02,
        iconColor: Colors.red
      }
    ],
    [Colors]
  )

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title='Settings' isEnabledBack />
      <View
        style={{
          flex: 1,
          padding: Spacing.horizontal,
          gap: Spacing.horizontal
        }}
      >
        {settings.map(item => (
          <Pressable
            onPress={() => router.push(AppRoutes.customer.profileTest.index)}
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 15,
              padding: 10,
              backgroundColor: Colors.Boxbackground,
              minHeight: 40,
              gap: Spacing.horizontal
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 12,
                backgroundColor: item.iconBackColor,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {item.icon()}
            </View>

            <AppText>{item.title}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SettingsTest

const styles = StyleSheet.create({})
