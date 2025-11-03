import { atom } from 'jotai'

export interface ICheckPhone {
  isLoading: boolean
  error: string | null
  exists: boolean | null
}

export const checkPhone = atom<ICheckPhone>({
  isLoading: false,
  error: null,
  exists: null
})

export interface ICheckPhoneRes {
  exists: boolean
}
