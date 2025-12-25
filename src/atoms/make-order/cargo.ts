import { TCargoSchema } from '@/shared/validation/make-order/cargo-schema'
import { atom } from 'jotai'

export const getOrderCargoAtom = atom({
  type: { value: '', unit: null }
})

export const normalizeCargoData = (data: TCargoSchema) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, field]) => {
      if (key === 'type') {
        return field.value?.trim() !== ''
      }
      return field.value !== '' && field.value !== null
    })
  )

  const normalizedData = Object.fromEntries(
    Object.entries(filteredData).map(([key, field]) => {
      if (key === 'type') {
        return [key, field]
      }

      return [key, { ...field, value: Number(field.value) || 0 }]
    })
  )

  return normalizedData
}
