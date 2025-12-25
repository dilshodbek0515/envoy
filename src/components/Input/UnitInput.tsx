import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import useThemeColor from '@/theme/useTheme'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Spacing } from '@/shared/tokens'
import { vibration } from '@/utils/haptics'
import DefualtButton from '../Button/DefualtButton'
import AppText from '../text'
import CustomBottomSheetModal from '../BottomSheets'
import { TUnit, UNIT_OPTIONS } from '@/constants/units'

type TUnitInput = {
  label: string
  unit: string | null
  onChangeUnit: (unit: string) => void
  unitTypes: TUnit
  error: string | undefined
} & TextInputProps

const UnitInput: React.FC<TUnitInput> = ({
  label,
  value,
  unit,
  onChangeUnit,
  unitTypes,
  error,
  ...props
}) => {
  const [inputFocus, setInputFocus] = useState(false)
  const Colors = useThemeColor()
  const labelAnimation = useSharedValue(0)
  const sheetRef = useRef<BottomSheetModalMethods>(null)
  const inputRef = useRef<TextInput>(null)

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(labelAnimation.value, [0, 1], [17, -9.5]),
    fontSize: interpolate(labelAnimation.value, [0, 1], [16, 12]),
    color: interpolateColor(
      inputFocus ? 1 : 0,
      [0, 1],
      [Colors.textSecondary, Colors.primary]
    )
  }))

  useEffect(() => {
    let show = inputFocus || value?.length
    labelAnimation.value = withTiming(show ? 1 : 0, { duration: 200 })
  }, [inputFocus, value])

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      inputFocus ? 1 : 0,
      [0, 1],
      [Colors.borderColor, Colors.primary]
    )
  }))

  const handleUnit = () => {
    sheetRef.current?.present()
    Keyboard.dismiss()
    vibration.light()
  }

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Text
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.label,
          labelAnimatedStyle,
          { backgroundColor: Colors.pageBackground }
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        ref={inputRef}
        style={styles.input}
        value={value}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />

      {unit && (
        <DefualtButton
          onPress={handleUnit}
          style={{
            position: 'absolute',
            right: 3,
            height: 47,
            backgroundColor: Colors.Boxbackground,
            borderRadius: 16,
            paddingHorizontal: 15,
            top: 3,
            justifyContent: 'center'
          }}
        >
          <AppText>{unit}</AppText>
        </DefualtButton>
      )}

      <UnitPicker
        ref={sheetRef}
        unitTypes={unitTypes}
        unit={unit}
        onChangeUnit={onChangeUnit}
      />
    </Animated.View>
  )
}

export default UnitInput

interface IUnitPicker {
  ref: RefObject<BottomSheetModalMethods | null>
  unitTypes: TUnit
  unit: string | null
  onChangeUnit: (unit: string) => void
}

const UnitPicker = ({ ref, unitTypes, unit, onChangeUnit }: IUnitPicker) => {
  const unitOptions = UNIT_OPTIONS()[unitTypes]
  const Colors = useThemeColor()
  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['40%']}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: Spacing.horizontal,
          paddingTop: Spacing.horizontal,
          flexWrap: 'wrap',
          paddingHorizontal: Spacing.horizontal
        }}
      >
        {unitOptions.length > 0 &&
          unitOptions.map(unit => {
            return (
              <DefualtButton
                key={unit.shortName}
                onPress={() => {
                  onChangeUnit(unit.shortName),
                    ref.current?.dismiss(),
                    vibration.light()
                }}
                style={{
                  backgroundColor: Colors.Boxbackground,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 10
                }}
              >
                <AppText style={{ fontSize: 18 }}>{unit.name}</AppText>
              </DefualtButton>
            )
          })}
      </View>
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#fff'
  },
  input: {
    height: 55,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff'
  },
  label: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    left: 16,
    top: 17,
    paddingHorizontal: 4,
    borderRadius: 1000,
    zIndex: 5
  }
})
