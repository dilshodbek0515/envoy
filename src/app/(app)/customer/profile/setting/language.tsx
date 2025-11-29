import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useThemeColor from '@/theme/useTheme'
import { useTranslation } from 'react-i18next'
import i18n, { setLanguage } from '@/locales/_i18n'
import PageHeader from '@/components/header/PageHeader'
import { Spacing } from '@/shared/tokens'
import AppText from '@/components/text'

const languages = [
  { code: 'uzbekistan', nativeName: "O'zbekcha" },
  { code: 'uzbekistan_cyril', nativeName: 'Ўзбекча' },
  { code: 'russia', nativeName: 'Русский' },
  { code: 'english', nativeName: 'English' },
  { code: 'turkey', nativeName: 'Türkçe' },
  { code: 'kazakhstan', nativeName: 'Қазақша' },
  { code: 'kyrgyzstan', nativeName: 'Кыргызча' },
  { code: 'tajikistan', nativeName: 'Тоҷикӣ' },
  { code: 'turkmenistan', nativeName: 'Türkmençe' },
  { code: 'china', nativeName: '中文' },
  { code: 'belarus', nativeName: 'Беларуская' }
]

const LanguagePage = () => {
  const Colors = useThemeColor()
  const { t } = useTranslation()

  useEffect(() => {
    const handler = () => {}
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  const handleSelectLanguage = async (langCode: string) => {
    await setLanguage(langCode)
  }

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader title={'language'} isEnabledBack key={i18n.language} />

      <FlatList
        data={languages}
        keyExtractor={item => item.code}
        style={{ flexGrow: 1, marginTop: Spacing.horizontal }}
        renderItem={({ item }) => {
          const isActive = i18n.language === item.code
          return (
            <Pressable
              style={[
                styles.item,
                {
                  marginHorizontal: 10,
                  borderBottomColor: Colors.borderColor,
                  backgroundColor: isActive
                    ? Colors.primary + '22'
                    : 'transparent'
                }
              ]}
              onPress={() => handleSelectLanguage(item.code)}
            >
              <AppText style={[styles.itemText, { color: Colors.textPrimary }]}>
                {item.nativeName}
                {isActive ? '$' : ''}
              </AppText>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default LanguagePage

const styles = StyleSheet.create({
  container: { flex: 1 },

  searchInput: {
    margin: 12,
    padding: 12,
    borderRadius: 12,
    fontSize: 16
  },

  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 12
  },

  itemText: { fontSize: 16 }
})
