import { Button, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import useThemeColor from '@/theme/useTheme'
import CustomBottomSheetModal from '../BottomSheets'
import Animated, {
  FadeInDown,
  FadeOutDown,
  ZoomIn,
  ZoomOut
} from 'react-native-reanimated'
import AppText from '../text'

interface Props {
  open: boolean
  onDismiss: () => void
  type?: 'ok' | 'yesno'
  message: string
  onOk?: () => void
  onYes?: () => void
  onNo?: () => void
  okText?: string
  yesText?: string
  noText?: string
}

const SheetModal = ({
  open,
  onDismiss,
  type = 'ok',
  message,
  onOk,
  onYes,
  onNo,
  okText = 'Ok',
  yesText = 'Ha',
  noText = 'Bekor qilish'
}: Props) => {
  const snapPoint = useMemo(() => ['40%'], [])
  const modalRef = useRef<any>(null)
  const Colors = useThemeColor()

  useEffect(() => {
    if (open) modalRef.current?.present()
    else modalRef.current?.dismiss()
  }, [open])

  const handleClose = () => {
    modalRef.current?.dismiss()
    onDismiss()
  }
  const handleOk = () => {
    onOk?.()
  }
  const handleYes = () => {
    onYes?.()
    handleClose()
  }
  const handleNo = () => {
    onNo?.()
    handleClose()
  }

  return (
    <CustomBottomSheetModal
      ref={modalRef}
      snapPoints={snapPoint}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      handleIndicatorStyle={{ display: 'none' }}
      enablePanDownToClose
      backdropOpacity={0.5}
      onDismiss={onDismiss}
    >
      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutDown.duration(300)}
        style={[styles.wrapper, { backgroundColor: Colors.Boxbackground }]}
      >
        <Animated.View entering={ZoomIn.delay(100)} exiting={ZoomOut}>
          <AppText style={[styles.message, { color: Colors.textPrimary }]}>
            {message}
          </AppText>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.buttonContainer}
        >
          {type === 'ok' && <Button title={okText} onPress={handleOk} />}
          {type === 'yesno' && (
            <View style={styles.row}>
              <Pressable
                style={[styles.btn, styles.yesBtn]}
                onPress={handleYes}
              >
                <AppText style={styles.btnText}>{yesText}</AppText>
              </Pressable>

              <Pressable style={[styles.btn, styles.noBtn]} onPress={handleNo}>
                <AppText style={styles.btnText}>{noText}</AppText>
              </Pressable>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </CustomBottomSheetModal>
  )
}

export default SheetModal

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },

  message: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.2,
    marginBottom: 20
  },

  buttonContainer: {
    width: '100%',
    marginTop: 10,
    height: 55
  },

  yseBtn: {
    flex: 1,
    borderRadius: 16
  },

  okBtn: {
    borderRadius: 16,
    width: '100%',
    backgroundColor: '#4a90e2'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%'
  },

  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },

  yesBtn: {
    backgroundColor: '#4CAF50' // Yashil (Ha)
  },

  noBtn: {
    backgroundColor: '#E53935' // Qizil (Bekor qilish)
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
