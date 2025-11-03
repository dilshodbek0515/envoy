import { atom } from 'jotai'
import { IResetPasswordRes, registerPassword } from './type'
import axios, { AxiosError } from 'axios'
import { REGISTER_PASSWORD_URL } from './api'
import { registerAtom } from '@/widget/auth/register/register'

export const registerPasswordAtom = atom(
  get => get(registerPassword),
  async (get, set) => {
    set(registerPassword, {
      isLoading: true,
      error: null,
      data: null
    })
    try {
      const registerState = get(registerAtom)
      const response = await axios.post<IResetPasswordRes>(
        REGISTER_PASSWORD_URL,
        registerState
      )

      set(registerPassword, {
        isLoading: false,
        error: null,
        data: response.data.data
      })

      console.log(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        set(registerPassword, {
          isLoading: false,
          error: error.response?.data.message,
          data: null
        })
      }
    }
  }
)
