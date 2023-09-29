const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');  // Add this line


module.exports = {
  entry: "./client/index.js",
  output : {
    filename: "bundle.js",
    path: path.resolve(__dirname,'./build'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({title: "HTML Page", template: './index.html',}),
  ],
  
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
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/', // where the fonts will go
            },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      publicPath: '/build',  
      directory: path.join(__dirname, 'build'),
    },
    historyApiFallback: true,
    proxy: {
      '/api' : 'http://localhost:3000'
    },
    port: 8000
  }
}