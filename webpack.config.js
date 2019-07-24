const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'docsify-gifcontrol.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'docsify-gifcontrol.css',
      chunkFilename: 'docsify-gifcontrol.css',
    }),
  ]
};