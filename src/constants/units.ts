export type TUnit =
  | 'weight'
  | 'length'
  | 'height'
  | 'width'
  | 'quantity'
  | 'volume'
  | 'type'
  | 'price'

type TUnitOption = {
  name: string
  shortName: string
}

export const UNIT_OPTIONS = (): Record<TUnit, TUnitOption[]> => ({
  weight: [
    { name: 'gramm', shortName: 'g' },
    { name: 'Kilogramm', shortName: 'Kg' },
    { name: 'tonna', shortName: 't' }
  ],
  length: [
    { name: 'santimetr', shortName: 'sm' },
    { name: 'metr', shortName: 'm' }
  ],
  height: [
    { name: 'santimetr', shortName: 'sm' },
    { name: 'metr', shortName: 'm' }
  ],
  width: [
    { name: 'santimetr', shortName: 'sm' },
    { name: 'metr', shortName: 'm' }
  ],
  quantity: [
    { name: 'dona', shortName: 'dona' },
    { name: 'quti', shortName: 'quti' },
    { name: 'qop', shortName: 'qop' },
    { name: 'palet', shortName: 'palet' },
    { name: 'shisha', shortName: 'shisha' }
  ],
  volume: [
    { name: 'millilitr', shortName: 'ml' },
    { name: 'litr', shortName: 'l' },
    { name: 'Kub metr', shortName: 'm3' }
  ],
  type: [],
  price: [
    { name: "so'm", shortName: 'UZS' },
    { name: 'dollar', shortName: 'USD' },
    { name: 'rubl', shortName: 'RUB' }
  ]
})
