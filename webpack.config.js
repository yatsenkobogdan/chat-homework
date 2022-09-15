const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'url-loader',
        options: {
          limit: false,
        }
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[hash].[ext]'
    },
    ],
  },
  devServer: {
    static: 'public'
  },
  plugins: [
    new HTMLPlugin({
      template: './src/index.html'
    })
  ]
};