const { resolve } = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const [DEV, PROD] = ["development", "production"];
const { NODE_ENV = DEV } = process.env;
const [IS_DEV, IS_PROD] = [NODE_ENV === DEV, NODE_ENV === PROD];

const SRC = __dirname;
const DIST = resolve(__dirname, "..");

module.exports = {
  mode: NODE_ENV,
  resolve: {
    alias: { "@": SRC }
  },
  entry: SRC,
  output: {
    path: DIST
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: SRC,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: resolve(SRC, "index.html"),
      minify: { collapseWhitespace: IS_PROD }
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    stats: {
      modules: false,
      chunks: false,
      children: false
    }
  }
};
