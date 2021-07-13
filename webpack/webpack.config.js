const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");
const envParsed = require("dotenv").config().parsed || {};

const env = Object.keys(envParsed).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(envParsed[key]);
  return result;
}, {});

module.exports = {
  entry: {
    "react-lib": {
      import: ["react", "react-dom"],
    },
    main: {
      import: path.resolve(__dirname, "..", "src/index.tsx"),
      dependOn: ["react-lib"],
    },
  },
  output: {
    filename: "static/[name].[contenthash].js",
    path: path.resolve(__dirname, "..", "build"),
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src/index.html"),
    }),
    new DefinePlugin(env),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "..", "public") }],
    }),
  ],
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ico|png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
};
