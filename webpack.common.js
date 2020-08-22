const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// plugin Constants
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

const cssMinify = new MiniCssExtractPlugin({
  filename: "static/css/[name].[hash].css",
});

module.exports = {
  module: {
    rules: [
      { test: /\.(js|jsx)$/, include: /src/, use: { loader: "babel-loader" } },
      { test: /\.html$/, use: { loader: "html-loader" } },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp?g|gif|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "[hash].[ext]", outputPath: "static/media/" },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: { outputPath: "static/media/" },
        },
      },
      {
        test: /\.svg$/,
        use: [
          "@svgr/webpack",
          { loader: "file-loader", options: { outputPath: "static/media/" } },
        ],
        include: /src/,
      },
    ],
  },
  plugins: [
    htmlPlugin,
    cssMinify,
    new Dotenv({ silent: true }),
    new CaseSensitivePathsPlugin(),
  ],
};
