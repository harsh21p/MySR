module.exports = api => {
  api.cache(true);

  const defaultPlugins = [
    [
      'module-resolver',
      {
        alias: {
          api: './src/api',
          apiConfig: './src/apiConfig',
          appRedux: './src/redux',
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          constants: './src/constants',
          context: './src/context',
          hooks: './src/hooks',
          locales: './src/locales',
          navigation: './src/navigation',
          routes: './src/routes',
          saga: './src/saga',
          styles: './src/styles',
          types: './src/types',
          utils: './src/utils',
        },
        root: ['.'],
      },
    ],
  ];

  const plugins = () => {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.BABEL_ENV === 'production'
    ) {
      defaultPlugins.push('transform-remove-console');
    }
    defaultPlugins.push('react-native-reanimated/plugin');
    return defaultPlugins;
  };

  return {
    plugins: plugins(),
    presets: ['module:metro-react-native-babel-preset'],
  };
};
