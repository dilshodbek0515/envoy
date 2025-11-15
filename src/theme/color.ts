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
  red: string
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

  red08: string
  red06: string
  red04: string
  red02: string

  Boxbackground08: string
  Boxbackground06: string
  Boxbackground04: string
  Boxbackground02: string

  borderColor08: string
  borderColor06: string
  borderColor04: string
  borderColor02: string
}

export const darkColors: IThemeColors = {
  primary: '#00BEFF',
  pageBackground: '#171C26',
  Boxbackground: '#262E3D',
  textPrimary: '#ffffff',
  textSecondary: '#999999',
  green: '#00ff4c',
  yellow: '#ffbd59',
  red: '#FF4C4C',
  borderColor: '#2E3749',

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

  red08: '#FF4C4C',
  red06: '#CC3D3D',
  red04: '#992E2E',
  red02: '#661F1F',

  Boxbackground08: '#333333',
  Boxbackground06: '#262626',
  Boxbackground04: '#1A1A1A',
  Boxbackground02: '#0D0D0D',

  borderColor08: '#555555',
  borderColor06: '#404040',
  borderColor04: '#2B2B2B',
  borderColor02: '#1A1A1A'
}

export const lightColors: IThemeColors = {
  primary: '#007FFF',
  // pageBackground: "#FFFFFF",
  // Boxbackground: "#F3F4F6",
  pageBackground: '#F3F4F9',
  Boxbackground: '#FFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  green: '#22C55E',
  yellow: '#FACC15',
  red: '#EF4444',
  borderColor: '#E5E7EB',

  primary08: '#007FFF',
  primary06: '#339FFF',
  primary04: '#66BFFF',
  primary02: '#CCE5FF',

  textPrimary08: '#1F2937',
  textPrimary06: '#4B5563',
  textPrimary04: '#9CA3AF',
  textPrimary02: '#D1D5DB',

  textSecondary08: '#6B7280',
  textSecondary06: '#9CA3AF',
  textSecondary04: '#D1D5DB',
  textSecondary02: '#E5E7EB',

  green08: '#22C55E',
  green06: '#4ADE80',
  green04: '#86EFAC',
  green02: '#DCFCE7',

  yellow08: '#FACC15',
  yellow06: '#FDE68A',
  yellow04: '#FEF3C7',
  yellow02: '#FFFBEB',

  red08: '#EF4444',
  red06: '#F87171',
  red04: '#FECACA',
  red02: '#FEE2E2',

  Boxbackground08: '#F3F4F6',
  Boxbackground06: '#E5E7EB',
  Boxbackground04: '#D1D5DB',
  Boxbackground02: '#F9FAFB',

  borderColor08: '#E5E7EB',
  borderColor06: '#D1D5DB',
  borderColor04: '#9CA3AF',
  borderColor02: '#E5E7EB'
}
