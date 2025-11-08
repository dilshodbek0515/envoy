import {
  ActivityIndicator,
  Button,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useMemo, useState } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm, useWatch } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { useAtom } from 'jotai'
import { registerAtom } from '@/widget/auth/register/register'
import { authAtom } from '@/service/user/register-login/controller'
import AppText from '@/components/text'

export default function RegisterPassword () {
  const Colors = useThemeColor()
  const [registerState, setRegisterState] = useAtom(registerAtom)
  const [register, setRegister] = useAtom(authAtom)
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: { password: '', confirm_password: '' }
  })
  console.log('register', register)

  const password = useWatch({ control, name: 'password' })
  const confirm_password = useWatch({ control, name: 'confirm_password' })

  const passwordCheckbox = useMemo(
    () => ({
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      length: password.length >= 8
    }),
    [password]
  )

  const isValid =
    passwordCheckbox.upperCase &&
    passwordCheckbox.lowerCase &&
    passwordCheckbox.number &&
    passwordCheckbox.length &&
    password === confirm_password

  const CheckRow = ({ label, active }: { label: string; active: boolean }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.horizontal
      }}
    >
      <View
        style={{
          width: 25,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
          borderWidth: 1,
          borderColor: Colors.borderColor,
          backgroundColor: active ? Colors.primary : 'transparent'
        }}
      >
        {active && (
          <AppText style={{ color: 'white', fontWeight: 'bold' }}>✓</AppText>
        )}
      </View>
      <AppText
        variant='semiBold'
        style={{ color: active ? Colors.primary : Colors.borderColor }}
      >
        {label}
      </AppText>
    </View>
  )

  const onSubmit = (data: any) => {
    if (!isValid) return
    setLoading(true)
    setTimeout(() => {
      const { password } = data
      const updatedRegisterData = { ...registerState, password }
      setRegisterState(updatedRegisterData)
      setRegister(updatedRegisterData, 'register')
      setLoading(false)
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

          <Controller
            name='confirm_password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppInput
                onChangeText={onChange}
                value={value}
                label='Parolni qayta kiriting'
                isPassword
              />
            )}
          />

          <View style={{ paddingHorizontal: 10, gap: 5 }}>
            <CheckRow
              label='Kamida 1 ta KATTA harf'
              active={passwordCheckbox.upperCase}
            />
            <CheckRow
              label='Kamida 1 ta kichik harf'
              active={passwordCheckbox.lowerCase}
            />
            <CheckRow
              label='Kamida 1 ta son'
              active={passwordCheckbox.number}
            />
            <CheckRow
              label='Kamida 8 ta belgi'
              active={passwordCheckbox.length}
            />
          </View>

          <View
            style={{
              width: Screens.width,
              height: Screens.height * 0.12,
              position: 'absolute',
              bottom: 0,
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
              disabled={!isValid || loading}
              style={{
                backgroundColor:
                  isValid && !loading ? Colors.primary : Colors.Boxbackground04,
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
