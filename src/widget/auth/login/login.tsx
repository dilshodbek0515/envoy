import { Button, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
import AppInput from '@/components/Input/passwordInput'
import AppText from '@/components/text'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { useAtom } from 'jotai'
import { authAtom } from '@/service/user/register-login/controller'

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>
  onValidityChange: (isValid: boolean) => void
}

const Login = ({ onSubmitRef, onValidityChange }: LoginProps) => {
  const Colors = useThemeColor()

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { phone: '', password: '' }
  })

  const phone = watch('phone')
  const password = watch('password')
  const isValid = phone.length === 12 && password.length >= 8

  useEffect(() => {
    onValidityChange(isValid)
  }, [isValid])

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
