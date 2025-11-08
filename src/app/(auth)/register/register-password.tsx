import { Button, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { useAtom } from 'jotai'
import { registerAtom } from '@/widget/auth/register/register'
import { authAtom } from '@/service/user/register-login/controller'

export default function RegisterPassword () {
  const Colors = useThemeColor()
  const [registerState, setRegisterState] = useAtom(registerAtom)
  const [register, setRegister] = useAtom(authAtom)
  const { control, handleSubmit } = useForm({ defaultValues: { password: '' } })
  console.log('register', register)

  const onSubmit = (data: any) => {
    const { password } = data

    const updatedRegisterData = {
      ...registerState,
      password
    }

    setRegisterState(updatedRegisterData)

    setRegister(updatedRegisterData, 'register')
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
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppInput onChangeText={onChange} value={value} label='Parol' />
            )}
          />

          <Button title={'submit'} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
