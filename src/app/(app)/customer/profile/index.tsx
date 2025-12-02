import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import PageHeader from '@/components/header/PageHeader'
import useThemeColor from '@/theme/useTheme'
import { IThemeColors } from '@/theme/color'
import { Spacing } from '@/shared/tokens'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import safeRoute from '@/utils/safeNavigate'
import callPhone from '@/utils/call-phone'
import ArrowIcon from '@/assets/icons/arrow-icon'
import ProfileUserBox from '@/widget/profile/profile-user-box'
import { useState } from 'react'
import { useFetchUserData } from '@/service/user/fetch-profile/controller'
import SettingsIcon from '@/assets/icons/settings-icon'
import RatingIcon from '@/assets/icons/rating-icon'
import NotificationIcon from '@/assets/icons/notification.icon'
import CallIcon from '@/assets/icons/call-icon'
import { StatusBar } from 'expo-status-bar'

const CustomerProfile = () => {
  const Colors = useThemeColor()
  const [refresh, setRefresh] = useState(false)
  const fetchProfile = useFetchUserData()

  const ProfileActions = [
    {
      title: 'Sozlamalar',
      handlePress: () =>
        safeRoute(() => router.push(AppRoutes.customer.profile.setting.index)),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <SettingsIcon size={22} color={Colors.textPrimary} />
        </View>
      )
    },

    {
      title: "Ko'rsatgichlar",
      handlePress: () => router.push(AppRoutes.customer.profile.result.index),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <RatingIcon size={22} color={Colors.primary} />
        </View>
      )
    },

    {
      title: 'Bildirishnomalar',
      handlePress: () => router.push(AppRoutes.customer.profile.notification),
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

    return (
      <View style={styles(Colors).actionButtonsBox}>
        {ProfileActions.map(action => {
          return (
            <Pressable
              onPress={action.handlePress}
              key={action.title}
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
                    backgroundColor: iconBackColor(action.title)
                  }}
                >
                  {action.leftIcon()}
                </View>
                <AppText variant='medium'>{action.title}</AppText>
              </View>
              <ArrowIcon
                color={Colors.textSecondary}
                direction='right'
                type={'chevron'}
              />
            </Pressable>
          )
        })}
      </View>
    )
  }

  const handleRefresh = async () => {
    setRefresh(true)
    await fetchProfile().then(() => setRefresh(false))
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.pageBackground
      }}
    >
      <StatusBar style='light' backgroundColor={Colors.Boxbackground} />
      <PageHeader title='Profile' />
      <View style={styles(Colors).container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={handleRefresh}
              tintColor={'red'}
              colors={['#fff']}
              progressBackgroundColor={Colors.borderColor}
            />
          }
          contentContainerStyle={{ gap: Spacing.horizontal }}
        >
          <ProfileUserBox />
          <ProfileActionBox />
        </ScrollView>
      </View>
    </View>
  )
}

export default CustomerProfile

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
      // backgroundColor: Colors.red04,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },

    actionButtonsBox: {
      gap: Spacing.horizontal
    },

    actionButton: {
      // height: 50,
      backgroundColor: Colors.Boxbackground,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 7.5,
      gap: 10
    }
  })
