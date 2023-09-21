const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./client/index.js",
  output : {
    filename: "bundle.js",
    path: path.resolve(__dirname,'./build')
  },
  plugins: [new HtmlWebpackPlugin({
    title: "HTML Page",
    template: './index.html',
  })],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ],
  },
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'public')
    },
    proxy: {
      '/api' : 'http://localhost:3000'
    }
  }
}