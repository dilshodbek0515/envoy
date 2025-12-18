// // src/locales/_i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LANGUAGE_KEY = 'appLanguage'

// # Tarjimalarni dynamic import qilish
const languageResources: Record<string, () => Promise<any>> = {
  uzbekistan: () => import('./uzbekistan.json') 
}

// # i18n basic sozlamalari:
export const initLanguage = async () => {
  const savedLangRaw = await AsyncStorage.getItem(LANGUAGE_KEY)
  const savedLang = (savedLangRaw || 'uzbekistan').toLowerCase()

  const loadResource =
    languageResources[savedLang] || languageResources['uzbekistan']
  const resource = await loadResource()

  await i18n.use(initReactI18next).init({
    resources: { [savedLang]: { translation: resource.default } },
    lng: savedLang,
    fallbackLng: 'uzbekistan',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4'
  })
}

// # Tilni o'zgartirish
export const setLanguage = async (lang: string) => {
  const key = lang.toLowerCase()
  const loadResource = languageResources[key] || languageResources['uzbekistan']
  const resource = await loadResource()

  i18n.addResources(key, 'translation', resource.default)
  i18n.changeLanguage(key)
  await AsyncStorage.setItem(LANGUAGE_KEY, key)
}

export default i18n
