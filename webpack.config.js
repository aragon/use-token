const path = require('path')

module.exports = (env, argv) => {
  const production = argv.mode === 'production'
  return {
    mode: argv.mode || 'development',
    entry: { 'use-token': './src/index.js' },
    experiments: { outputModule: true },
    output: { module: true },
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'swc-loader' },
        },
      ],
    },
    externals: { react: ['react'] },
    optimization: { minimize: false },
    stats: {
      modules: false,
    },
  }
}
