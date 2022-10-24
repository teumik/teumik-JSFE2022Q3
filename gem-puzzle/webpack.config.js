const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { mainModule } = require('process');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';
const target = isDev ? 'web' : 'browserslist';
const devtool = isDev ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    open: true,
    hot: true,
  },
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: '[name].chunk.js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  optimization: {
    minimize: !isDev,
    splitChunks: {
      // chunks: 'all',
    },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Gem Puzzle',
      template: path.resolve(__dirname, 'src', 'index.html'), // TEMPLATE
      // filename: isDev ? 'index.html' : '[name].[contenthash].html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // require('postcss-preset-env'),
                  'postcss-preset-env',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.((t|o)tf|eot|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        // test: /\.mp3$/i,
        loader: 'file-loader',
        options: {
          name: 'audio/[name].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
