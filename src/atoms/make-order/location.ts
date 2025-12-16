import { ILocation } from '@/types/order'
import { atom } from 'jotai'

interface IGetOrderLocationsStatus {
  locationType: 'pickup' | 'dropoff'
  index: number
}

interface IOrderLocations {
  pickup: ILocation[]
  dropoff: ILocation[]
}

export const getOrderLocationsAtom = atom<IOrderLocations>({
  pickup: [
    {
      id: '',
      full_title: '',
      short_title: '',
      coordinates: { latitude: 0, longitude: 0 },
      contact: {
        name: '',
        phone: ''
      }
    }
  ],

  dropoff: [
    {
      id: '',
      full_title: '',
      short_title: '',
      coordinates: { latitude: 0, longitude: 0 },
      contact: {
        name: '',
        phone: ''
      }
    }
  ]
})

export const getOrderLocationStatusAtom = atom(<IGetOrderLocationsStatus>{
  locationType: 'pickup',
  index: 0
})
