import {
  ActivityIndicator,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import AppPhoneInput from '@/components/Input/phoneInput'
import { Spacing } from '@/shared/tokens'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorText from '@/components/errorText'
import { atom, useAtom, useSetAtom } from 'jotai'
import { unMask } from 'react-native-mask-text'
import useThemeColor from '@/theme/useTheme'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { sendSmsAtom } from '@/service/user/send-sms/constroller'
import { checkPhoneAtom } from '@/service/user/check-phone/controller'
import { resetPasswordPhone } from '@/service/user/controller/controller'

const phoneSchema = z.object({
  phone: z.string().refine(value => value.length >= 12, {
    message: 'Telefon raqamni kiriting'
  })
})

export type TPhoneSchemaType = z.infer<typeof phoneSchema>
export const resetPasswordSms = atom('')

const ResetPasswordCheckPhone = () => {
  const [phoneState, setPhone] = useAtom(checkPhoneAtom)
  const setResetPhone = useSetAtom(resetPasswordPhone)
  const setSms = useSetAtom(resetPasswordSms)
  const [isLoading, setIsLoading] = useState(false)
  const [smsState, sendSmsAction] = useAtom(sendSmsAtom)
  const Colors = useThemeColor()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TPhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = async (data: any) => {
    const unFormatted = '+998' + unMask(data.phone)
    setResetPhone(unFormatted)
    const exists = await setPhone(unFormatted)
    if (exists) {
      const code = await sendSmsAction(unFormatted)
      if (code) {
        setSms(code)
        console.log('sms code', code)
      }
    }
  }

  useEffect(() => {
    if (phoneState.exists) {
      router.push(AppRoutes.auth.resetPassword.checkSmsCode)
    }
  }, [phoneState.exists])

  useEffect(() => {
    if (smsState.code) {
      setSms(smsState.code)
      console.log(smsState.code)
    }
  }, [smsState.code])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title='Parolni tiklash' isEnabledBack />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.horizontal,
            paddingTop: Spacing.horizontal
          }}
        >
          <Controller
            name='phone'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppPhoneInput onChangeText={onChange} value={value} />
            )}
          />

          <ErrorText
            error={'Telefon raqamni kiriting'}
            isVisable={errors.phone?.message}
          />

          {/* <ErrorText
            error={"Siz ro'yxatdan o'tmagansiz"}
            isVisable={phoneState === false ? false : true}
          /> */}

          {!isLoading ? (
            <Button title='Davom etish' onPress={handleSubmit(onSubmit)} />
          ) : (
            <ActivityIndicator size={'large'} color={Colors.primary} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ResetPasswordCheckPhone
