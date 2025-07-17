const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add any custom Metro configuration here
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Disable console errors that interfere with React DevTools
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
