import {
  Button,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { useAtomValue, useSetAtom } from 'jotai'
import { registerAtom } from '@/widget/auth/register/register'

const RegisterInfo = () => {
  const Colors = useThemeColor()
  const setRegisterState = useSetAtom(registerAtom)
  const registerState = useAtomValue(registerAtom)
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

  const role = watch('role')

  const onSubmit = (data: any) => {
    router.push(AppRoutes.auth.register.registerPassword)
    const { name, role } = data
    setRegisterState((prev: any) => ({
      ...prev,
      name,
      role
    }))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Ro'yxatdan o'tish" isEnabledBack />

        <View
          style={{
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

          <Button title={'submit'} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterInfo
