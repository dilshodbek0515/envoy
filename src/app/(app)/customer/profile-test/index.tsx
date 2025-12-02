import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import ProfileUserBoxTest from '@/widget/profile/profile-test'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import useThemeColor from '@/theme/useTheme'
import SettingsIcon from '@/assets/icons/settings-icon'
import RatingIcon from '@/assets/icons/rating-icon'
import NotificationIcon from '@/assets/icons/notification.icon'
import CallIcon from '@/assets/icons/call-icon'
import callPhone from '@/utils/call-phone'
import { IThemeColors } from '@/theme/color'
import AppText from '@/components/text'
import ArrowIcon from '@/assets/icons/arrow-icon'

const ProfileTest = () => {
  const Colors = useThemeColor()

  const iconBackColor = (title: string) => {
    let backColor = Colors.borderColor
    if (title === 'Sozlamalar') {
      backColor = Colors.red04
    } else if (title === "Ko'rsatgichlar") {
      backColor = Colors.primary02
    } else if (title === 'Bildirishnomalar') {
      backColor = Colors.borderColor
    } else if (title === "Operator bilan bog'lanish") {
      backColor = Colors.green02
    }
    return backColor
  }

  const ProfileActions = [
    {
      title: 'Sozlamalar',
      handlePress: () =>
        safeRoute(() =>
          router.push(AppRoutes.customer.profileTest.settings_test.index)
        ),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <SettingsIcon size={22} color={Colors.textPrimary} />
        </View>
      )
    },

    {
      title: "Ko'rsatgichlar",
      handlePress: () =>
        router.push(AppRoutes.customer.profileTest.result_test.index),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <RatingIcon size={22} color={Colors.primary} />
        </View>
      )
    },

    {
      title: 'Bildirishnomalar',
      handlePress: () =>
        router.push(AppRoutes.customer.profileTest.notification),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <NotificationIcon size={22} color={Colors.textPrimary} />
        </View>
      )
    },

    {
      title: "Operator bilan bog'lanish",
      handlePress: () => callPhone('+998975790515'),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <CallIcon size={22} color={Colors.green} />
        </View>
      )
    }
  ]

  const ProfileActionBox = () => {
    return (
      <Pressable style={{ gap: Spacing.horizontal }}>
        {ProfileActions?.map(items => (
          <Pressable
            onPress={items.handlePress}
            key={items.title}
            style={styles(Colors).actionButton}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 7.5,
                gap: Spacing.horizontal,
                alignItems: 'center',
                paddingVertical: 5
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: iconBackColor(items.title)
                }}
              >
                {items.leftIcon()}
              </View>
              <AppText variant='medium'>{items.title}</AppText>
            </View>
            <ArrowIcon
              color={Colors.textSecondary}
              direction='right'
              type={'chevron'}
            />
          </Pressable>
        ))}
      </Pressable>
    )
  }

  return (
    <View style={{ flex: 1, gap: Spacing.horizontal }}>
      <PageHeader title={'Profile Test'} />
      <View
        style={{
          paddingHorizontal: Spacing.horizontal,
          gap: Spacing.horizontal,
          flex: 1
        }}
      >
        <ProfileUserBoxTest />
        <ProfileActionBox />
      </View>
    </View>
  )
}

export default ProfileTest

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.horizontal,
      gap: Spacing.horizontal
    },

    iconBox: {
      width: 30,
      height: 30,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },

    actionButtonsBox: {
      gap: Spacing.horizontal
    },

    actionButton: {
      backgroundColor: Colors.Boxbackground,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 7.5,
      gap: 10
    }
  })
