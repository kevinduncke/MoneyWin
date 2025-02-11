const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  // ENTRY POINT || APP
  entry: "./www/js/index.js",

  // OUTPUT CONFIGURATION
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "www/dist"),
  },

  // LOADERS FOR PROCESSING DIFFERENT FILE TYPES
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Handle image files
        use: ['file-loader'],
      },
    ],
  },

  // PLUGINS (ADDITIONAL FUNCTIONALITY)
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.min.css",
    }),
    new HtmlWebpackPlugin({
      template: './www/index.html', 
      filename: 'index.html', 
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', 
    }),
  ],

  // SERVER CONFIGURATION
  devServer: {
    static: "./dist",
    hot: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
  // MODE: DEV || PRODUCTION
  mode: "production",
};
