'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'static/js/bundle.[hash].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/music-blog/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/},
      {test: /\.css$/, use: ExtractTextPlugin.extract({use: 'css-loader?minimize=true'})},
      {test: /\.(png|jpg|gif)$/, use: ['url-loader?name=static/img/[hash].[ext]&limit=8192']},
      {test: /\.(eot|svg|ttf|woff)/, loader: ['file-loader?name=static/font/[hash].[ext]']}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index-template.html',
      filename: './index.html',
      minify: {
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './index-template.html',
      filename: './404.html',
      minify: {
        removeComments: true
      }
    }),
    new ExtractTextPlugin('static/css/style.[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    })
  ],

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'redux': 'Redux',
    'react-router-dom': 'ReactRouterDOM'
  }
}