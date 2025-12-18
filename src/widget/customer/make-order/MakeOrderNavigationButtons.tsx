import DefualtButton from '@/components/Button/DefualtButton'
import AppText from '@/components/text'
import { Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'
import safeRoute from '@/utils/safeNavigate'
import { router } from 'expo-router'
import { View } from 'react-native'

interface Props {
  isVisableFirstButton?: boolean
  firstTitle?: string
  secondTitle: string
  secondPath: string
}

const MakeOrderNavigationButtons = ({
  isVisableFirstButton = true,
  firstTitle,
  secondTitle,
  secondPath
}: Props) => {
  const Colors = useThemeColor()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: !isVisableFirstButton ? 'flex-end' : 'space-between',
        alignItems: 'center',
        marginTop: Spacing.horizontal,
        paddingHorizontal: Spacing.horizontal
      }}
    >
      {isVisableFirstButton && (
        <DefualtButton
          onPress={() => safeRoute(() => router.back())}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 8,
            borderRadius: 100,
            overflow: 'hidden'
          }}
        >
          <AppText style={{ fontSize: 16, color: Colors.textSecondary }}>
            {firstTitle}
          </AppText>
        </DefualtButton>
      )}
      <DefualtButton
        onPress={() => safeRoute(() => router.push(secondPath || ''))}
        style={{
          paddingVertical: 6,
          paddingHorizontal: 8,
          borderRadius: 100,
          overflow: 'hidden'
        }}
      >
        <AppText
          style={{
            fontSize: 16,
            color: Colors.textSecondary
          }}
        >
          {secondTitle}
        </AppText>
      </DefualtButton>
    </View>
  )
}

export default MakeOrderNavigationButtons
