const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "..", "background-scripts/background.ts"),
  output: {
    filename: "background.js",
    path: path.resolve(__dirname, "..", "build"),
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
