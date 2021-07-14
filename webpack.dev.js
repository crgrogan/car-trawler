const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/pages/home/main.js",
    details: "./src/pages/details/main.js",
  },

  devServer: {
    port: 8080,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/home/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/details/index.html",
      inject: true,
      chunks: ["details"],
      filename: "details",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
