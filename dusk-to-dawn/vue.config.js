const webpack = require("webpack");

const fs = require("fs");
const path = require("path");

module.exports = {
  publicPath: "./",
  productionSourceMap: process.env.NODE_ENV !== "production",

  // IMPORTANT: must set this to use symlinked local repo!!
  chainWebpack: config => config.resolve.symlinks(false),

  configureWebpack: config => {

    // drop console logs for production
    if (process.env.NODE_ENV === 'production') {
      if ('terserOptions' in config.optimization.minimizer[0].options || {}) {
        // eslint-disable-next-line no-console
        console.log('dropping console logs for production.');
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      }
    }
    
  }
};