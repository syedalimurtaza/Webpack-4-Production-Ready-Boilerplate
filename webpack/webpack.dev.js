const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("../webpack.common.js");
var path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    publicPath: "/",
  },
  stats: {
    env: true,
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    logging: "verbose",
    assetsSort: "!size",
    performance: true,
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    historyApiFallback: true,
    inline: true,
    compress: true,
    hot: true,
  },
  optimization: {
    /*
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },*/
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
        // vendor chunk
        vendor: {
          // name of the chunk
          name: "vendor",
          // async + async chunks
          chunks: "all",
          // import file path containing node_modules
          test: /node_modules/,
          // priority
          priority: 20,
        },
        // common chunk
        common: {
          name: "common",
          minChunks: 2,
          chunks: "async",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
