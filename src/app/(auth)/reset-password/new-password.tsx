import {
  Button,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import { Controller, useForm } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import axios from 'axios'
import { resetPasswordPhone } from '.'
import { useAtomValue } from 'jotai'
import { URL } from '@/shared/api'

const ResetPasswordNewPassword = () => {
  const phone = useAtomValue(resetPasswordPhone)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      new_password: ''
    }
  })

  const onSubmit = (data: any) => {
    newPassword(data.new_password)
  }

  const newPassword = async (password: string) => {
    const payload = {
      phone,
      password
    }

    console.log(payload)

    try {
      const { data } = await axios.post(URL + '/user/reset-password/', payload)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

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

const styles = StyleSheet.create({})
