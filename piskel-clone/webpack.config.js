const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './src/app/dist'),
    publicPath: './dist/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.worker\.js$/,
      //   use: {
      //     loader: 'worker-loader',
      //     options: {
      //       publicPath: './dist/',
      //       inline: true,
      //     }
      //   },
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery'",
        "window.$": "jquery"
    })
  ]
};
