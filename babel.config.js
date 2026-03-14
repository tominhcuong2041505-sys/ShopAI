module.exports = {
  presets: [
    'module:@react-native/babel-preset', 
    'nativewind/babel'
  ],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@features': './src/features',
          '@shared': './src/shared',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
        },
      },
    ],
    // PHẢI CÓ: Plugin này để xử lý lỗi Reanimated và NativeWind v4
    // LƯU Ý: Luôn để dòng này ở CUỐI CÙNG của mảng plugins
    'react-native-reanimated/plugin', 
  ],
};