import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

type TTheme = 'light' | 'dark'

const storage = createJSONStorage<TTheme>(() => AsyncStorage)

const themeState = atomWithStorage<TTheme>('theme', 'light', storage)

export const themeAtom = atom(
  get => get(themeState),
  async (_get, set, newTheme: TTheme) => {
    set(themeState, newTheme)
  }
)
