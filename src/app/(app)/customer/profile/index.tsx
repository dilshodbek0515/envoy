import { Pressable, StyleSheet, View } from 'react-native'
import PageHeader from '@/components/header/PageHeader'
import useThemeColor from '@/theme/useTheme'
import { IThemeColors } from '@/theme/color'
import { Spacing } from '@/shared/tokens'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import safeRoute from '@/utils/safeNavigate'
import callPhone from '@/utils/call-phone'
import Ionicons from '@expo/vector-icons/Ionicons'
import ArrowIcon from '@/assets/icons/arrow-icon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAtomValue } from 'jotai'
import { userDataAtom } from '@/service/user/fetch-profile/controller'

const CustomerProfile = () => {
  const Colors = useThemeColor()
  const profile = useAtomValue(userDataAtom)
  console.log(profile)

  const ProfileActions = [
    {
      title: 'Sozlamalar',
      handlePress: () =>
        safeRoute(() => router.push(AppRoutes.customer.profile.setting.index)),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <Ionicons
            name='settings-sharp'
            size={18}
            color={Colors.textPrimary}
          />
        </View>
      )
    },

    {
      title: "Ko'rsatgichlar",
      handlePress: () => router.push(AppRoutes.customer.profile.result.index),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <FontAwesome6 name='chart-simple' size={18} color={Colors.primary} />
        </View>
      )
    },

    {
      title: 'Bildirishnomalar',
      handlePress: () => router.push(AppRoutes.customer.profile.notification),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <FontAwesome name='bell' size={18} color={Colors.textPrimary} />
        </View>
      )
    },

    {
      title: "Operator bilan bog'lanish",
      handlePress: () => callPhone('+998975790515'),
      leftIcon: () => (
        <View style={styles(Colors).iconBox}>
          <MaterialIcons name='call' size={18} color={Colors.green} />
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
              {/* <Closed size={20} color='red' /> */}
            </Pressable>
          )
        })}
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.pageBackground
      }}
    >
      <PageHeader title='Profile' />
      <View style={styles(Colors).container}>
        <ProfileUserBox />
        <ProfileActionBox />
      </View>
    </View>
  )
}

export default CustomerProfile

export const ProfileUserBox = () => {
  const Colors = useThemeColor()
  return (
    <Pressable
      onPress={() =>
        safeRoute(() => router.push(AppRoutes.customer.profile.user.index))
      }
      style={styles(Colors).userBox}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: Colors.borderColor,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AppText variant='bold' style={{ fontSize: 35 }}>
          D
        </AppText>
      </View>

      <View style={{ gap: Spacing.horizontal / 2 }}>
        <AppText variant='semiBold' style={{ fontSize: 18 }}>
          Dilshodbek
        </AppText>
        <AppText style={{ fontSize: 12, color: Colors.textSecondary }}>
          +998 97 579-05-15
        </AppText>
      </View>
    </Pressable>
  )
}

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
    userBox: {
      backgroundColor: Colors.Boxbackground,
      borderRadius: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: Spacing.horizontal * 2,
      gap: Spacing.horizontal * 2,
      flexDirection: 'row'
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
      paddingRight: 7.5
    }
  })
