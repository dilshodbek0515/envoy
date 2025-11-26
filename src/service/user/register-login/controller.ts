import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import {
  IAuthResponse,
  IAuthPayload,
  TAuthType,
  authStateAtom,
  defualt
} from './type'
import { LOGIN_URL, REGISTER_URL } from './api'
import { router } from 'expo-router'
import { AppRoutes } from '@/constants/routes'
import { registerAtom } from '@/widget/auth/register/register'
import { checkPhone } from '../check-phone/type'
import { sendSms } from '../send-sms/type'
import { tokenManager } from '@/axios/tokenManager'

const storage = createJSONStorage<IAuthResponse>(() => AsyncStorage)
const auth = atomWithStorage<IAuthResponse>('authData', defualt, storage)

export const authAtom = atom(
  async get => {
    const state = get(authStateAtom)
    const data = await get(auth)

    return { state, data }
  },

  async (_get, set, payload: IAuthPayload, type: TAuthType) => {
    set(authStateAtom, {
      isLoading: true,
      error: null
    })

    const url = type === 'register' ? REGISTER_URL : LOGIN_URL

    try {
      const { data } = await axios.post<IAuthResponse>(url, payload)
      set(auth, data)

      if (data.role === 'Customer') {
        router.replace('(app)/customer/')
      } else if (data.role === 'Driver') {
        router.replace('(app)/driver/')
      }

      console.log('data ----->', data.access)

      await tokenManager.set(data?.access)

      set(authStateAtom, {
        isLoading: false,
        error: null
      })
    } catch (error) {
      console.log(error)

      if (error instanceof AxiosError) {
        set(authStateAtom, {
          isLoading: false,
          error: error.response?.data
        })
      }
    }
  }
)

export const logoutAtom = atom(null, async (_get, set) => {
  try {
    await AsyncStorage.removeItem('authData')
    set(auth, defualt)
    set(registerAtom, { name: '', password: '', role: 'Customer', phone: '' }),
      set(checkPhone, { isLoading: false, error: null, exists: null }),
      set(sendSms, { isLoading: false, code: null, error: null }),
      router.replace(AppRoutes.auth.auth)
  } catch (error) {
    console.log(error)
  }
})
