import {
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import PageHeader from '@/components/header/PageHeader'
import { Screens, Spacing } from '@/shared/tokens'
import { Controller, useForm, useWatch } from 'react-hook-form'
import AppInput from '@/components/Input/passwordInput'
import { useAtom } from 'jotai'
import { newPasswordAtom } from '@/service/user/new-password/controller'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppText from '@/components/text'
import { useMemo } from 'react'
import { Ionicons } from '@expo/vector-icons'
import useThemeColor from '@/theme/useTheme'

const ResetPasswordNewPassword = () => {
  const [_newPassState, setNewPasswordState] = useAtom(newPasswordAtom)
  const insetBottom = useSafeAreaInsets().bottom
  const Colors = useThemeColor()

  const { control, handleSubmit } = useForm({
    defaultValues: { new_password: '', confirm_password: '' }
  })

  const new_password = useWatch({ control, name: 'new_password' })
  const confirm_password = useWatch({ control, name: 'confirm_password' })

  const passwordCheckbox = useMemo(
    () => ({
      upperCase: /[A-Z]/.test(new_password),
      lowerCase: /[a-z]/.test(new_password),
      number: /[0-9]/.test(new_password),
      length: new_password.length >= 8
    }),
    [new_password]
  )

  const isValid =
    passwordCheckbox.upperCase &&
    passwordCheckbox.lowerCase &&
    passwordCheckbox.number &&
    passwordCheckbox.length &&
    confirm_password === new_password

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
        {active && <Ionicons name='checkmark' size={18} color='white' />}
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
    setNewPasswordState(data.new_password)
    router.replace(AppRoutes.auth.auth)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title='Parolni yangilash' isEnabledBack />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.horizontal,
            paddingTop: Spacing.horizontal,
            gap: Spacing.horizontal
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
          <Controller
            name='confirm_password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label='Parolni qata kiriting'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <View
            style={{
              paddingHorizontal: 10,
              width: Screens.width * 0.92,
              gap: 5
            }}
          >
            <CheckRow
              label='Kamida 1ta KATTA harf'
              active={passwordCheckbox.upperCase}
            />
            <CheckRow
              label='Kamida 1ta kichik harf'
              active={passwordCheckbox.lowerCase}
            />
            <CheckRow label='Kamida 1ta son' active={passwordCheckbox.number} />
            <CheckRow
              label='Kamida 8ta belgi'
              active={passwordCheckbox.length}
            />
          </View>

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
              disabled={!isValid}
              style={{
                backgroundColor: isValid
                  ? Colors.primary
                  : Colors.Boxbackground04,
                height: 55,
                width: Screens.width - Spacing.horizontal * 2,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AppText
                variant='semiBold'
                style={{ fontSize: 18, color: 'white' }}
              >
                Yuborish
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ResetPasswordNewPassword
