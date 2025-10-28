import {
  ActivityIndicator,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useState } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import AppPhoneInput from '@/components/Input/phoneInput'
import { Spacing } from '@/shared/tokens'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorText from '@/components/errorText'
import { atom, useAtom, useSetAtom } from 'jotai'
import { unMask } from 'react-native-mask-text'
import axios from 'axios'
import useThemeColor from '@/theme/useTheme'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'

export const URL = 'https://envoy.odamqosh.com'

const phoneSchema = z.object({
  phone: z.string().refine(value => value.length >= 12, {
    message: 'Telefon raqamni kiriting'
  })
})

export type TPhoneSchemaType = z.infer<typeof phoneSchema>
export const resetPasswordPhone = atom('')
export const resetPasswordSms = atom('')

const ResetPasswordCheckPhone = () => {
  const [phone, setPhone] = useAtom(resetPasswordPhone)
  const setSms = useSetAtom(resetPasswordSms)
  const [isRegister, setIsRegister] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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
    setPhone(unFormatted)
    const exists = await checkPhone(unFormatted)
    if (exists) {
      await sendSms(unFormatted)
      router.replace(AppRoutes.auth.resetPassword.checkSmsCode)
    }
  }

  const checkPhone = async (phone: string) => {
    setIsRegister(null)
    setIsLoading(true)
    try {
      const { data } = await axios.post(URL + '/user/check-phone/', { phone })
      setIsRegister(data.exists)
      return data.exists
    } catch (error) {
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const sendSms = async (phone: string) => {
    try {
      const { data } = await axios.post(URL + '/user/send-sms/', {
        phone
      })
      console.log(data)
      setSms(data.code)
    } catch (error) {
      console.log(error)
    }
  }

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

          {isRegister === false && (
            <ErrorText
              error={"Siz ro'yxatdan o'tmagansiz"}
              isVisable={isRegister === false ? true : false}
            />
          )}

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

const styles = StyleSheet.create({})
