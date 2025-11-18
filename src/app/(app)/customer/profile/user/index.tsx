import { Platform, Pressable, ScrollView, View } from 'react-native'
import React from 'react'
import useThemeColor from '@/theme/useTheme'
import { Screens, Spacing } from '@/shared/tokens'
import AppText from '@/components/text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArrowIcon from '@/assets/icons/arrow-icon'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'
import * as Clipboard from 'expo-clipboard'
import Information from './information/information'

const User = () => {
  const Colors = useThemeColor()
  const insetTop = useSafeAreaInsets().top

  const copyText = async (text: string) => {
    await Clipboard.setStringAsync(text)
  }
  return (
    <View style={{ gap: Spacing.horizontal * 1.5 }}>
      <ScrollView>
        <View
          style={{
            height: Screens.height * 0.4,
            backgroundColor: Colors.Boxbackground,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingTop: insetTop,
            overflow: 'hidden'
          }}
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
        </View>
      </ScrollView>

      <View
        style={{
          gap: Spacing.horizontal,
          alignItems: 'center'
        }}
      >
        <Information
          label='Ism'
          value='Dilshodbek'
          copyable
          onCopy={() => copyText('Dilshodbek')}
        />

        <Information
          label='Telefon'
          value='+998 97 579-05-15'
          copyable
          onCopy={() => copyText('+998 97 579-05-15')}
        />

        <Information
          label='Reyting'
          value={
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Feather name='star' size={20} color={Colors.textSecondary} />
              <Feather name='star' size={20} color={Colors.textSecondary} />
              <Feather name='star' size={20} color={Colors.textSecondary} />
              <Feather name='star' size={20} color={Colors.textSecondary} />
              <Feather name='star' size={20} color={Colors.textSecondary} />
            </View>
          }
          rightComponent={
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}
            >
              <AppText
                variant='medium'
                style={{ fontSize: 12, color: Colors.textSecondary }}
              >
                99 kishi belgilagan
              </AppText>

              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 3,
                  paddingHorizontal: Spacing.horizontal,
                  backgroundColor: '#603a3aff',
                  borderRadius: 5,
                  gap: 5
                }}
              >
                <AppText
                  variant='medium'
                  style={{ fontSize: 12, color: Colors.red }}
                >
                  1.0
                </AppText>

                <AppText
                  variant='medium'
                  style={{ fontSize: 12, color: Colors.textSecondary }}
                >
                  Yomon
                </AppText>
              </View>
            </View>
          }
        />

        <Information
          label='Kommentariya'
          value='Sizga bildirilgan izohlar'
          rightComponent={
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <AppText style={{ color: Colors.textSecondary }}>12</AppText>
              <Feather
                name='message-circle'
                size={15}
                color={Colors.textSecondary}
              />
            </View>
          }
        />
      </View>
    </View>
  )
}

export default User
