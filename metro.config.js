/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;
  const { sourceExts, assetExts } = resolver;

  config.resetCache = true;
  config.transformer = {
    ...transformer,
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };
  config.resolver = {
    ...resolver,
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  };

  return config;
})();
