import { View } from 'react-native'
import React, { useEffect } from 'react'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
import ErrorText from '@/components/errorText'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { atom, useAtom, useSetAtom } from 'jotai'
import { resetPasswordSms } from '@/app/(auth)/reset-password'
import { checkPhoneAtom } from '@/service/user/check-phone/controller'
import { sendSmsAtom } from '@/service/user/send-sms/constroller'
interface RegProps {
  onSubmitRef: React.MutableRefObject<() => void>
  onValidityChange: (isValid: boolean) => void
}

interface IRegisterStateAtom {
  phone: string
  name: string
  role: 'Customer' | 'Driver'
  password: string
}

export const registerAtom = atom<IRegisterStateAtom>({
  phone: '',
  name: '',
  role: 'Customer',
  password: ''
})

const Register = ({ onSubmitRef, onValidityChange }: RegProps) => {
  const Colors = useThemeColor()
  const [_sms, setSms] = useAtom(resetPasswordSms)
  const setRegisterState = useSetAtom(registerAtom)
  const [phoneState, setCheckPhone] = useAtom(checkPhoneAtom)
  const [smsState, sendSmsAction] = useAtom(sendSmsAtom)
  console.log('yangi sms', smsState)

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { phone: '', password: '' }
  })

  const phone = watch('phone')
  const isValid = phone.length === 12

  useEffect(() => {
    onValidityChange(isValid)
  }, [isValid])

  const onSubmit = async (data: any) => {
    const unformatted = '+998' + unMask(data.phone)
    const exists = await setCheckPhone(unformatted)
    if (exists === false) {
      const code = await sendSmsAction(unformatted)
      if (code) {
        console.log('sms code', code)
        setSms(code)
      }
    }
    setRegisterState((prev: any) => ({
      ...prev,
      phone: unformatted
    }))
  }

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit)
  }, [handleSubmit])

  onSubmitRef.current = handleSubmit(onSubmit)

  useEffect(() => {
    if (phoneState.exists === false) {
      router.push(AppRoutes.auth.register.registerSms)
    }
  }, [phoneState.exists])

  useEffect(() => {
    if (smsState.code) {
      setSms(smsState.code)
      console.log(smsState.code)
    }
  }, [smsState.code])

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

      <ErrorText
        error="Raqam Ro'yhatdan o'tgan"
        isVisable={phoneState.exists ? phoneState.exists : undefined}
      />
    </View>
  )
}

export default Register
