module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@core': './src/core',
            '@components': './src/components',
            '@containers': './src/containers',
            '@screens': './src/screens',
            '@redux': './src/redux',
            '@utils': './src/utils',
            '@type': './src/types',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
