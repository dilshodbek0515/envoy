import { View, Pressable } from 'react-native'
import React from 'react'
import AppText from '@/components/text'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Screens, Spacing } from '@/shared/tokens'
import useThemeColor from '@/theme/useTheme'

const Information = ({
  label,
  value,
  copyable = false,
  onCopy,
  rightComponent
}: any) => {
  const Colors = useThemeColor()

  return (
    <View
      style={{
        width: Screens.width * 0.95,
        height: Screens.height * 0.09,
        backgroundColor: Colors.Boxbackground,
        borderRadius: 15,
        flexDirection: 'row',
        padding: Spacing.horizontal,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ justifyContent: 'space-between', gap: 10 }}>
        <AppText
          variant='medium'
          style={{ fontSize: 12, color: Colors.textSecondary }}
        >
          {label}
        </AppText>

        <AppText style={{ fontSize: 15, color: 'white' }}>{value}</AppText>
      </View>

      {copyable && (
        <Pressable onPress={onCopy}>
          <MaterialIcons
            name='content-copy'
            size={20}
            color={Colors.textSecondary}
          />
        </Pressable>
      )}

      {rightComponent}
    </View>
  )
}

export default Information
