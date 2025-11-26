import api from '@/axios/axios.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { atom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'

export interface UserData {
  username: string | null
  phone: string | null
  role: string | null
  image: string | null
}

export interface UserState {
  isLoading: boolean
  error: string | null
}

export const userDataAtom = atom<UserData>({
  username: null,
  phone: null,
  role: null,
  image: null
})

export const UserDataStateAtom = atom<UserState>({
  isLoading: false,
  error: null
})

export const useFetchUserData = () =>
  useAtomCallback(async (get, set) => {
    set(UserDataStateAtom, { isLoading: true, error: null })

    try {
      const { data } = await api.get<UserData>('/user/get-personal-data/')
      set(userDataAtom, data)
      await AsyncStorage.setItem('userData', JSON.stringify(data))
    } catch (error: any) {
      console.log(error)

      if (error instanceof AxiosError) {
        set(UserDataStateAtom, prev => ({
          ...prev,
          error: error.response?.data.message || 'Tarmoq xatosi'
        }))
      } else {
        set(UserDataStateAtom, prev => ({
          ...prev,
          error: 'Nomalum xatolik'
        }))
      }

      const cashed = await AsyncStorage.getItem('userData')
      if (cashed) {
        const parsed = JSON.parse(cashed)
        set(userDataAtom, parsed)
      }
    } finally {
      set(UserDataStateAtom, prev => ({ ...prev, isLoading: false }))
    }
  })
