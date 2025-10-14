module.exports = {
  presets: [
    'babel-preset-expo',
    '@babel/preset-flow',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@": "./src"
        }
      }
    ],
    'react-native-worklets/plugin'
  ]
}
