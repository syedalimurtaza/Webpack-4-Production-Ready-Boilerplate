const merge = require("webpack-merge");
const common = require("../webpack.common.js");
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "static/js/[name].[hash].js",
    chunkFilename: "static/js/[name].bundle.js",
    path: resolve(__dirname, "../build"),
    publicPath: "/",
  },

  stats: {
    colors: true,
    hash: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    entrypoints: false,
    excludeAssets: /(.LICENSE.txt)$/,
    assetsSort: "!size",
    performance: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin()],
});
