import { Button, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import { IThemeColors } from '@/theme/color'
import { Controller, useForm } from 'react-hook-form'
import { unMask } from 'react-native-mask-text'
import AppPhoneInput from '@/components/Input/phoneInput'
interface RegProps {
  onSubmitRef: React.MutableRefObject<() => void>
}
const Register = ({ onSubmitRef }: RegProps) => {
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

      <Button title='submit' onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default Register

const styles = (Colors: IThemeColors) => StyleSheet.create({})
