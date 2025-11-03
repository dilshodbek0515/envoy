import { View } from 'react-native'
import React, { useCallback } from 'react'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
import AppInput from '@/components/Input/passwordInput'
import axios from 'axios'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>
}

const Login = ({ onSubmitRef }: LoginProps) => {
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

  const onSubmit = useCallback(async (data: any) => {
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
      console.log('Login muvaffaqiyatli', data)
    } catch (error: any) {
      console.log(error)
    }
  }, [])

  onSubmitRef.current = handleSubmit(onSubmit)

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
          <AppInput
            onChangeText={onChange}
            value={value}
            label='Parol'
            isPassword
          />
        )}
      />

      <AppText
        onPress={() => router.push(AppRoutes.auth.resetPassword.checkPhone)}
        style={{ color: Colors.primary, textAlign: 'right' }}
      >
        Parol esdan chiqdimi ?
      </AppText>
    </View>
  )
}

export default Login
