import { atom } from 'jotai'
import { newPassword, Payload } from './type'
import axios, { AxiosError } from 'axios'
import { NEW_PASSWORD_URL } from './api'

export const newPasswordAtom = atom(
  get => get(newPassword),
  async (_get, set, password: string) => {
    set(newPassword, {
      isLoading: true,
      error: null,
      data: null
    })
    try {
      const { data } = await axios.post<Payload>(NEW_PASSWORD_URL, {
        password,
        phone: '+998975790515'
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
