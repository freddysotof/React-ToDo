module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build',
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ]

};

// const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');


// module.exports = {

//   entry: {

//     app: './src/index.jsx',

//   },

//   plugins: [

//     new HtmlWebpackPlugin({

//       title: 'Production',

//     }),

//   ],

//   output: {

//     filename: '[name].bundle.js',

//     path: path.resolve(__dirname, 'public'),

//     clean: true,

//   },

// };