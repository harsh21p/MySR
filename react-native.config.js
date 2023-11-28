// const VECTOR_ICONS_FONTS_PATH =
//   './node_modules/react-native-vector-icons/Fonts';
// const VECTOR_FONTS = [
//   'AntDesign.ttf',
//   'Entypo.ttf',
//   'EvilIcons.ttf',
//   'Feather.ttf',
//   'Fontisto.ttf',
//   'Foundation.ttf',
//   'FontAwesome.ttf',
//   'Ionicons.ttf',
//   'MaterialCommunityIcons.ttf',
//   'MaterialIcons.ttf',
//   'Octicons.ttf',
//   'SimpleLineIcons.ttf',
//   'Zocial.ttf',
// ];

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/font'],
  //   dependencies: {
  //     // Disable auto linking for `react-native-vector-icons` and link
  //     // the required fonts manually to avoid duplicate resources issue in iOS.
  //     'react-native-vector-icons': {
  //       platforms: {
  //         ios: null,
  //         android: null,
  //       },
  //       assets: VECTOR_FONTS.map(font => VECTOR_ICONS_FONTS_PATH + '/' + font),
  //     },
  //   },
};
