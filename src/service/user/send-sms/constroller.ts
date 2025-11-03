import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { SEND_SMS_URL } from './api'
import { ISendSmsRes, sendSms } from './type'

export const sendSmsAtom = atom(
  get => get(sendSms),
  async (_get, set, phone: string) => {
    set(sendSms, {
      isLoading: true,
      error: null,
      code: null
    })

    try {
      const { data } = await axios.post<ISendSmsRes>(SEND_SMS_URL, { phone })
      set(sendSms, {
        isLoading: false,
        error: null,
        code: data.code
      })

      return data.code
    } catch (error) {
      if (error instanceof AxiosError) {
        set(sendSms, {
          isLoading: false,
          error: error.response?.data.message,
          code: null
        })
      }
      return null
    }
  }
)
