export interface IColorShades {
  '08': string
  '06': string
  '04': string
  '02': string
}

export interface IThemeColors {
  primary: string
  pageBackground: string
  Boxbackground: string
  textPrimary: string
  textSecondary: string
  green: string
  yellow: string
  borderColor: string

  // shade versiyalar
  primary08: string
  primary06: string
  primary04: string
  primary02: string

  textPrimary08: string
  textPrimary06: string
  textPrimary04: string
  textPrimary02: string

  textSecondary08: string
  textSecondary06: string
  textSecondary04: string
  textSecondary02: string

  green08: string
  green06: string
  green04: string
  green02: string

  yellow08: string
  yellow06: string
  yellow04: string
  yellow02: string

  Boxbackground08: string
  Boxbackground06: string
  Boxbackground04: string
  Boxbackground02: string

  borderColor08: string
  borderColor06: string
  borderColor04: string
  borderColor02: string
}

// 👇 shu interfeysni ishlatib light va dark ranglarni tiplaymiz
export const lightColors: IThemeColors = {
  primary: '#007fff',
  pageBackground: '#ffffff',
  Boxbackground: '#eee',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  green: '#22C55E',
  yellow: '#FACC15',
  borderColor: '#999999',

  primary08: '#007fff',
  primary06: '#339fff',
  primary04: '#66bfff',
  primary02: '#99dfff',

  textPrimary08: '#1F2937',
  textPrimary06: '#4A5568',
  textPrimary04: '#718096',
  textPrimary02: '#A0AEC0',

  textSecondary08: '#6B7280',
  textSecondary06: '#A0AEC0',
  textSecondary04: '#CBD5E0',
  textSecondary02: '#E2E8F0',

  green08: '#22C55E',
  green06: '#4ADE80',
  green04: '#86EFAC',
  green02: '#BBF7D0',

  yellow08: '#FACC15',
  yellow06: '#FDE047',
  yellow04: '#FDE68A',
  yellow02: '#FEF9C3',

  Boxbackground08: '#FFFFFF',
  Boxbackground06: '#F2F2F2',
  Boxbackground04: '#E6E6E6',
  Boxbackground02: '#D9D9D9',

  borderColor08: '#999999',
  borderColor06: '#B3B3B3',
  borderColor04: '#CCCCCC',
  borderColor02: '#E6E6E6'
}

export const darkColors: IThemeColors = {
  primary: '#00BEFF',
  pageBackground: '#111111',
  Boxbackground: '#333333',
  textPrimary: '#ffffff',
  textSecondary: '#999999',
  green: '#00ff4c',
  yellow: '#ffbd59',
  borderColor: '#555555',

  primary08: '#00BEFF',
  primary06: '#0099CC',
  primary04: '#006680',
  primary02: '#003344',

  textPrimary08: '#ffffff',
  textPrimary06: '#BFBFBF',
  textPrimary04: '#808080',
  textPrimary02: '#404040',

  textSecondary08: '#999999',
  textSecondary06: '#777777',
  textSecondary04: '#555555',
  textSecondary02: '#333333',

  green08: '#00ff4c',
  green06: '#00CC3D',
  green04: '#00992E',
  green02: '#00661F',

  yellow08: '#ffbd59',
  yellow06: '#CC9647',
  yellow04: '#996E35',
  yellow02: '#664623',

  Boxbackground08: '#333333',
  Boxbackground06: '#262626',
  Boxbackground04: '#1A1A1A',
  Boxbackground02: '#0D0D0D',

  borderColor08: '#555555',
  borderColor06: '#404040',
  borderColor04: '#2B2B2B',
  borderColor02: '#1A1A1A'
}
