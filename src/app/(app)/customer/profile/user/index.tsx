import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import useThemeColor from '@/theme/useTheme'
import { Fonts, Screens, Spacing } from '@/shared/tokens'
import AppText from '@/components/text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArrowIcon from '@/assets/icons/arrow-icon'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'
import * as Clipboard from 'expo-clipboard'
import RatingStars from '@/components/RatingStars'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import CustomBottomSheetModal from '@/components/BottomSheets'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import PageHeader from '@/components/header/PageHeader'
const User = () => {
  const Colors = useThemeColor()
  const insetTop = useSafeAreaInsets().top
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('Dilshodbek')
  const [phone, setPhone] = useState('+998 90 392-36-25')
  const chooseMediaSheetRef = useRef<BottomSheetModalMethods>(null)

  const rating = {
    score: 2.5,
    count: 12
  }

  const comment = ['Yaxshi haydovchi emas']

  const photoAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? 0 : -Screens.height * 0.4, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? 0 : insetTop, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? -(insetTop + 55) : insetTop, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={headerAnimatedStyle}>
        <PageHeader
          title='Tahrirlash'
          isEnabledBack
          onRightPress={() => setEditMode(false)}
          onLeftPress={() => setEditMode(false)}
          rightView={<Feather name='check' size={20} color={Colors.primary} />}
        />
      </Animated.View>

      <ScrollView contentContainerStyle={{ gap: Spacing.horizontal }}>
        <Animated.View
          style={[
            {
              height: Screens.height * 0.4,
              backgroundColor: Colors.Boxbackground,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingTop: insetTop,
              overflow: 'hidden'
            },
            photoAnimatedStyle
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AppText variant='bold' style={{ fontSize: 80 }}>
              D
            </AppText>
          </View>

          <Pressable
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              top: 10 + insetTop,
              left: 10,
              width: 40,
              height: 40,
              backgroundColor: Colors.borderColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10
            }}
          >
            <ArrowIcon
              color={Colors.textSecondary}
              type={Platform.OS === 'ios' ? 'chevron' : 'arrow'}
            />
          </Pressable>

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              height: 40,
              backgroundColor: Colors.borderColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              flexDirection: 'row',
              gap: 3
            }}
          >
            <Pressable
              onPress={() => setEditMode($ => !$)}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MaterialIcons
                name='edit'
                size={22}
                color={Colors.textSecondary}
              />
            </Pressable>

            <View
              style={{
                width: 1,
                backgroundColor: Colors.textSecondary,
                height: 20
              }}
            />

            <Pressable
              onPress={() => chooseMediaSheetRef.current?.present()}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Entypo name='camera' size={24} color={Colors.textSecondary} />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              paddingHorizontal: Spacing.horizontal,
              gap: Spacing.horizontal
            },
            contentAnimatedStyle
          ]}
        >
          <UserInfoRow
            editMode={editMode}
            label={'Ism'}
            value={name}
            onChange={setName}
          />

          <UserInfoRow
            editMode={editMode}
            label={'Telefon'}
            value={phone}
            onChange={setPhone}
          />

          {!editMode && (
            <>
              <UserRatingRow rating={rating} />
              <UserCommentRow comment={comment} />
            </>
          )}
        </Animated.View>
      </ScrollView>

      <CustomBottomSheetModal ref={chooseMediaSheetRef} snapPoints={['40%']}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: Spacing.horizontal,
            gap: Spacing.horizontal
          }}
        >
          <Pressable
            style={{
              flex: 1,
              height: 90,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.borderColor,
              borderRadius: 20,
              gap: Spacing.horizontal / 2
            }}
          >
            <MaterialIcons name='photo' size={35} color={Colors.textPrimary} />
            <AppText>Galereya</AppText>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              height: 90,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.borderColor,
              borderRadius: 20,
              gap: Spacing.horizontal / 2
            }}
          >
            <Entypo name='camera' size={35} color={Colors.textPrimary} />
            <AppText>Kamera</AppText>
          </Pressable>
        </View>
      </CustomBottomSheetModal>
    </View>
  )
}

export default User

const UserInfoRow = ({
  label,
  value,
  editMode,
  onChange
}: {
  label: string
  value: string
  editMode: boolean
  onChange: (text: string) => void
}) => {
  const Colors = useThemeColor()
  const [copy, setCopy] = useState(false)
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

        {!editMode &&
          (copy ? (
            <Feather name='check' size={20} color={Colors.primary} />
          ) : (
            <Pressable onPress={handleCopy}>
              <MaterialIcons
                name='content-copy'
                size={20}
                color={Colors.textSecondary}
              />
            </Pressable>
          ))}
      </View>

      {!editMode ? (
        <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
          {value}
        </AppText>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          style={{
            color: Colors.textPrimary,
            fontSize: 18,
            fontFamily: Fonts.regular
          }}
        />
      )}
    </View>
  )
}

const UserRatingRow = ({
  rating
}: {
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
          Rating
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

const UserCommentRow = ({ comment }: { comment: string[] }) => {
  const Colors = useThemeColor()
  const sheetRef = useRef<BottomSheetModalMethods>(null)

  return (
    <Pressable
      onPress={() => {
        sheetRef.current?.present()
      }}
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
          Izohlar
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center'
          }}
        >
          <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
            {comment.length}
          </AppText>
          <FontAwesome5 name='comment' size={16} color={Colors.textSecondary} />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <AppText style={{ fontSize: 18, color: Colors.textPrimary }}>
          Sizga bildirilgan izohlar
        </AppText>
      </View>

      <CustomBottomSheetModal ref={sheetRef} snapPoints={['50%', '100%']}>
        <View></View>
      </CustomBottomSheetModal>
    </Pressable>
  )
}
