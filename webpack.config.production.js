/* eslint-disable */

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          'production'
        ),
      },
    }),
    new webpack.optimize
      .UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader:
          'html-loader!markdown-loader?gfm=false',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|code-examples/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader:
          'style-loader!css-loader',
      },
      {
        test: /\.(js)$/,
        include: /code-examples/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.svg$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
}
