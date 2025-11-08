import {
  ActivityIndicator,
  Button,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '@/components/header/PageHeader'
import { Controller, useForm, useWatch } from 'react-hook-form'
import AppPhoneInput from '@/components/Input/phoneInput'
import { Screens, Spacing } from '@/shared/tokens'
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
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppText from '@/components/text'

const phoneSchema = z.object({
  phone: z.string().refine(value => value.length >= 12, {
    message: 'Telefon raqamni kiriting'
  })
})

export type TPhoneSchemaType = z.infer<typeof phoneSchema>
export const resetPasswordSms = atom('')

const ResetPasswordCheckPhone = () => {
  const [_phoneState, setPhone] = useAtom(checkPhoneAtom)
  const setResetPhone = useSetAtom(resetPasswordPhone)
  const setSms = useSetAtom(resetPasswordSms)
  const insetBottom = useSafeAreaInsets().bottom
  const [smsState, sendSmsAction] = useAtom(sendSmsAtom)
  const Colors = useThemeColor()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TPhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' }
  })

  const phone = useWatch({ control, name: 'phone' })
  const isValid = phone.length === 12

  const onSubmit = async (data: any) => {
    if (!isValid || loading) return
    setLoading(true)
    setTimeout(async () => {
      const unFormatted = '+998' + unMask(data.phone)
      setResetPhone(unFormatted)
      const exists = await setPhone(unFormatted)
      if (exists) {
        const code = await sendSmsAction(unFormatted)
        if (code) {
          setSms(code)
          console.log('sms code', code)
        }
        router.push(AppRoutes.auth.resetPassword.checkSmsCode)
      }
      setLoading(false)
    }, 500)
  }

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

          <View
            style={{
              width: Screens.width,
              height: Screens.height * 0.12,
              position: 'absolute',
              bottom: 0 + insetBottom,
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

export default ResetPasswordCheckPhone
