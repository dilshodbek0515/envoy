import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { CHECK_PHONE_URL } from './api'
import { checkPhone, ICheckPhoneRes } from './type'

export const checkPhoneAtom = atom(
  get => get(checkPhone),
  async (_get, set, phone: string) => {
    set(checkPhone, {
      isLoading: true,
      error: null,
      exists: null
    })
    try {
      const { data } = await axios.post<ICheckPhoneRes>(CHECK_PHONE_URL, {
        phone
      })
      set(checkPhone, {
        isLoading: false,
        error: null,
        exists: data.exists
      })
      return data.exists
    } catch (error) {
      if (error instanceof AxiosError) {
        set(checkPhone, {
          isLoading: false,
          error: error.response?.data.message,
          exists: null
        })
      }
      return null
    }
  }
)
