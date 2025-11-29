import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, {
  JSX,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react'
import useThemeColor from '@/theme/useTheme'
import { useAtomValue, useSetAtom } from 'jotai'
import { themeAtom } from '@/theme/theme'
import { logoutAtom } from '@/service/user/register-login/controller'
import { router } from 'expo-router'
import safeRoute from '@/utils/safeNavigate'
import CopyIcon from '@/assets/icons/copy-icon'
import { AppRoutes } from '@/constants/routes'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import AppText from '@/components/text'
import { IThemeColors } from '@/theme/color'
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch'
import SheetModal from '@/components/SheetModal'

const Settings = () => {
  const Colors = useThemeColor()
  const theme = useAtomValue(themeAtom)
  const setTheme = useSetAtom(themeAtom)
  const handleLogout = useSetAtom(logoutAtom)
  // const { t } = useTranslation()

  const [alertVisable, setAlertVisable] = useState(false)
  const [actionType, setActionType] = useState<'logout' | 'delete_acc' | null>(
    null
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const handleNavigate = useCallback((path: string) => {
    safeRoute(() => router.push(path))
  }, [])

  const settingsActions = useMemo(
    () => [
      {
        id: 'theme',
        // title:t('theme_mode')
        title: 'theme',
        icon: (size: number, color: string) => (
          <CopyIcon size={size} color={color} />
        ),
        leftNode: () => (
          <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />
        ),
        onPress: toggleTheme
      },
      {
        id: 'language',
        // title:t('change_language')
        title: 'language',
        leftNode: () => null,
        icon: (size: number, color: string) => (
          <CopyIcon size={size} color={color} />
        ),
        onPress: () => handleNavigate(AppRoutes.customer.profile.setting.index)
      },
      {
        id: 'logout',
        // title:t('logout')
        title: 'logout',
        leftNode: () => <></>,
        icon: (size: number, color: string) => (
          <CopyIcon size={size} color={color} />
        ),
        onPress: () => (setActionType('logout'), setAlertVisable(true))
      },
      {
        id: 'delete',
        // title:t('delete_account')
        title: 'delete',
        leftNode: () => <></>,
        icon: (size: number, color: string) => (
          <CopyIcon size={size} color={color} />
        ),
        onPress: () => (setActionType('delete_acc'), setAlertVisable(true))
      }
    ],
    [toggleTheme, handleNavigate]
  )

  const handleModalConfirm = useCallback(() => {
    if (actionType === 'logout') handleLogout()
    else if (actionType === 'delete_acc') () => {}

    setAlertVisable(false)
    setActionType(null)
  }, [actionType, handleLogout])

  const cashedStyles = useMemo(() => styles(Colors), [Colors])

  const renderItem: ListRenderItem<typeof settingsActions[0]> = useCallback(
    ({ item }) => (
      <ProfileActionBox
        icon={item.icon}
        title={item.title}
        onPress={item.onPress}
        leftNode={item.leftNode}
      />
    ),
    []
  )

  return (
    <View
      style={[
        cashedStyles.container,
        { backgroundColor: Colors.pageBackground }
      ]}
    >
      <PageHeader title='settings' isEnabledBack />

      <FlatList
        style={{
          marginTop: 5,
          paddingTop: Spacing.horizontal - 5,
          borderRadius: 5,
          overflow: 'hidden',
          marginHorizontal: Spacing.horizontal
        }}
        data={settingsActions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 30,
          gap: 10
        }}
      />

      <SheetModal
        type='yesno'
        open={alertVisable}
        onDismiss={() => setAlertVisable(false)}
        onYes={handleModalConfirm}
        message={actionType === 'logout' ? 'logout' : 'delete'}
      />
    </View>
  )
}

export default Settings

// -------------------------------------------------------------

type ProfileActionBoxProps = {
  icon: (size: number, color: string) => React.ReactElement
  title: string
  onPress?: () => void
  style?: ViewStyle
  leftNode: () => ReactNode | JSX.Element
}

const ProfileActionBox = memo(
  ({ icon, title, onPress, style, leftNode }: ProfileActionBoxProps) => {
    const Colors = useThemeColor()
    const cashedStyles = useMemo(() => styles(Colors), [Colors])
    // const { t } = useTranslation()

    const { iconColors, iconBackColor } = useMemo(() => {
      switch (title) {
        case 'theme':
          return { iconColors: Colors.yellow, iconBackColor: Colors.primary02 }
        case 'language':
          return { iconColors: Colors.green, iconBackColor: Colors.green02 }
        case 'logout':
        case 'delete':
          return { iconColors: Colors.red, iconBackColor: Colors.red02 }
        default:
          return {
            iconColors: Colors.textPrimary,
            iconBackColor: Colors.Boxbackground
          }
      }
    }, [title, Colors])

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[cashedStyles.smallBox, style]}
        activeOpacity={0.8}
      >
        <View style={cashedStyles.iconRow}>
          <View
            style={[cashedStyles.iconBox, { backgroundColor: iconBackColor }]}
          >
            {icon(18, iconColors)}
          </View>
          <AppText style={[cashedStyles.boxText]}>{title}</AppText>
        </View>
        {leftNode()}
      </TouchableOpacity>
    )
  }
)

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    container: { flex: 1 },

    smallBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 15,
      padding: 10,
      backgroundColor: Colors.Boxbackground,
      minHeight: 50
    },

    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    },

    iconBox: {
      borderRadius: 10,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },

    boxText: {
      fontSize: 15,
      fontWeight: '600',
      color: Colors.textPrimary
    }
  })
