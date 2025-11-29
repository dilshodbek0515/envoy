import useThemeColor from '@/theme/useTheme'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import AppText from '../text'
import SmsCodeBox from '../SmsCodeBox/SmsCodeBox'
import NumberKeyboard from '../Keyboard/Keyboard'

const SmsVerificationModal = ({
  onClose,
  handleSaveNumber
}: {
  onClose: () => void
  handleSaveNumber: () => void
}) => {
  const Colors = useThemeColor()
  const [code, setCode] = useState('')
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null)
  const [count, setCount] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const animValues = [0, 1, 2, 3].map(() => useSharedValue(1))

  useEffect(() => {
    animValues.forEach((anim, i) => {
      anim.value = code[i] ? 1 : 0
    })
  }, [code])

  useEffect(() => {
    if (code.length === 4) {
      setTimeout(() => {
        if (code === '1234') {
          setIsCodeCorrect(true)
          handleSaveNumber()
          setTimeout(() => {
            onClose()
          }, 800)
        } else {
          setIsCodeCorrect(false)
          setTimeout(() => {
            setCode('')
            setIsCodeCorrect(null)
          }, 800)
        }
      }, 0)
    }
  }, [code])

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [count])

  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      setCode(prev => prev.slice(0, -1))
    } else if (code.length < 4) {
      setCode(prev => prev + key)
    }
  }

  const clearInput = () => {
    setCode('')
    setIsCodeCorrect(null)
  }

  const handleResend = () => {
    if (!canResend) return
    setCount(30)
    setCanResend(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ alignItems: 'center', gap: 10 }}>
        <AppText style={{ fontSize: 22, fontWeight: 'bold' }}>
          SMS kodni kiriting
        </AppText>
        <AppText style={{ color: Colors.textSecondary, fontSize: 15 }}>
          Sizning yangi telefon raqamingizga sms yuborildi
        </AppText>
      </View>

      <View style={{ flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <SmsCodeBox
          code={code}
          isCodeCorrect={isCodeCorrect}
          animValues={animValues}
        />
      </View>

      <View style={{ width: '100%' }}>
        <NumberKeyboard
          onKeyPress={handleKeyPress}
          codeLength={code.length}
          clearInput={clearInput}
          resend={handleResend}
          count={count}
        />
      </View>
    </View>
  )
}

export default SmsVerificationModal
