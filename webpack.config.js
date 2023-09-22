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
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'build')
    },
    proxy: {
      '/api' : 'http://localhost:3000'
    },
    port: 8000,
  }
}