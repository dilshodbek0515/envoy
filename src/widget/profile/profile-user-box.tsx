import AppText from '@/components/text'
import { AppRoutes } from '@/constants/routes'
import { userDataAtom } from '@/service/user/fetch-profile/controller'
import { Spacing } from '@/shared/tokens'
import { IThemeColors } from '@/theme/color'
import useThemeColor from '@/theme/useTheme'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'
import { useAtomValue } from 'jotai'
import { Image, Pressable, StyleSheet, View } from 'react-native'

export default function ProfileUserBox () {
  const Colors = useThemeColor()
  const { username, phone, image: originalImage } = useAtomValue(userDataAtom)

  const urlImage = originalImage
    ? process.env.EXPO_PUBLIC_PREFIX + originalImage
    : originalImage

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
        {urlImage ? (
          <Image source={{ uri: urlImage }} style={{ flex: 1 }} />
        ) : (
          <AppText variant='bold' style={{ fontSize: 35 }}>
            {username?.slice(0, 1)}
          </AppText>
        )}
      </View>

      <View style={{ gap: Spacing.horizontal / 2 }}>
        <AppText variant='semiBold' style={{ fontSize: 18 }}>
          {username}
        </AppText>
        <AppText style={{ fontSize: 12, color: Colors.textSecondary }}>
          {phone}
        </AppText>
      </View>
    </Pressable>
  )
}

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    userBox: {
      backgroundColor: Colors.Boxbackground,
      borderRadius: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: Spacing.horizontal * 2,
      gap: Spacing.horizontal * 2,
      flexDirection: 'row'
    }
  })
