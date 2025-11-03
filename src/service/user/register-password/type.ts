import { atom } from 'jotai'

export interface IRegisterPassword {
  isLoading: boolean
  error: string | null
  data: string | null
}

export const registerPassword = atom<IRegisterPassword>({
  isLoading: false,
  error: null,
  data: null
})

export interface IResetPasswordRes {
  data: string | null
}
