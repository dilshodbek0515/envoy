import { Image, Platform, Pressable, View } from 'react-native'
import React, { ReactNode, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArrowIcon from '@/assets/icons/arrow-icon'
import { router } from 'expo-router'
import EditIcons from '@/assets/icons/edit-icon'
import CameraIcon from '@/assets/icons/camera-icon'
import AppText from '@/components/text'
import CopyIcon from '@/assets/icons/copy-icon'
import * as Clipboard from 'expo-clipboard'
import Feather from '@expo/vector-icons/Feather'
import StarIcon from '@/assets/icons/star'
import CommentIcon from '@/assets/icons/comment-icon'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import CustomBottomSheetModal from '@/components/BottomSheets'
import RatingStars from '@/components/RatingStars'

const UserTest = () => {
  const Colors = useThemeColor()
  const insets = useSafeAreaInsets()

  const rating = {
    score: 1.5,
    count: 12
  }
  return (
    <View style={{ flex: 1, gap: Spacing.horizontal, paddingTop: insets.top }}>
      <StatusBar style='light' backgroundColor='transparent' />

      <View style={{ width: '100%' }}>
        <Image
          style={{
            width: Screens.width,
            height: Screens.height * 0.38,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
          source={require('@/assets/images/profile.jpg')}
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: Spacing.horizontal,
            left: Spacing.horizontal,
            backgroundColor: Colors.Boxbackground,
            padding: Spacing.horizontal,
            borderRadius: 10
          }}
        >
          <ArrowIcon
            type={Platform.OS === 'ios' ? 'chevron' : 'arrow'}
            color={'#fff'}
          />
        </Pressable>
        <View
          style={{
            width: 110,
            backgroundColor: Colors.Boxbackground,
            position: 'absolute',
            right: Spacing.horizontal,
            bottom: Spacing.horizontal,
            borderRadius: 10,
            padding: Spacing.horizontal,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Pressable>
            <EditIcons color={Colors.primary} />
          </Pressable>
          <View
            style={{
              width: 2,
              height: Spacing.horizontal * 2,
              backgroundColor: Colors.primary,
              borderRadius: 5
            }}
          />
          <Pressable>
            <CameraIcon color={Colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={{ gap: Spacing.horizontal, padding: Spacing.horizontal }}>
        <UserNameRow
          label={'Ism'}
          value={'Dilshodbek'}
          rightIcon={<CopyIcon color='#fff' size={20} />}
        />
        <UserPhoneRow
          label={'Telefon'}
          value={'+998975790515'}
          rightIcon={<CopyIcon color='#fff' size={20} />}
        />
        <UserRatingRow
          label={'Rating'}
          value={<StarIcon />}
          rating={rating}
          rightIcon={<CopyIcon color='#fff' size={20} />}
        />
        <UserCommentRow
          label={'Izohlar'}
          value={'Sizga bildirilgan izohlar'}
          rightIcon={<CopyIcon color='#fff' size={20} />}
        />
      </View>
    </View>
  )
}

export default UserTest

const UserNameRow = ({
  label,
  value,
  rightIcon
}: {
  label: string
  value: string
  rightIcon?: ReactNode
}) => {
  const [copy, setCopy] = useState(false)
  const Colors = useThemeColor()

  const handleCopy = async () => {
    try {
      setCopy(true)
      await Clipboard.setStringAsync(value)
      setTimeout(() => {
        setCopy(false)
      }, 1000)
    } catch (error) {}
  }

  return (
    <View
      style={{
        width: Screens.width * 0.95,
        height: 80,
        backgroundColor: Colors.Boxbackground,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <AppText
          variant='regular'
          style={{ color: Colors.textSecondary, fontSize: 13 }}
        >
          {label}
        </AppText>
        <AppText variant='regular' style={{ color: '#fff', fontSize: 16 }}>
          {value}
        </AppText>
      </View>
      {copy ? (
        <Feather name='check' size={20} color={Colors.primary} />
      ) : (
        <Pressable onPress={handleCopy}>
          <CopyIcon size={20} color={Colors.textSecondary} />
        </Pressable>
      )}
    </View>
  )
}

const UserPhoneRow = ({
  label,
  value,
  rightIcon
}: {
  label: string
  value: string
  rightIcon?: ReactNode
}) => {
  const [copy, setCopy] = useState(false)
  const Colors = useThemeColor()

  const handleCopy = async () => {
    try {
      setCopy(true)
      await Clipboard.setStringAsync(value)
      setTimeout(() => {
        setCopy(false)
      }, 1000)
    } catch (error) {}
  }
  return (
    <View
      style={{
        width: Screens.width * 0.95,
        height: 80,
        backgroundColor: Colors.Boxbackground,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <AppText
          variant='regular'
          style={{ color: Colors.textSecondary, fontSize: 13 }}
        >
          {label}
        </AppText>
        <AppText variant='regular' style={{ color: '#fff', fontSize: 16 }}>
          {value}
        </AppText>
      </View>
      {copy ? (
        <Feather name='check' size={20} color={Colors.primary} />
      ) : (
        <Pressable onPress={handleCopy}>
          <CopyIcon size={20} color={Colors.textSecondary} />
        </Pressable>
      )}
    </View>
  )
}

const UserRatingRow = ({
  label,
  value,
  rightIcon,
  rating
}: {
  label: string
  value: string | ReactNode
  rightIcon?: ReactNode
  rating: { score: number; count: number }
}) => {
  const Colors = useThemeColor()
  let ratingTitle = 'Topilmadi'
  let ratingColorBack = Colors.borderColor
  let ratingColorTitle = Colors.textPrimary

  if (rating.score === 0) {
    ratingTitle = 'Belgilanmagan'
    ratingColorBack = Colors.borderColor
    ratingColorTitle = Colors.textPrimary
  } else if (rating.score <= 2) {
    ratingTitle = 'Yomon'
    ratingColorBack = Colors.red02
    ratingColorTitle = Colors.red
  } else if (rating.score <= 3) {
    ratingTitle = "O'rtacha"
    ratingColorBack = Colors.yellow02
    ratingColorTitle = Colors.yellow
  } else if (rating.score >= 3.5) {
    ratingTitle = 'Yaxshi'
    ratingColorBack = Colors.green02
    ratingColorTitle = Colors.green
  }

  return (
    <View
      style={{
        height: 80,
        borderRadius: 15,
        backgroundColor: Colors.Boxbackground,
        justifyContent: 'center',
        paddingHorizontal: 15,
        gap: 6
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
          {label}
        </AppText>

        <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
          {rating.count} kishi belgilagan
        </AppText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <RatingStars rating={rating.score} />
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            backgroundColor: ratingColorBack,
            borderRadius: 7,
            gap: 4
          }}
        >
          <AppText style={{ fontSize: 12, color: ratingColorTitle }}>
            {rating.score}
          </AppText>
          <AppText style={{ fontSize: 12, color: Colors.textPrimary }}>
            {ratingTitle}
          </AppText>
        </View>
      </View>
    </View>
  )
}

const UserCommentRow = ({
  label,
  value,
  rightIcon
}: {
  label: string
  value: string | ReactNode
  rightIcon?: ReactNode
}) => {
  const Colors = useThemeColor()
  const sheetRef = useRef<BottomSheetModalMethods>(null)

  return (
    <Pressable
      onPress={() => sheetRef.current?.present()}
      style={{
        width: Screens.width * 0.95,
        height: 80,
        backgroundColor: Colors.Boxbackground,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <AppText
          variant='regular'
          style={{ color: Colors.textSecondary, fontSize: 13 }}
        >
          {label}
        </AppText>
        <AppText variant='regular' style={{ color: '#fff', fontSize: 16 }}>
          {value}
        </AppText>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 3
        }}
      >
        <AppText
          variant='regular'
          style={{ color: Colors.textSecondary, fontSize: 13 }}
        >
          1
        </AppText>
        <CommentIcon color={Colors.textSecondary} size={16} />
      </View>

      <CustomBottomSheetModal
        ref={sheetRef}
        snapPoints={['30%', '90%']}
        enableDynamicSizing={false}
        enablePanDownToClose
        index={0}
        backgroundStyle={{ backgroundColor: Colors.pageBackground }}
      >
        <BottomSheetView>
          <AppText>Sheet modal</AppText>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </Pressable>
  )
}
