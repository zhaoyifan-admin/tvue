const merge = require('webpack-merge');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const alias = require('./alias');
let config = require('./config');

module.exports = merge(config, {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 匹配图片文件
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // 输出文件的命名规则
              outputPath: '/', // 输出目录，相对于构建输出目录
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
