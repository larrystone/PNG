const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./client/index.html",
  filename: "./index.html",
  inject: 'body'
});

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('build'),
    filename: 'js/bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}