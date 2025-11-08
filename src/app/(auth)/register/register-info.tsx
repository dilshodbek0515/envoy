import {
  ActivityIndicator,
  Button,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useState } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { useAtom } from 'jotai'
import { registerAtom } from '@/widget/auth/register/register'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RegisterInfo = () => {
  const Colors = useThemeColor()
  const [_registerState, setRegisterState] = useAtom(registerAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const insetBottom = useSafeAreaInsets().bottom

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      role: 'Customer'
    }
  })

  const name = watch('name')
  const role = watch('role')

  const isButtonActive = name.trim().length > 2

  const onSubmit = (data: any) => {
    if (!isButtonActive) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const { name, role } = data
      setRegisterState((prev: any) => ({
        ...prev,
        name,
        role
      }))
      router.push(AppRoutes.auth.register.registerPassword)
    }, 500)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Ro'yxatdan o'tish" isEnabledBack />

        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.horizontal,
            paddingTop: Spacing.horizontal,
            gap: Spacing.horizontal
          }}
        >
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppInput onChangeText={onChange} value={value} label='Ism' />
            )}
          />

          <View
            style={{
              height: 55,
              borderWidth: 1,
              borderColor: Colors.borderColor,
              borderRadius: 20,
              padding: 5,
              flexDirection: 'row'
            }}
          >
            <Pressable
              onPress={() => setValue('role', 'Driver')}
              style={{
                flex: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  role === 'Driver' ? Colors.borderColor : Colors.pageBackground
              }}
            >
              <AppText variant='semiBold' style={{ fontSize: 16 }}>
                Haydovchi
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => setValue('role', 'Customer')}
              style={{
                flex: 1,
                backgroundColor:
                  role === 'Customer'
                    ? Colors.borderColor
                    : Colors.pageBackground,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AppText variant='semiBold' style={{ fontSize: 16 }}>
                Mijoz
              </AppText>
            </Pressable>
          </View>

          <View
            style={{
              width: Screens.width,
              height: Screens.height * 0.12,
              position: 'absolute',
              bottom: 0 + insetBottom,
              backgroundColor: Colors.Boxbackground06,
              paddingHorizontal: Spacing.horizontal,
              paddingVertical: 10,
              alignItems: 'center',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}
          >
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={!isButtonActive || loading}
              style={{
                backgroundColor:
                  isButtonActive && !loading
                    ? Colors.primary
                    : Colors.Boxbackground04,
                height: 55,
                width: Screens.width - Spacing.horizontal * 2,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {loading ? (
                <ActivityIndicator size='large' color={Colors.primary} />
              ) : (
                <AppText
                  variant='semiBold'
                  style={{ fontSize: 18, color: 'white' }}
                >
                  Yuborish
                </AppText>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterInfo
