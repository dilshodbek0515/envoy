import { atom } from 'jotai'
import { newPassword, Payload } from './type'
import axios, { AxiosError } from 'axios'
import { NEW_PASSWORD_URL } from './api'
import { resetPasswordPhone } from '@/service/user/controller/controller'

export const newPasswordAtom = atom(
  get => get(newPassword),
  async (get, set, password: string) => {
    const phone = get(resetPasswordPhone)
    set(newPassword, {
      isLoading: true,
      error: null,
      data: null
    })
    try {
      const { data } = await axios.post<Payload>(NEW_PASSWORD_URL, {
        password,
        phone
      })
      set(newPassword, {
        isLoading: false,
        error: null,
        data: data
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        set(newPassword, {
          isLoading: false,
          error: error.response?.data.message,
          data: null
        })
      }
    }
  }
)
