const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './App/src/index.js',
  output: {
    path: path.resolve(__dirname, './App/dist'),
    filename: 'App.js',
    publicPath: '/',

  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
        {
            test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
 
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './App/src/index.html',
      }),
    ],
    resolve: {
      alias: {
        './app': path.resolve(__dirname, './App/src/App.js'),
      },
    },
};
