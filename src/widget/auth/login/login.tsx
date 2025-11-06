import { Button, View } from 'react-native'
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
import { useAtom } from 'jotai'
import { authAtom } from '@/service/user/register-login/controller'

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>
}

const Login = ({ onSubmitRef }: LoginProps) => {
  const Colors = useThemeColor()

  const { control, handleSubmit } = useForm({
    defaultValues: { phone: '', password: '' }
  })

  const [loginState, setLoginState] = useAtom(authAtom)
  console.log('loginState', loginState)

  const onSubmit = useCallback(async (data: any) => {
    const unformatted = '+998' + unMask(data.phone)
    const payload = { phone: unformatted, password: data.password }
    setLoginState(payload, 'login')
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
