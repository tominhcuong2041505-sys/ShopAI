<<<<<<< HEAD
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"], // <--- Thêm dòng này
  };
};
=======
module.exports = {
  presets: [
    'module:@react-native/babel-preset', 
    'nativewind/babel'
  ],
  plugins: [
    '@babel/plugin-transform-export-namespace-from'
  ],
};
>>>>>>> 24a4932e4c713d393d6f9dc445b6c4af2442ea89
