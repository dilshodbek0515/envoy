import { TTruck } from '@/types/order'
import { atom } from 'jotai'

export const getOrderTruckAtom = atom<TTruck>(null)
