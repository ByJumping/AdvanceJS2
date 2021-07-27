const path = require("path");
const HtmlWebpackPlagin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/public/index.js"],
  },
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/",
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-inline-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlagin({
      template: "src/public/index.html",
      filename: "index.html",
      excludeChunks: ["server"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/server/db/img",
          to: "[name][ext]",
          toType: "template",
        },
      ],
    }),
  ],
};
