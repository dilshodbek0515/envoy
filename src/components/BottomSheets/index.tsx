import { View, Text } from 'react-native'
import React, { forwardRef, ReactNode, useCallback } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = BottomSheetModalProps & {
  children: ReactNode
  backdropAppearIndex?: number
  backdropDisappearIndex?: number
  backdropOpacity?: number
  pressBehavior?: 'close' | 'collapse' | 'none'
  insetsTopEnabled?: boolean
}

const CustomBottomSheetModal = forwardRef<BottomSheetModalMethods, Props>(
  (
    {
      children,
      backdropAppearIndex = 0,
      backdropDisappearIndex = -1,
      backdropOpacity = 1,
      pressBehavior = 'close',
      insetsTopEnabled,
      ...props
    },
    ref
  ) => {
    const Colors = useThemeColor()

    const renderBackDrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={backdropAppearIndex}
          disappearsOnIndex={backdropDisappearIndex}
          pressBehavior={pressBehavior}
          opacity={backdropOpacity}
        ></BottomSheetBackdrop>
      ),
      [
        backdropAppearIndex,
        backdropDisappearIndex,
        pressBehavior,
        backdropOpacity
      ]
    )

    const insetTop = useSafeAreaInsets().top

    return (
      <BottomSheetModal
        enableDynamicSizing={false}
        ref={ref}
        backgroundComponent={renderBackDrop}
        backgroundStyle={{ backgroundColor: Colors.pageBackground }}
        handleIndicatorStyle={{
          backgroundColor: Colors.textSecondary,
          borderRadius: 20
        }}
        {...props}
      >
        {children}
      </BottomSheetModal>
    )
  }
)

export default CustomBottomSheetModal
