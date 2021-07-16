const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    index: ["./src/pages/home/main.js", "./src/pages/home/page.scss"],
    details: ["./src/pages/details/main.js", "./src/pages/details/page.scss"],
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
      filename: "details.html",
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
        test: /\.styles.scss$/,
        exclude: /node_modules/,
        use: [
          "sass-to-string",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.styles.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
