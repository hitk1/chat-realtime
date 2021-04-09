/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const path = require('path')

// const watchFolders = [
//   path.resolve(__dirname, "..", "clientWs"),
//   path.resolve(__dirname, "..", "clientWs", "node_modules")
// ]

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // watchFolders,
};
