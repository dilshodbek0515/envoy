import AppText from '@/components/text'
import { Fonts } from '@/shared/tokens'
import { themeAtom } from '@/theme/theme'
import useThemeColor from '@/theme/useTheme'
import { useAtom } from 'jotai'
import { Pressable } from 'react-native'

export default function Auth () {
  const [theme, setTheme] = useAtom(themeAtom)
  const Colors = useThemeColor()
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <Pressable
      onPress={changeTheme}
      style={{
        flex: 1,
        backgroundColor: Colors.pageBackground,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AppText style={{ fontSize: 60 }}>Auth</AppText>
    </Pressable>
  )
}
