import { Button, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { IThemeColors } from '@/theme/color'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
import AppInput from '@/components/Input/passwordInput'
import axios from 'axios'
import AppText from '@/components/text'

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

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit)
  }, [handleSubmit])

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

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: Colors.primary,
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          width: Screens.width - Spacing.horizontal * 2,
          borderRadius: 20
        }}
      >
        <AppText style={{ fontSize: 18, fontWeight: 600 }}>
          Dasturga kirish
        </AppText>
      </Pressable>
    </View>
  )
}

export default Login

const styles = (Colors: IThemeColors) => StyleSheet.create({})
