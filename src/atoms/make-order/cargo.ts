import { TCargo } from '@/types/order'
import { atom } from 'jotai'

export const getOrderCargoAtom = atom<TCargo>({
  type: { value: '', unit: '' },
  weight: { value: '', unit: 'kg' },
  volume: { value: '', unit: 'm³' },
  quantity: { value: '', unit: 'dona' },
  length: { value: '', unit: 'm' },
  height: { value: '', unit: 'm' },
  width: { value: '', unit: 'm' }
})

// export const normalizeCargoData = (data: TCargoSchema) => {
//   const filteredData = Object.fromEntries(
//     Object.entries(data).filter(([key, field]) => {
//       if (key === 'type') {
//         return field.value?.trim() !== ''
//       }
//       return field.value !== '' && field.value !== null
//     })
//   )

//   const normalizedData = Object.fromEntries(
//     Object.entries(filteredData).map(([key, field]) => {
//       if (key === 'type') {
//         return [key, field]
//       }

//       return [key, { ...field, value: Number(field.value) || 0 }]
//     })
//   )

//   return normalizedData
// }
