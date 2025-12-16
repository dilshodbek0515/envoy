import { IOrderTime } from '@/types/order'
import { atom } from 'jotai'

export const getOrderTime = atom<IOrderTime>({
  expected_arrival_time: {
    day: null,
    month: null,
    year: null
  }
})
