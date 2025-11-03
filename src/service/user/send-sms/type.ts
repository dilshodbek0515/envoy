import { atom } from 'jotai'

export interface ISendSms {
  isLoading: boolean
  error: string | null
  code: string | null
}

export const sendSms = atom({
  isLoading: false,
  error: null,
  code: null
})

export interface ISendSmsRes {
  code: string | any
}
