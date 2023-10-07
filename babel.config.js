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
            '@redux': './src/redux',
            '@utils': './src/utils',
            '@types': './src/types',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
