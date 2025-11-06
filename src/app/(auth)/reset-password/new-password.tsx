import { Button, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import { Controller, useForm } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { useAtom } from 'jotai'
import { newPasswordAtom } from '@/service/user/new-password/controller'

const ResetPasswordNewPassword = () => {
  const [newPassState, setNewPasswordState] = useAtom(newPasswordAtom)

  const { control, handleSubmit } = useForm({
    defaultValues: { new_password: '' }
  })

  const onSubmit = (data: any) => {
    setNewPasswordState(data.new_password)
  }

  // useEffect(() => {
  //   console.log('New password', newPassState)
  // }, [newPassState])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title='Yangi parol' isEnabledBack />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.horizontal,
            paddingTop: Spacing.horizontal
          }}
        >
          <Controller
            name='new_password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label='Yangi parol'
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Button title='submit' onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ResetPasswordNewPassword
