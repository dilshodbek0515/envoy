import { atom } from 'jotai'

export interface Payload {
  phone: string
  password: string
}

export interface INewPassword {
  isLoading: boolean
  error: string | null
  data: Payload | null
}

export const newPassword = atom<INewPassword>({
  isLoading: false,
  error: null,
  data: null
})
