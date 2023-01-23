/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const devtool = isProduction ? undefined : 'source-map';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const getPath = (folder) => path.join('assets', `${folder}`, isProduction ? '[contenthash].[ext]' : '[name].[contenthash].[ext]');

const config = {
  devtool,
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[contenthash].js' : '[name].[contenthash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: { format: { comments: false } },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: getPath('images'),
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/source',
        generator: {
          filename: getPath('images'),
        },
      },
      {
        test: /\.((t|o)tf|eot|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: getPath('fonts'),
        },
      },
      {
        test: /\.(ogg|mp3$|wav|mpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: getPath('sounds'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
