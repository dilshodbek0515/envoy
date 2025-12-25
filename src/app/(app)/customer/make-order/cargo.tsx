import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import MakeOrderNavigationButtons from '@/widget/customer/make-order/MakeOrderNavigationButtons'
import UnitInput from '@/components/Input/UnitInput'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  cargoSchema,
  TCargoSchema
} from '@/shared/validation/make-order/cargo-schema'
import { useAtom, useAtomValue } from 'jotai'
import safeRoute from '@/utils/safeNavigate'
import { getOrderCargoAtom } from '@/atoms/make-order/cargo'
import AppText from '@/components/text'
import DefualtButton from '@/components/Button/DefualtButton'
import { TUnit } from '@/constants/units'
import ErrorText from '@/components/errorText'
import useThemeColor from '@/theme/useTheme'
import { themeAtom } from '@/theme/theme'
import { vibration } from '@/utils/haptics'
import { useState } from 'react'
const Cargo = () => {
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <PageHeader
        hide
        animated
        title='Yuk'
        isEnabledBack
        onLeftPress={() =>
          safeRoute(() => router.push(AppRoutes.customer.makeOrder.index))
        }
      />
      <Form />
      <MakeOrderNavigationButtons
        isVisableFirstButton={false}
        secondTitle='Manzil'
        secondPath={AppRoutes.customer.makeOrder.location}
      />
    </Pressable>
  )
}

export default Cargo

const defaultValues = {
  type: { value: '', unit: '' },
  weight: { value: '', unit: 'kg' },
  volume: { value: '', unit: 'm³' },
  quantity: { value: '', unit: 'dona' },
  length: { value: '', unit: 'm' },
  height: { value: '', unit: 'm' },
  width: { value: '', unit: 'm' }
}

const Form = () => {
  const [cargoData, setCargoData] = useAtom(getOrderCargoAtom)
  const [isChange, setIsChange] = useState(false)

  const Colors = useThemeColor()
  const theme = useAtomValue(themeAtom)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<TCargoSchema>({
    resolver: zodResolver(cargoSchema),
    defaultValues: cargoData
  })

  const onSubmit = (data: any) => {
    setCargoData(data)
    setIsChange(false)
  }
  
  console.log(cargoData)
  console.log(isChange)

  const renderInput = (name: TUnit, label: string) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <UnitInput
            label={label}
            value={value?.value}
            onChangeText={text => {
              onChange({ ...value, value: text }), setIsChange(true)
            }}
            onChangeUnit={unit => {
              onChange({ ...value, unit }), setIsChange(true)
            }}
            unitTypes={name}
            unit={value?.unit || null}
            keyboardType={name === 'type' ? 'default' : 'numeric'}
            error={errors[name]?.value?.message}
          />
        )}
      />
    )
  }

  const handleClear = () => {
    reset(defaultValues)
    vibration.heavy()
    Keyboard.dismiss()
    setIsChange(true)
    setCargoData(defaultValues)
  }

  return (
    <View
      style={{
        marginTop: Spacing.horizontal,
        paddingHorizontal: Spacing.horizontal,
        gap: Spacing.horizontal
      }}
    >
      {renderInput('type', 'Yuk turi')}

      {errors.type?.value?.message && (
        <ErrorText
          error={errors.type?.value?.message ?? ''}
          isVisable={errors.type?.value?.message}
        />
      )}
      <View style={{ flexDirection: 'row', gap: Spacing.horizontal }}>
        <View style={{ flex: 1 }}>{renderInput('weight', 'Vazni')}</View>
        <View style={{ flex: 1 }}>{renderInput('volume', 'Hajmi')}</View>
      </View>
      <View style={{ flexDirection: 'row', gap: Spacing.horizontal }}>
        <View style={{ flex: 1 }}>{renderInput('quantity', 'Soni')}</View>
        <View style={{ flex: 1 }}>{renderInput('length', 'Uzunligi')}</View>
      </View>
      <View style={{ flexDirection: 'row', gap: Spacing.horizontal }}>
        <View style={{ flex: 1 }}>{renderInput('height', 'Balandligi')}</View>
        <View style={{ flex: 1 }}>{renderInput('width', 'Eni')}</View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        <DefualtButton
          onPress={handleClear}
          disabled={!isDirty}
          style={{
            backgroundColor: isDirty ? Colors.red02 : Colors.Boxbackground,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 8
          }}
        >
          <AppText
            style={{
              color: isDirty ? Colors.textPrimary : Colors.textSecondary
            }}
          >
            Tozalash
          </AppText>
        </DefualtButton>

        <DefualtButton
          disabled={!isChange}
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: isChange ? Colors.green02 : Colors.Boxbackground,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 8
          }}
        >
          <AppText
            style={{
              color: isChange ? Colors.textPrimary : Colors.textSecondary
            }}
          >
            Saqlash
          </AppText>
        </DefualtButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
