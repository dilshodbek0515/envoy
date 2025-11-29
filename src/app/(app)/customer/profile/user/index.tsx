import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { IThemeColors } from '@/theme/color'
import * as Clipboard from 'expo-clipboard'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import PageHeader from '@/components/header/PageHeader'
import * as ImagePicker from 'expo-image-picker'
import { useAtomValue } from 'jotai'
import {
  useFetchUserData,
  userDataAtom
} from '@/service/user/fetch-profile/controller'
import api from '@/axios/axios.config'
import { AxiosError } from 'axios'
import { Fonts, Screens, Spacing } from '@/shared/tokens'
import CustomBottomSheetModal from '@/components/BottomSheets'
import SmsVerificationModal from '@/components/SmsVerificationModal/SmsVerificationModal'
import AppText from '@/components/text'
import RatingStars from '@/components/RatingStars'

const User = () => {
  const Colors = useThemeColor()
  const insets = useSafeAreaInsets()
  const [editMode, setEditMode] = useState(false)
  const { username: originalName, phone: originalPhone } =
    useAtomValue(userDataAtom)
  const [name, setName] = useState(originalName || '')
  const [phone, setPhone] = useState(originalPhone || '')
  const chooseMediaSheetRef = useRef<BottomSheetModalMethods>(null)
  const updateProfile = useFetchUserData()
  const [image, setImage] = useState({
    uri: null,
    fileName: null,
    mimeType: null
  })

  const rating = {
    score: 4.5,
    count: 12
  }

  const comment = ['Yaxshi haydovchi emas']

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? 0 : 0, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? -(insets.top + 55) : 0, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  const updateUserName = async () => {
    if (name !== originalName && phone === originalPhone) {
      try {
        const res = await api.post('/user/update/', { username: name })
        updateProfile()
      } catch (error) {}
    } else if (phone !== originalPhone) {
      chooseMediaSheetRef.current?.present()
    } else {
      Alert.alert('ishlamadi')
    }
    setEditMode(false)
  }

  const updateUserPhone = async () => {
    const newData: any = {}

    if (name !== originalName) newData.userName = name
    if (phone !== originalPhone) newData.phone = phone
    try {
      const { data } = await api.post('/user/update/', newData)
      console.log(data)
      updateProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserImage = async () => {
    if (!image || !image.uri) return

    const formData = new FormData()

    // null boliwini oldini oliw
    const uri = image.uri
    const name = image.fileName || 'photo.jpg'
    const type = image.mimeType || 'image/jpeg'

    formData.append('image', {
      uri: uri,
      name: name,
      type: type
    } as any)

    try {
      await api.post('/user/update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      await updateProfile()
      setImage({ uri: null, fileName: null, mimeType: null })
    } catch (error) {
      if (error instanceof AxiosError) {
      } else {
      }
    } finally {
    }
  }

  useEffect(() => {
    updateUserImage()
  }, [image?.uri])

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={headerAnimatedStyle}>
        <PageHeader
          title='Tahrirlash'
          isEnabledBack
          onRightPress={updateUserName}
          // onRightCheckView={{/* <CheckIcon color={Colors.green} size={20} /> */}}
          onLeftPress={() => setEditMode(false)}
        />
      </Animated.View>

      <ScrollView contentContainerStyle={{ gap: Spacing.horizontal }}>
        <AvatarBox
          editMode={editMode}
          setEditMode={setEditMode}
          image={image}
          setImage={setImage}
        />

        <Animated.View
          style={[styles(Colors).userComponentWrapper, contentAnimatedStyle]}
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
            <View style={{ gap: 10 }}>
              <UserRatingRow rating={rating} />
              <UserCommetRow comment={comment} />
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <CustomBottomSheetModal
        insetsTopEnabled
        ref={chooseMediaSheetRef}
        snapPoints={['100%']}
        topInset={insets.top}
      >
        <SmsVerificationModal
          onClose={() => chooseMediaSheetRef.current?.dismiss()}
          handleSaveNumber={updateUserPhone}
        />
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
    <View style={styles(Colors).userInfoBox}>
      <View style={styles(Colors).cardWrapper}>
        <AppText style={styles(Colors).labelText}>{label}</AppText>
        {/* 
        {!editMode &&
          (copy ? (
            <CheckIcons size={20} color={Colors.green} />
          ) : (
            <Pressable onPress={handleCopy}>
            //   <CopyIcon size={20} color={Colors.textSecondary} />
            </Pressable>
          ))} */}
      </View>
      {!editMode ? (
        <AppText style={styles(Colors).valueText}>{value}</AppText>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles(Colors).valueText}
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
    ratingTitle = 'Baholanmagan'
    ratingColorBack = Colors.red02
    ratingColorTitle = Colors.red
  } else if (rating.score <= 2) {
    ratingTitle = 'Yomon'
    ratingColorBack = Colors.red02
    ratingColorTitle = Colors.red
  } else if (rating.score <= 3) {
    ratingColorBack = Colors.yellow02
    ratingColorTitle = Colors.yellow
    ratingTitle = "O'rtacha"
  } else if (rating.score >= 4) {
    ratingColorBack = Colors.green02
    ratingColorTitle = Colors.green
    ratingTitle = 'Yaxshi'
  }

  return (
    <View style={styles(Colors).userInfoBox}>
      <View style={styles(Colors).cardWrapper}>
        <AppText style={styles(Colors).labelText}>{'Reyting'}</AppText>

        <AppText style={styles(Colors).labelText}>
          {rating.count} kishi baholagan
        </AppText>
      </View>
      <View style={styles(Colors).ratingBox}>
        <RatingStars rating={rating.score} />
        <View
          style={[
            styles(Colors).ratingWrapper,
            { backgroundColor: ratingColorBack }
          ]}
        >
          <AppText
            style={[styles(Colors).ratingValue, { color: ratingColorTitle }]}
          >
            {rating.score}
          </AppText>
          <AppText style={styles(Colors).ratingText}>{ratingTitle}</AppText>
        </View>
      </View>
    </View>
  )
}

const UserCommetRow = ({ comment }: { comment: string[] }) => {
  const Colors = useThemeColor()
  const sheetRef = useRef<BottomSheetModalMethods>(null)

  return (
    <Pressable
      onPress={() => {
        sheetRef.current?.present()
      }}
      style={styles(Colors).userInfoBox}
    >
      <View style={styles(Colors).cardWrapper}>
        <AppText style={styles(Colors).labelText}>Izohlar</AppText>

        <View style={styles(Colors).commentValueWrap}>
          <AppText style={styles(Colors).labelText}>{comment.length}</AppText>
          {/* <CommentIcon size={18} color={Colors.textSecondary} /> */}
        </View>
      </View>

      <View style={styles(Colors).ratingBox}>
        <AppText style={styles(Colors).commentText}>
          Sizga bildirilgan izohlar
        </AppText>
      </View>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['50%', '90%']}
        enableDynamicSizing={false}
        index={0}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: Colors.pageBackground }}
      >
        <BottomSheetView style={{}}>
          <AppText style={styles(Colors).commentBottomSheetText}>
            Salom Sheet Modal
          </AppText>
        </BottomSheetView>
      </BottomSheetModal>
    </Pressable>
  )
}

const AvatarBox = ({
  editMode,
  setEditMode,
  image,
  setImage
}: {
  editMode: boolean
  setEditMode: (mode: boolean) => void
  image: {
    uri: null | string
    fileName: null | string
    mimeType: null | string
  }
  setImage: any
}) => {
  const Colors = useThemeColor()
  const insets = useSafeAreaInsets()
  const chooseMediaSheetRef = useRef<BottomSheetModalMethods>(null)
  const { username, image: originalImage } = useAtomValue(userDataAtom)
  // console.log(process.env.EXPO_PUBLIC_PREFIX + originalImage);

  const pickFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Kamera uchun ruxsat bering!')
        return
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9
      })
      if (!result.canceled && result.assets?.length > 0) {
        setImage({
          uri: result.assets[0].uri,
          fileName: result?.assets[0]?.fileName,
          mimeType: result?.assets[0]?.mimeType
        })
        chooseMediaSheetRef.current?.dismiss()
      }
    } catch (error) {
      console.log('xato')
      alert('xatolik')
    }
  }

  const pickFromGalery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Gallery_permission')
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9
      })
      if (!result.canceled && result.assets?.length > 0) {
        setImage({
          uri: result.assets[0].uri,
          fileName: result?.assets[0]?.fileName,
          mimeType: result?.assets[0]?.mimeType
        })
        chooseMediaSheetRef.current?.dismiss()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const photoAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(!editMode ? 0 : -Screens.height * 0.4, {
      duration: 300
    })
    return {
      marginTop
    }
  })

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // modal ochilganda paydo bo‘ladi
        disappearsOnIndex={-1} // yopilganda yo‘qoladi
        pressBehavior='close' // tashqariga bosilganda modal yopiladi
      />
    ),
    []
  )

  const urlImage = image.uri
    ? image.uri
    : process.env.EXPO_PUBLIC_PREFIX + originalImage
  return (
    <Animated.View
      style={[
        {
          height: Screens.height * 0.4,
          backgroundColor: Colors.Boxbackground,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          // paddingTop: insets.top,
          overflow: 'hidden'
        },
        photoAnimatedStyle
      ]}
    >
      {urlImage ? (
        <Image source={{ uri: urlImage }} style={{ flex: 1 }} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AppText style={{ fontSize: 80 }} variant='bold'>
            {username?.slice(0, 1)}
          </AppText>
        </View>
      )}

      <Pressable
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: 10 + insets.top,
          left: 10,
          width: 40,
          height: 40,
          backgroundColor: Colors.borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12
        }}
      >
        ✅
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
          borderRadius: 12,
          flexDirection: 'row',
          gap: 3
        }}
      >
        <Pressable
          onPress={() => setEditMode(true)}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12
          }}
        >
          ✅
        </Pressable>
        <View
          style={{
            width: 1,
            height: 20,
            backgroundColor: Colors.textSecondary
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
          ✅
        </Pressable>
        <BottomSheetModal
          ref={chooseMediaSheetRef}
          snapPoints={['40%']}
          index={0}
          enableDynamicSizing={false}
          backgroundStyle={{ backgroundColor: Colors.pageBackground }}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >
          <View style={styles(Colors).photoWrap}>
            <Pressable
              style={styles(Colors).photoChoosePressable}
              onPress={pickFromGalery}
            >
              {/* <GaleryIcon size={24} color={Colors.textPrimary} /> */}
              <AppText>Galery</AppText>
            </Pressable>
            <Pressable
              style={styles(Colors).photoChoosePressable}
              onPress={pickFromCamera}
            >
              {/* <CameraIcon size={24} color={Colors.textPrimary} /> */}
              <AppText>Camera</AppText>
            </Pressable>
          </View>
        </BottomSheetModal>
      </View>
    </Animated.View>
  )
}

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    userInfoBox: {
      height: 80,
      borderRadius: 20,
      backgroundColor: Colors.Boxbackground,
      paddingHorizontal: 15,
      justifyContent: 'center',
      gap: 6
    },
    userComponentWrapper: {
      paddingHorizontal: Spacing.horizontal,
      gap: 10
    },
    labelText: {
      color: Colors.textSecondary
    },
    cardWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 20
    },
    valueText: {
      color: Colors.textPrimary,
      fontSize: 18,
      fontFamily: Fonts.regular, // AppText bilan bir xil font
      padding: 0, // TextInput uchun padding
      margin: 0 // TextInput uchun margin
    },
    // textInput: {
    //   borderBottomWidth: 1,
    //   borderBottomColor: Colors.primary,
    // },
    ratingBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    ratingWrapper: {
      flexDirection: 'row',
      padding: 5,
      backgroundColor: Colors.red02,
      borderRadius: 7
    },
    ratingValue: {
      fontSize: 12,
      color: Colors.red,
      marginRight: 3
    },
    ratingText: {
      fontSize: 12,
      color: Colors.textPrimary
    },
    commentText: {
      fontSize: 18,
      color: Colors.textPrimary
    },
    commentValueWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    },
    photoWrap: {
      flex: 1,
      flexDirection: 'row',
      padding: Spacing.horizontal,
      gap: Spacing.horizontal
    },
    photoChoosePressable: {
      flex: 1,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.borderColor,
      borderRadius: 20,
      gap: Spacing.horizontal / 2
    },
    commentBottomSheetText: {
      // color: Colors.textPrimary,
    }
  })

// import {
//   Alert,
//   Image,
//   Platform,
//   Pressable,
//   ScrollView,
//   TextInput,
//   View
// } from 'react-native'
// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import useThemeColor from '@/theme/useTheme'
// import { Fonts, Screens, Spacing } from '@/shared/tokens'
// import AppText from '@/components/text'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import ArrowIcon from '@/assets/icons/arrow-icon'
// import Feather from '@expo/vector-icons/Feather'
// import { router } from 'expo-router'
// import * as Clipboard from 'expo-clipboard'
// import RatingStars from '@/components/RatingStars'
// import CustomBottomSheetModal from '@/components/BottomSheets'
// import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
// import PageHeader from '@/components/header/PageHeader'
// import * as ImagePicker from 'expo-image-picker'
// import api from '@/axios/axios.config'
// import { useAtomValue } from 'jotai'
// import {
//   useFetchUserData,
//   userDataAtom
// } from '@/service/user/fetch-profile/controller'
// import SmsVerificationModal from '@/components/SmsVerificationModal/SmsVerificationModal'
// import { AxiosError } from 'axios'
// import EditIcons from '@/assets/icons/edit-icon'
// import CameraIcon from '@/assets/icons/camera-icon'
// import GalleriyaIcon from '@/assets/icons/gallerya-icon'
// import CommentIcon from '@/assets/icons/comment-icon'
// import {
//   BottomSheetBackdrop,
//   BottomSheetView,
//   BottomSheetModalMethods
// } from '@gorhom/bottom-sheet'

// const User = () => {
//   const Colors = useThemeColor()
//   const insetTop = useSafeAreaInsets().top
//   const [editMode, setEditMode] = useState(false)
//   const { username: orginalName, phone: orginalPhone } =
//     useAtomValue(userDataAtom)
//   const [name, setName] = useState(orginalName || '')
//   const [phone, setPhone] = useState(orginalPhone || '')
//   const chooseMediaSheetRef = useRef<BottomSheetModalMethods>(null)
//   const updateProfile = useFetchUserData()
//   const [image, setImage] = useState<any>({
//     uri: null,
//     fileName: null,
//     mimeType: null
//   })

//   const rating = {
//     score: 3.5,
//     count: 12
//   }

//   const comment = ['Yaxshi haydovchi emas']

//   const contentAnimatedStyle = useAnimatedStyle(() => {
//     const marginTop = withTiming(!editMode ? 0 : 0, {
//       duration: 300
//     })
//     return {
//       marginTop
//     }
//   })

//   const headerAnimatedStyle = useAnimatedStyle(() => {
//     const marginTop = withTiming(!editMode ? -(insetTop + 55) : 0, {
//       duration: 300
//     })
//     return {
//       marginTop
//     }
//   })

//   const updateUserName = async () => {
//     if (name !== orginalName && phone === orginalPhone) {
//       try {
//         const res = await api.post('/user/update/', { username: name })
//         updateProfile()
//       } catch (error) {}
//     } else if (phone !== orginalPhone) {
//       chooseMediaSheetRef.current?.present()
//     } else {
//       Alert.alert('ishlamadi')
//     }
//     setEditMode(false)
//   }

//   const updateUserPhone = async () => {
//     const newData: any = {}

//     if (name !== orginalName) newData.username = name
//     if (phone !== orginalPhone) newData.phone = phone

//     try {
//       const { data } = await api.post('/user/update/', newData)
//       console.log(data)

//       updateProfile()
//     } catch (error) {
//       console.log('Update error:', error)
//     }
//   }

//   const updataUserImage = async () => {
//     if (!image || !image.uri) return

//     const formData = new FormData()

//     const uri = image.uri
//     const name = image.fileName || 'photo.jpg'
//     const type = image.mimeType || 'image.jpeg'

//     formData.append('image', {
//       uri: uri,
//       name: name,
//       type: type
//     } as any)

//     try {
//       await api.post('/user/update/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       await updateProfile()
//       setImage({ uri: null, fileName: null, mimeType: null })
//     } catch (error) {
//       if (error instanceof AxiosError) {
//       } else {
//       }
//     } finally {
//     }
//   }

//   useEffect(() => {
//     updataUserImage()
//   }, [image?.uri])

//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View style={headerAnimatedStyle}>
//         <PageHeader
//           title='Tahrirlash'
//           isEnabledBack
//           onRightPress={updateUserName}
//           onLeftPress={() => setEditMode(false)}
//           rightView={<Feather name='check' size={20} color={Colors.primary} />}
//         />
//       </Animated.View>

//       <ScrollView contentContainerStyle={{ gap: Spacing.horizontal }}>
//         <AvatarBox
//           editMode={editMode}
//           setEditMode={setEditMode}
//           image={image}
//           setImage={setImage}
//         />

//         <Animated.View
//           style={[
//             {
//               paddingHorizontal: Spacing.horizontal,
//               gap: Spacing.horizontal
//             },
//             contentAnimatedStyle
//           ]}
//         >
//           <UserInfoRow
//             editMode={editMode}
//             label={'Ism'}
//             value={name}
//             onChange={setName}
//           />

//           <UserInfoRow
//             editMode={editMode}
//             label={'Telefon'}
//             value={phone}
//             onChange={setPhone}
//           />

//           {!editMode && (
//             <>
//               <UserRatingRow rating={rating} />
//               <UserCommentRow comment={comment} />
//             </>
//           )}
//         </Animated.View>
//       </ScrollView>

//       <CustomBottomSheetModal
//         insetsTopEnabled
//         ref={chooseMediaSheetRef}
//         snapPoints={['100%']}
//         topInset={insetTop}
//       >
//         <SmsVerificationModal
//           onClose={() => chooseMediaSheetRef.current?.dismiss()}
//           handleSaveNumber={updateUserPhone}
//         />
//       </CustomBottomSheetModal>
//     </View>
//   )
// }

// export default User

// const UserInfoRow = ({
//   label,
//   value,
//   editMode,
//   onChange
// }: {
//   label: string
//   value: string
//   editMode: boolean
//   onChange: (text: string) => void
// }) => {
//   const Colors = useThemeColor()
//   const [copy, setCopy] = useState(false)
//   const handleCopy = async () => {
//     try {
//       setCopy(true)
//       await Clipboard.setStringAsync(value)
//       setTimeout(() => {
//         setCopy(false)
//       }, 1000)
//     } catch (error) {}
//   }

//   return (
//     <View
//       style={{
//         height: 80,
//         borderRadius: 15,
//         backgroundColor: Colors.Boxbackground,
//         justifyContent: 'center',
//         paddingHorizontal: 15,
//         gap: 6
//       }}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}
//       >
//         <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//           {label}
//         </AppText>

//         {/* {!editMode &&
//           (copy ? (
//             <Feather name='check' size={20} color={Colors.primary} />
//           ) : (
//             <Pressable onPress={handleCopy}>
//               <CopyIcon size={20} color={Colors.textSecondary} />
//             </Pressable>
//           ))} */}
//       </View>

//       {!editMode ? (
//         <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
//           {value}
//         </AppText>
//       ) : (
//         <TextInput
//           value={value}
//           onChangeText={onChange}
//           style={{
//             color: Colors.textPrimary,
//             fontSize: 18,
//             fontFamily: Fonts.regular
//           }}
//         />
//       )}
//     </View>
//   )
// }

// const UserRatingRow = ({
//   rating
// }: {
//   rating: { score: number; count: number }
// }) => {
//   const Colors = useThemeColor()
//   let ratingTitle = 'Topilmadi'
//   let ratingColorBack = Colors.borderColor
//   let ratingColorTitle = Colors.textPrimary

//   if (rating.score === 0) {
//     ratingTitle = 'Belgilanmagan'
//     ratingColorBack = Colors.borderColor
//     ratingColorTitle = Colors.textPrimary
//   } else if (rating.score <= 2) {
//     ratingTitle = 'Yomon'
//     ratingColorBack = Colors.red02
//     ratingColorTitle = Colors.red
//   } else if (rating.score <= 3) {
//     ratingTitle = "O'rtacha"
//     ratingColorBack = Colors.yellow02
//     ratingColorTitle = Colors.yellow
//   } else if (rating.score >= 3.5) {
//     ratingTitle = 'Yaxshi'
//     ratingColorBack = Colors.green02
//     ratingColorTitle = Colors.green
//   }

//   return (
//     <View
//       style={{
//         height: 80,
//         borderRadius: 15,
//         backgroundColor: Colors.Boxbackground,
//         justifyContent: 'center',
//         paddingHorizontal: 15,
//         gap: 6
//       }}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}
//       >
//         <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//           Rating
//         </AppText>

//         <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//           {rating.count} kishi belgilagan
//         </AppText>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}
//       >
//         <RatingStars rating={rating.score} />
//         <View
//           style={{
//             flexDirection: 'row',
//             padding: 5,
//             backgroundColor: ratingColorBack,
//             borderRadius: 7,
//             gap: 4
//           }}
//         >
//           <AppText style={{ fontSize: 12, color: ratingColorTitle }}>
//             {rating.score}
//           </AppText>
//           <AppText style={{ fontSize: 12, color: Colors.textPrimary }}>
//             {ratingTitle}
//           </AppText>
//         </View>
//       </View>
//     </View>
//   )
// }

// const UserCommentRow = ({ comment }: { comment: string[] }) => {
//   const Colors = useThemeColor()
//   const sheetRef = useRef<BottomSheetModalMethods>(null)

//   return (
//     <Pressable
//       onPress={() => {
//         sheetRef.current?.present()
//       }}
//       style={{
//         height: 80,
//         borderRadius: 15,
//         backgroundColor: Colors.Boxbackground,
//         justifyContent: 'center',
//         paddingHorizontal: 15,
//         gap: 6
//       }}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}
//       >
//         <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//           Izohlar
//         </AppText>
//         <View
//           style={{
//             flexDirection: 'row',
//             gap: 5,
//             alignItems: 'center'
//           }}
//         >
//           <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//             {comment.length}
//           </AppText>
//           <CommentIcon size={16} color={Colors.textSecondary} />
//         </View>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}
//       >
//         <AppText style={{ fontSize: 18, color: Colors.textPrimary }}>
//           Sizga bildirilgan izohlar
//         </AppText>
//       </View>

//       <CustomBottomSheetModal
//         ref={sheetRef}
//         snapPoints={['50%', '90%']}
//         enableDynamicSizing={false}
//         index={0}
//         enablePanDownToClose
//         backgroundStyle={{ backgroundColor: Colors.pageBackground }}
//       >
//         <BottomSheetView style={{}}>
//           <AppText style={{}}>Salom Sheet Modal</AppText>
//         </BottomSheetView>
//       </CustomBottomSheetModal>
//     </Pressable>
//   )
// }

// const AvatarBox = ({
//   editMode,
//   setEditMode,
//   image,
//   setImage
// }: {
//   editMode: boolean
//   image: {
//     uri: null | string
//     fileName: null | string
//     mimeType: null | string
//   }

//   setEditMode: (mode: boolean) => void
//   setImage: any
// }) => {
//   const Colors = useThemeColor()
//   const insetTop = useSafeAreaInsets().top
//   const chooseMediaSheetRef = useRef<BottomSheetModalMethods>(null)
//   const { username, image: originalImage } = useAtomValue(userDataAtom)

//   const photoAnimatedStyle = useAnimatedStyle(() => {
//     const marginTop = withTiming(!editMode ? 0 : -Screens.height * 0.4, {
//       duration: 300
//     })
//     return {
//       marginTop
//     }
//   })

//   const pickFromCamera = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync()
//       if (status !== 'granted') {
//         alert('Kamera uchun ruxsat bering.')
//         return
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8
//       })

//       if (!result.canceled && result.assets?.length > 0) {
//         setImage({
//           uri: result.assets[0].uri,
//           fileName: result?.assets[0]?.fileName,
//           mimeType: result?.assets[0]?.mimeType
//         })
//         chooseMediaSheetRef.current?.dismiss()
//       }
//     } catch (error) {
//       console.log('xato')
//       alert('xatolik')
//     }
//   }

//   const pickFromGallery = async () => {
//     try {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
//       if (status !== 'granted') {
//         alert('Galleriyaga kirish uchun ruxsat bering')
//         return
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8
//       })

//       if (!result.canceled && result.assets?.length > 0) {
//         setImage({
//           uri: result.assets[0].uri,
//           fileName: result?.assets[0]?.fileName,
//           mimeType: result?.assets[0]?.mimeType
//         })
//         chooseMediaSheetRef.current?.dismiss()
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         appearsOnIndex={0} // modal ochilganda paydo bo‘ladi
//         disappearsOnIndex={-1} // yopilganda yo‘qoladi
//         pressBehavior='close' // tashqariga bosilganda modal yopiladi
//       />
//     ),
//     []
//   )
//   const urlImage = image.uri
//     ? image.uri
//     : process.env.EXPO_PUBLIC_PREFIX + originalImage

//   return (
//     <Animated.View
//       style={[
//         {
//           height: Screens.height * 0.4,
//           backgroundColor: Colors.Boxbackground,
//           borderBottomLeftRadius: 20,
//           borderBottomRightRadius: 20,
//           overflow: 'hidden'
//         },
//         photoAnimatedStyle
//       ]}
//     >
//       {urlImage ? (
//         <Image source={{ uri: urlImage }} style={{ flex: 1 }} />
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <AppText style={{ fontSize: 80 }} variant='bold'>
//             {username?.slice(0, 1)}
//           </AppText>
//         </View>
//       )}

//       <Pressable
//         onPress={() => router.back()}
//         style={{
//           position: 'absolute',
//           top: 10 + insetTop,
//           left: 10,
//           width: 40,
//           height: 40,
//           backgroundColor: Colors.borderColor,
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderRadius: 10
//         }}
//       >
//         <ArrowIcon
//           color={Colors.textSecondary}
//           type={Platform.OS === 'ios' ? 'chevron' : 'arrow'}
//         />
//       </Pressable>

//       <View
//         style={{
//           position: 'absolute',
//           bottom: 10,
//           right: 10,
//           height: 40,
//           backgroundColor: Colors.borderColor,
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderRadius: 10,
//           flexDirection: 'row',
//           gap: 3
//         }}
//       >
//         <Pressable
//           onPress={() => setEditMode(true)}
//           style={{
//             width: 40,
//             height: 40,
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <EditIcons size={22} color={Colors.textSecondary} />
//         </Pressable>

//         <View
//           style={{
//             width: 1,
//             backgroundColor: Colors.textSecondary,
//             height: 20
//           }}
//         />

//         <Pressable
//           onPress={() => chooseMediaSheetRef.current?.present()}
//           style={{
//             width: 40,
//             height: 40,
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: 10
//           }}
//         >
//           <CameraIcon size={28} color={Colors.textSecondary} />
//         </Pressable>
//       </View>

//       <CustomBottomSheetModal
//         ref={chooseMediaSheetRef}
//         snapPoints={['50%']}
//         index={0}
//         enableDynamicSizing={false}
//         backgroundStyle={{ backgroundColor: Colors.pageBackground }}
//         enablePanDownToClose={true}
//         backdropComponent={renderBackdrop}
//       >
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             padding: Spacing.horizontal,
//             gap: Spacing.horizontal
//           }}
//         >
//           <Pressable
//             onPress={pickFromGallery}
//             style={{
//               flex: 1,
//               height: 90,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: Colors.borderColor,
//               borderRadius: 20,
//               gap: Spacing.horizontal / 2
//             }}
//           >
//             <GalleriyaIcon size={35} color={Colors.textPrimary} />
//             <AppText>Galereya</AppText>
//           </Pressable>
//           <Pressable
//             onPress={pickFromCamera}
//             style={{
//               flex: 1,
//               height: 90,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: Colors.borderColor,
//               borderRadius: 20,
//               gap: Spacing.horizontal / 2
//             }}
//           >
//             <CameraIcon size={40} color={Colors.textPrimary} />
//             <AppText>Kamera</AppText>
//           </Pressable>
//         </View>
//       </CustomBottomSheetModal>
//     </Animated.View>
//   )
// }
