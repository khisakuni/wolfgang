module.exports = require('babel-jest').createTransformer({
  presets: ['babel-preset-es2015', 'react', 'stage-1'], // or whatever you need
});
