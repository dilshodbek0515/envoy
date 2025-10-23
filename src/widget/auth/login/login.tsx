import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { IThemeColors } from '@/theme/color'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
import AppInput from '@/components/Input/passwordInput'
import axios from 'axios'

const Login = () => {
  const Colors = useThemeColor()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: '',
      password: ''
    }
  })

  const onSubmit = async (data: any) => {
    const unformatted = '+998' + unMask(data.phone)
    const payload = {
      phone_number: unformatted,
      password: data.password
    }

    console.log(payload)

    try {
      const { data } = await axios.post(
        'http://my.example.uz.webcoder.uz/user/login/',
        payload
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Spacing.horizontal,
        paddingTop: Spacing.horizontal,
        gap: Spacing.horizontal * 2
      }}
    >
      <Controller
        name='phone'
        control={control}
        render={({ field: { onChange, value } }) => (
          <AppPhoneInput
            onChangeText={onChange}
            value={value}
            label='Telefon raqam'
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field: { onChange, value } }) => (
          <AppInput onChangeText={onChange} value={value} label='Parol' />
        )}
      />
      <Button title='submit' onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default Login

const styles = (Colors: IThemeColors) => StyleSheet.create({})
