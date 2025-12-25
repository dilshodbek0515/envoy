import { Keyboard, Platform, Pressable, View } from 'react-native'
import { ReactNode, useEffect } from 'react'
import useThemeColor from '@/theme/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Screens, Spacing } from '@/shared/tokens'
import AppText from '../text'
import { router } from 'expo-router'
import ArrowIcon from '@/assets/icons/arrow-icon'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

interface IProps {
  title: string
  isEnabledBack?: boolean
  onLeftPress?: () => void
  onRightPress?: () => void
  rightView?: ReactNode
  hide?: boolean
  animated?: boolean
}

const PageHeader = ({
  title = 'Header',
  isEnabledBack,
  rightView,
  onLeftPress,
  onRightPress,
  hide,
  animated = false
}: IProps) => {
  const Colors = useThemeColor()
  const Topinset = useSafeAreaInsets().top
  const height = Screens.height * 0.067

  const handleRightPress = () => {
    if (onLeftPress) {
      onLeftPress()
    } else {
      router.back()
    }
  }

  const handleLeftPress = () => {
    if (onRightPress) {
      onRightPress()
    }
  }

  const translateY = useSharedValue(0)
  const paddingTop = useSharedValue(0)
  const duration = 300

  useEffect(() => {
    if (hide) {
      translateY.value = withTiming(-(Topinset + height), { duration })
      paddingTop.value = withTiming(-height, { duration })
    } else {
      translateY.value = withTiming(0, { duration })
      paddingTop.value = withTiming(0, { duration })
    }
  }, [hide])

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    marginBottom: paddingTop.value
  }))

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      translateY.value = withTiming(-(Topinset + height), { duration })
      paddingTop.value = withTiming(-height, { duration })
    })
    const hideSub = Keyboard.addListener('keyboardDidShow', () => {
      translateY.value = withTiming(0, { duration })
      paddingTop.value = withTiming(0, { duration })
    })

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [Topinset, hide])

  return (
    <Animated.View
      style={[
        {
          backgroundColor: Colors.Boxbackground,
          height: Topinset + height,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          justifyContent: 'flex-end',
          alignItems: 'center'
        },
        animated && headerStyle
      ]}
    >
      <View
        style={{
          height,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AppText variant='semiBold' style={{ fontSize: 20, color: 'white' }}>
          {title}
        </AppText>
      </View>

      {isEnabledBack && (
        <Pressable
          onPress={handleRightPress}
          style={{
            position: 'absolute',
            left: Spacing.horizontal,
            bottom: 0,
            alignItems: 'flex-start',
            width: 50,
            justifyContent: 'center',
            height
          }}
        >
          <ArrowIcon
            direction='left'
            type={Platform.OS === 'ios' ? 'chevron' : 'arrow'}
            color={Colors.textSecondary}
          />
        </Pressable>
      )}

      {rightView && (
        <Pressable
          onPress={handleLeftPress}
          style={{
            position: 'absolute',
            right: Spacing.horizontal,
            bottom: 0,
            alignItems: 'flex-end',
            width: 50,
            justifyContent: 'center',
            height
          }}
        >
          {rightView}
        </Pressable>
      )}
    </Animated.View>
  )
}

export default PageHeader
