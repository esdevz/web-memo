const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [new ReactRefreshPlugin()],
  devtool: "eval-cheap-module-source-map",
};
