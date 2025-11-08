import { atom } from 'jotai'

export interface IAuthResponse {
  access: string | null
  refresh: string | null
  role: string | null
}

export interface IAuthState {
  isLoading: boolean
  error: string | null
}

export type TAuthType = 'register' | 'login'

export interface IAuthPayload {
  name?: string
  phone: string
  role?: 'Customer' | 'Driver'
  image?: string | null
  password: string

  // phone: string
  // password: string
}

export const authStateAtom = atom<IAuthState>({
  isLoading: false,
  error: null
})

export const defualt = {
  access: null,
  refresh: null,
  role: null
}
