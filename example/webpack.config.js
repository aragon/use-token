const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'use-token-example.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'swc-loader' },
      },
    ],
  },
  devServer: {
    contentBase: '.',
    index: 'index.html',
    port: 1234,
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: 'errors-only',
  },
  plugins: [new CopyPlugin([{ from: 'index.html', to: 'index.html' }])],
}
