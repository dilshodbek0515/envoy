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
import { useAtom } from 'jotai'
import safeRoute from '@/utils/safeNavigate'
import { getOrderCargoAtom, normalizeCargoData } from '@/atoms/make-order/cargo'
import AppText from '@/components/text'
import DefualtButton from '@/components/Button/DefualtButton'
import { TUnit } from '@/constants/units'
import { TCargo } from '@/types/order'
const cargo = () => {
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <PageHeader
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

export default cargo

const Form = () => {
  const [cargo, setCargo] = useAtom(getOrderCargoAtom)
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<TCargoSchema>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      type: { value: '', unit: null },
      weight: { value: '', unit: 'kg' },
      volume: { value: '', unit: 'm³' },
      quantity: { value: '', unit: 'dona' },
      length: { value: '', unit: 'm' },
      height: { value: '', unit: 'm' },
      width: { value: '', unit: 'm' }
    }
  })

  const watches = watch()

  const onSave = () => {
    setCargo({
      type: { value: watches.type.value, unit: null }
    })
  }
  const onSubmit = (data: any) => {
    console.log(data)
    console.log('awdawdawda')
  }

  const renderInput = (name: TUnit, label: string) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <UnitInput
            label={label}
            value={value?.value}
            onChangeText={text => onChange({ ...value, value: text })}
            onChangeUnit={unit => onChange({ ...value, unit })}
            unitTypes={name}
            unit={value?.unit || null}
            keyboardType={name === 'type' ? 'default' : 'numeric'}
            error={errors[name]?.value?.message}
          />
        )}
      />
    )
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

      <DefualtButton onPress={onSave}>
        <AppText>Saqlash</AppText>
      </DefualtButton>
    </View>
  )
}

const styles = StyleSheet.create({})
